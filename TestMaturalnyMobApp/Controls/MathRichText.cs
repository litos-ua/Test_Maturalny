// дифференциация в Render— при наличии backtick'ов идёт RenderWithMathJax, без них — RenderPlainText
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.Maui.Controls;
using TestMaturalnyMobApp.Constants;

namespace TestMaturalnyMobApp.Controls;

/// <summary>
/// WebView для отображения текста с inline-формулами MathJax.
/// Принимает строку с формулами, обрамлёнными в обратные кавычки (`...`),
/// и рендерит её как единый HTML-документ. Формулы встраиваются в поток текста.
/// </summary>
public class MathRichText : WebView
{
    public static readonly BindableProperty TextProperty =
        BindableProperty.Create(
            nameof(Text),
            typeof(string),
            typeof(MathRichText),
            defaultValue: string.Empty,
            propertyChanged: OnTextChanged);

    public static readonly BindableProperty TextSizeProperty =
        BindableProperty.Create(
            nameof(TextSize),
            typeof(double),
            typeof(MathRichText),
            defaultValue: 16.0,
            propertyChanged: OnTextChanged);

    public static readonly BindableProperty BaseHeightProperty =
        BindableProperty.Create(
            nameof(BaseHeight),
            typeof(double),
            typeof(MathRichText),
            defaultValue: 80.0,
            propertyChanged: OnTextChanged);

    // Внешняя ширина блока. Если задано (> 0) — используем его.
    // Если не задано — берём Width, потом ширину экрана.
    public static readonly BindableProperty AvailableWidthProperty =
        BindableProperty.Create(
            nameof(AvailableWidth),
            typeof(double),
            typeof(MathRichText),
            defaultValue: 0.0,
            propertyChanged: OnAvailableWidthChanged);
     
    // разрешать ли автоматический расчёт ширины
    public static readonly BindableProperty AutoWidthProperty =
    BindableProperty.Create(
        nameof(AutoWidth),
        typeof(bool),
        typeof(MathRichText),
        defaultValue: true);

    public bool AutoWidth
    {
        get => (bool)GetValue(AutoWidthProperty);
        set => SetValue(AutoWidthProperty, value);
    }

    public string Text
    {
        get => (string)GetValue(TextProperty);
        set => SetValue(TextProperty, value);
    }

    public double TextSize
    {
        get => (double)GetValue(TextSizeProperty);
        set => SetValue(TextSizeProperty, value);
    }

    /// <summary>
    /// Базовая высота для одной строки текста.
    /// Итоговая высота рассчитывается по количеству строк с запасом.
    /// </summary>
    public double BaseHeight
    {
        get => (double)GetValue(BaseHeightProperty);
        set => SetValue(BaseHeightProperty, value);
    }

    /// <summary>
    /// Доступная ширина блока в DIU. Если 0 — вычисляется автоматически
    /// (из Width или из ширины экрана с запасом).
    /// </summary>
    public double AvailableWidth
    {
        get => (double)GetValue(AvailableWidthProperty);
        set => SetValue(AvailableWidthProperty, value);
    }

    // ✅ Запоминаем последнюю использованную ширину, чтобы не пересчитывать
    //    высоту при каждом SizeChanged без реального изменения.
    private double _lastUsedWidth;

    public MathRichText()
    {
        BackgroundColor = Colors.Transparent;

        // ✅ Подписываемся на изменение собственного размера.
        //    Когда MAUI вычислит layout и присвоит ширину — пересчитаем высоту.
        SizeChanged += OnSelfSizeChanged;
    }

    private static void OnTextChanged(BindableObject bindable, object oldValue, object newValue)
    {
        if (bindable is MathRichText view && newValue is string text)
        {
            view.Render(text);
        }
    }

    private static void OnAvailableWidthChanged(BindableObject bindable, object oldValue, object newValue)
    {
        if (bindable is MathRichText view)
        {
            // ✅ Если ширина задана извне и текст уже есть — пересчитаем высоту.
            view.RecalculateHeight(view.Text);
        }
    }


