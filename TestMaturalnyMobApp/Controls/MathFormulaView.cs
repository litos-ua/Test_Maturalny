//using Microsoft.Maui.Controls;

//namespace TestMaturalnyMobApp.Controls;

//public class MathFormulaView : WebView
//{
//    public static readonly BindableProperty FormulaProperty =
//        BindableProperty.Create(nameof(Formula), typeof(string), typeof(MathFormulaView), string.Empty,
//            propertyChanged: OnFormulaChanged);

//    public static readonly BindableProperty DisplayModeProperty =
//        BindableProperty.Create(nameof(DisplayMode), typeof(bool), typeof(MathFormulaView), false);

//    public string Formula
//    {
//        get => (string)GetValue(FormulaProperty);
//        set => SetValue(FormulaProperty, value);
//    }

//    public bool DisplayMode
//    {
//        get => (bool)GetValue(DisplayModeProperty);
//        set => SetValue(DisplayModeProperty, value);
//    }

//    private static void OnFormulaChanged(BindableObject bindable, object oldValue, object newValue)
//    {
//        if (bindable is MathFormulaView view && newValue is string formula)
//        {
//            view.LoadFormula(formula);
//        }
//    }

//    private void LoadFormula(string formula)
//    {
//        var cleanFormula = formula.Trim('`');

//        var html = $@"
//                    <!DOCTYPE html>
//                    <html>
//                    <head>
//                        <meta charset='UTF-8'>
//                        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
//                        <script src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'>
//                        </script>
//                        <style>
//                            body {{
//                                margin: 0;
//                                padding: 0px 1px 8px 1px;
//                                background-color: transparent;
//                                display: flex;
//                                align-items: center;
//                                justify-content: center;
//                                min-height: 100%;
//                            }}
//                            .math-container {{
//                                font-size: 1.1em;
//                                padding: 0px 1px 8px 1px;
//                                display: flex;
//                                align-items: center;
//                                justify-content: center;
//                                min-height: 100%;
//                            }}
//                            .math-container p {{
//                                margin: 0;
//                                padding: 0;
//                            }}
//                        </style>
//                    </head>
//                    <body>
//                        <div class='math-container'>
//                            \[
//                            {cleanFormula}
//                            \]
//                        </div>
//                    </body>
//                    </html>";

//        Source = new HtmlWebViewSource { Html = html };
//    }
//}


//// Стабильное отображение формул, отдельный контрол MathFormulaView, который держит размеры и корректно обновляет HTML‑контент. 
//using Microsoft.Maui.Controls;

//namespace TestMaturalnyMobApp.Controls;

//public class MathFormulaView : WebView
//{
//    public static readonly BindableProperty FormulaProperty =
//        BindableProperty.Create(nameof(Formula), typeof(string), typeof(MathFormulaView), string.Empty, propertyChanged: OnFormulaChanged);

//    public string Formula
//    {
//        get => (string)GetValue(FormulaProperty);
//        set => SetValue(FormulaProperty, value);
//    }

//    private static void OnFormulaChanged(BindableObject bindable, object oldValue, object newValue)
//    {
//        if (bindable is MathFormulaView view && newValue is string formula)
//        {
//            if (string.IsNullOrWhiteSpace(formula))
//                return;

//            // убираем обратные кавычки
//            formula = formula.Trim('`');

//            var html = $@"
//            <html>
//              <head>
//                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
//                <script src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'></script>
//                <style>
//                  body {{ margin:0; padding:0; font-size: 18px; }}
//                  .formula {{ display:flex; justify-content:center; align-items:center; height:100%; visibility:hidden; }}
//                </style>
//              </head>
//              <body>
//                <div id='formula' class='formula'>$$ {formula} $$</div>
//                <script>
//                  MathJax.typesetPromise().then(() => {{
//                    document.getElementById('formula').style.visibility = 'visible';
//                  }});
//                </script>
//              </body>
//            </html>";

//            view.Source = new HtmlWebViewSource { Html = html };
//        }
//    }

//    public MathFormulaView()
//    {
//        // Минимальные размеры, чтобы не схлопывался
//        MinimumHeightRequest = 40;
//        MinimumWidthRequest = 200;
//        HeightRequest = 80;
//        WidthRequest = 300;
//    }
//}

// Корректируем цвет формул

using Microsoft.Maui.Controls;

namespace TestMaturalnyMobApp.Controls;

public class MathFormulaView : WebView
{
    public static readonly BindableProperty FormulaProperty =
        BindableProperty.Create(nameof(Formula), typeof(string), typeof(MathFormulaView), string.Empty,
            propertyChanged: OnFormulaChanged);

    public static readonly BindableProperty TextColorProperty =
        BindableProperty.Create(nameof(TextColor), typeof(Color), typeof(MathFormulaView), Colors.Black);

    public string Formula
    {
        get => (string)GetValue(FormulaProperty);
        set => SetValue(FormulaProperty, value);
    }

    public Color TextColor
    {
        get => (Color)GetValue(TextColorProperty);
        set => SetValue(TextColorProperty, value);
    }

    private static void OnFormulaChanged(BindableObject bindable, object oldValue, object newValue)
    {
        if (bindable is MathFormulaView view && newValue is string formula)
        {
            if (string.IsNullOrWhiteSpace(formula))
                return;

            formula = formula.Trim('`');

            var textColor = view.TextColor?.ToHex() ?? "#000000";

            var html = $@"
            <html>
              <head>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <script src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'></script>
                <style>
                  body {{ 
                    margin:0; 
                    padding:0; 
                    font-size: 18px; 
                    background-color: transparent;
                    color: {textColor};
                  }}
                  .formula {{ 
                    display:flex; 
                    justify-content:center; 
                    align-items:center; 
                    height:100%; 
                    visibility:hidden;
                    color: {textColor};
                  }}
                </style>
              </head>
              <body>
                <div id='formula' class='formula'>\(
                {formula}
                \)</div>
                <script>
                  MathJax.typesetPromise().then(() => {{
                    document.getElementById('formula').style.visibility = 'visible';
                  }});
                </script>
              </body>
            </html>";

            view.Source = new HtmlWebViewSource { Html = html };
        }
    }

    public MathFormulaView()
    {
        MinimumHeightRequest = 40;
        MinimumWidthRequest = 200;
        HeightRequest = 80;
        WidthRequest = 300;

        // ✅ ВАЖНО: делаем фон WebView прозрачным
        this.BackgroundColor = Colors.Transparent;
    }
}