    private void OnSelfSizeChanged(object sender, EventArgs e)
    {
        // ✅ Если автоширина отключена — не трогаем WidthRequest.
        //    Ширина берётся из родительского Grid (колонка *).
        if (!AutoWidth)
        {
            // Но всё равно пересчитываем высоту при изменении ширины
            if (AvailableWidth <= 0 && Width > 0)
            {
                var newWidth = Width;

                if (Math.Abs(_lastUsedWidth - newWidth) > 1)
                {
                    _lastUsedWidth = newWidth;
                    RecalculateHeight(Text);
                }
            }

            return;
        }

        // ✅ Если ширина ещё не задана или слишком мала — вычисляем из ширины экрана.
        //    Один раз при первом SizeChanged, потом уже не трогаем.
        if (WidthRequest <= 0 || WidthRequest < ScreenConfig.MinValidWidth)
        {
            var screenWidth = DeviceDisplay.Current.MainDisplayInfo.Width
                              / DeviceDisplay.Current.MainDisplayInfo.Density;

            // Отступы: RadioButton (~50) + padding Grid'ов (~50) + запас (~30)
            var calculated = Math.Max(ScreenConfig.MinContentWidth, screenWidth - ScreenConfig.HorizontalPaddingEstimate);

            WidthRequest = calculated;
            return;
        }

        // ✅ Если ширина уже валидная — пересчитываем высоту при её изменении.
        if (AvailableWidth <= 0 && Width > 0)
        {
            var newWidth = Width;

            if (Math.Abs(_lastUsedWidth - newWidth) > 1)
            {
                _lastUsedWidth = newWidth;
                RecalculateHeight(Text);
            }
        }
    }

    private void Render(string raw)
    {
        //System.Diagnostics.Debug.WriteLine(
        //$"🟡🟠 MathRichText.Render: raw='{raw?.Substring(0, Math.Min(30, raw?.Length ?? 0))}', hasBackticks={raw?.Contains('`')}");
        if (string.IsNullOrEmpty(raw))
        {
            Source = new HtmlWebViewSource { Html = "<html><body></body></html>" };
            HeightRequest = BaseHeight;
            return;
        }

        // ✅ Ключевая развилка: есть ли формулы (backtick'и) в тексте
        if (raw.Contains('`'))
        {
            RenderWithMathJax(raw);
        }
        else
        {
            RenderPlainText(raw);
        }

        // Пересчёт высоты — общий для обоих путей
        RecalculateHeight(raw);
    }
    private void RenderWithMathJax(string raw)
    {
        //System.Diagnostics.Debug.WriteLine("🟡🔵→ RenderWithMathJax");
        if (string.IsNullOrEmpty(raw))
        {
            Source = new HtmlWebViewSource { Html = "<html><body></body></html>" };
            HeightRequest = BaseHeight;
            return;
        }

        var isDark = Application.Current?.RequestedTheme == AppTheme.Dark;
        var textColor = isDark ? "#FFFFFF" : "#1E1E1E";

        // Разбиваем по обратным кавычкам: чётные части — обычный текст,
        // нечётные — формулы (внутри `...`).
        var parts = Regex.Split(raw, "(`[^`]+`)");
        var sb = new StringBuilder();

        foreach (var part in parts)
        {
            if (string.IsNullOrEmpty(part)) continue;

            if (part.StartsWith("`") && part.EndsWith("`"))
            {
                var formula = part.Substring(1, part.Length - 2).Trim();

                // Inline-режим MathJax: \( ... \)
                // HTML-энкодим формулу, чтобы не сломать разметку символами < > &.
                sb.Append("\\( ").Append(WebUtility.HtmlEncode(formula)).Append(" \\)");
            }
            else
            {
                //// Обычный текст: энкодим и переводим \n в <br/>
                //var escaped = WebUtility.HtmlEncode(part).Replace("\n", "<br/>");

                // 1) Сначала нормализуем <br>-варианты в \n (ДО кодирования)
                var withNewlines = Regex.Replace(part, @"<br\s*/?>", "\n", RegexOptions.IgnoreCase);

                // 2) Теперь энкодим (теги уже не мешают — их нет)
                var escaped = WebUtility.HtmlEncode(withNewlines).Replace("\n", "<br/>");
                sb.Append(escaped);
            }
        }

        var html = $@"
        <html>
          <head>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <script>
              window.MathJax = {{
                tex: {{
                  inlineMath: [['\\(', '\\)']],
                  displayMath: [['\\[', '\\]']]
                }},
                options: {{
                  skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
                }}
              }};
            </script>
            <script src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'></script>
            <style>
              body {{
                margin: 0;
                padding: 4px;
                font-size: {TextSize}px;
                line-height: 1.5;
                color: {textColor};
                background: transparent;
                word-wrap: break-word;
                overflow-wrap: break-word;
                overflow-y: auto;   /* ✅ разрешаем вертикальную прокрутку */
                overflow-x: hidden; /* горизонтальную не разрешаем */
                height: 100%;       /* ✅ чтобы overflow работал */
              }}
              mjx-container {{
                font-size: {TextSize}px !important;
              }}
            </style>
          </head>
          <body>
            {sb}
            <script>
              MathJax.typesetPromise().then(() => {{
                // После рендера MathJax можно было бы отправить высоту через JS-мост,
                // но пока используем оценку по количеству строк.
              }});
            </script>
          </body>
        </html>";

        Source = new HtmlWebViewSource { Html = html };

        // ✅ Первичная установка высоты — пока layout не посчитан,
        //    используем BaseHeight. После SizeChanged высота уточнится.
        HeightRequest = BaseHeight;

        // ✅ Пытаемся пересчитать высоту сразу, если ширина уже известна.
        RecalculateHeight(raw);
    }


    /// <summary>
    /// Рендер текста без формул — без подключения MathJax.
    /// Используется, когда в тексте нет backtick-формул.
    /// Рендерится мгновенно, без сетевой задержки.
    /// </summary>
    private void RenderPlainText(string raw)
    {
        //System.Diagnostics.Debug.WriteLine("🟡⚪→ RenderPlainText");
        var isDark = Application.Current?.RequestedTheme == AppTheme.Dark;
        var textColor = isDark ? "#FFFFFF" : "#1E1E1E";

        // Нормализуем <br>-варианты в \n, потом экранируем и переводим обратно в <br/>
        var withNewlines = Regex.Replace(raw, @"<br\s*/?>", "\n", RegexOptions.IgnoreCase);
        var escaped = WebUtility.HtmlEncode(withNewlines).Replace("\n", "<br/>");

        var html = $@"
        <html>
          <head>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <style>
              body {{
                margin: 0;
                padding: 2px;
                font-size: {TextSize}px;
                line-height: 1.35;
                color: {textColor};
                background: transparent;
                word-wrap: break-word;
                overflow-wrap: break-word;
                overflow-y: auto;
                overflow-x: hidden;
                height: 100%;
              }}
            </style>
          </head>
          <body>
            {escaped}
          </body>
        </html>";

        Source = new HtmlWebViewSource { Html = html };
    }

    /// <summary>
    /// ✅ Пересчитывает высоту блока по ширине и содержимому.
    /// Использует реальную ширину (AvailableWidth → Width → ширина экрана).
    /// </summary>
    private void RecalculateHeight(string raw)
    {
        if (string.IsNullOrEmpty(raw))
        {
            HeightRequest = BaseHeight;
            return;
        }

        // 1. Определяем доступную ширину
        double width = AvailableWidth;
        if (width <= 0 && Width > 0)
            width = Width;

        if (width <= 0)
        {
            // Запасной вариант: ширина экрана минус отступы
            var screenWidth = DeviceDisplay.Current.MainDisplayInfo.Width
                              / DeviceDisplay.Current.MainDisplayInfo.Density;
            width = Math.Max(120, screenWidth - 80);
        }

        _lastUsedWidth = width;

        // 2. Средняя ширина одного символа (зависит от размера шрифта)
        //    Эмпирический коэффициент ~0.55 от размера шрифта.
        var avgCharWidth = TextSize * 0.55;

        // 3. Нормализуем формулы: заменяем на строку символов,
        //    эквивалентную по ширине. Формулы обычно шире, чем их текст.
        var normalized = Regex.Replace(raw, "`([^`]+)`", m =>
        {
            var f = m.Groups[1].Value;
            var visualLength = (int)Math.Ceiling(f.Length * 1.4);
            return new string('x', Math.Max(3, visualLength));
        });

        // 4. Разбиваем по явным переносам строк
        var paragraphs = normalized
            .Replace("\r\n", "\n")
            .Split('\n');

        int totalLines = 0;
        foreach (var p in paragraphs)
        {
            if (string.IsNullOrEmpty(p))
            {
                totalLines += 1;
                continue;
            }

            //var paragraphWidth = p.Length * avgCharWidth;
            //var lines = (int)Math.Ceiling(paragraphWidth / width);

            //// Запас 15% на переносы по словам
            //lines = (int)Math.Ceiling(lines * 1.15);

            //totalLines += Math.Max(1, lines);

            var paragraphWidth = p.Length * avgCharWidth;

            // Один запас (10%) и одно округление
            var rawLines = paragraphWidth / width;
            var lines = (int)Math.Ceiling(rawLines * 1.10);

            totalLines += Math.Max(1, lines);
        }

        // 5. Переводим строки в пиксели (межстрочный интервал 1.5)
        var lineHeight = TextSize * 1.5;
        var calculatedHeight = totalLines * lineHeight + 16; // 16 — padding

        // HeightRequest = Math.Max(BaseHeight, calculatedHeight);
        var maxHeight = MaximumHeightRequest > 0 ? MaximumHeightRequest : double.PositiveInfinity;
        HeightRequest = Math.Min(maxHeight, Math.Max(BaseHeight, calculatedHeight));
    }
}

