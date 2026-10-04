using Microsoft.Maui.Controls;

namespace TestMaturalnyMobApp.Components;

public partial class AnimatedTextBlock : ContentView
{
    // ===== BINDABLE PROPERTIES =====
    public static readonly BindableProperty TextsProperty =
        BindableProperty.Create(nameof(Texts), typeof(string[][]), typeof(AnimatedTextBlock),
            defaultValue: null, propertyChanged: OnDataChanged);

    public static readonly BindableProperty ColorPairsProperty =
        BindableProperty.Create(nameof(ColorPairs), typeof(string[][]), typeof(AnimatedTextBlock),
            defaultValue: null, propertyChanged: OnDataChanged);

    public static readonly BindableProperty IntervalProperty =
        BindableProperty.Create(nameof(Interval), typeof(int), typeof(AnimatedTextBlock), defaultValue: 5000);

    public static readonly BindableProperty FontSizeProperty =
        BindableProperty.Create(nameof(FontSize), typeof(double), typeof(AnimatedTextBlock), defaultValue: 20.0);

    public static readonly BindableProperty FontWeightProperty =
        BindableProperty.Create(nameof(FontWeight), typeof(int), typeof(AnimatedTextBlock), defaultValue: 700);

    public static readonly BindableProperty TextAlignmentProperty =
        BindableProperty.Create(nameof(TextAlignment), typeof(TextAlignment), typeof(AnimatedTextBlock),
            defaultValue: TextAlignment.Center);

    public static readonly BindableProperty TextColorProperty =
        BindableProperty.Create(nameof(TextColor), typeof(Color), typeof(AnimatedTextBlock),
            defaultValue: Colors.Black);

    // ===== СВОЙСТВА =====
    public string[][] Texts
    {
        get => (string[][])GetValue(TextsProperty);
        set => SetValue(TextsProperty, value);
    }

    public string[][] ColorPairs
    {
        get => (string[][])GetValue(ColorPairsProperty);
        set => SetValue(ColorPairsProperty, value);
    }

    public int Interval
    {
        get => (int)GetValue(IntervalProperty);
        set => SetValue(IntervalProperty, value);
    }

    public double FontSize
    {
        get => (double)GetValue(FontSizeProperty);
        set => SetValue(FontSizeProperty, value);
    }

    public int FontWeight
    {
        get => (int)GetValue(FontWeightProperty);
        set => SetValue(FontWeightProperty, value);
    }

    public TextAlignment TextAlignment
    {
        get => (TextAlignment)GetValue(TextAlignmentProperty);
        set => SetValue(TextAlignmentProperty, value);
    }

    public Color TextColor
    {
        get => (Color)GetValue(TextColorProperty);
        set => SetValue(TextColorProperty, value);
    }

    // ===== ВНУТРЕННЕЕ СОСТОЯНИЕ =====
    private int _index = 0;
    private int _colorIndex = 0;
    private System.Timers.Timer _timer;

    public AnimatedTextBlock()
    {
        InitializeComponent();
        ApplySettings();

        this.PropertyChanged += OnPropertyChanged;
    }

    private void OnPropertyChanged(object sender, System.ComponentModel.PropertyChangedEventArgs e)
    {
        if (e.PropertyName == nameof(Texts) || e.PropertyName == nameof(ColorPairs))
        {
            RestartAnimation();
        }
    }

    private static void OnDataChanged(BindableObject bindable, object oldValue, object newValue)
    {
        var control = (AnimatedTextBlock)bindable;
        control.RestartAnimation();
    }

    private void ApplySettings()
    {
        AnimatedLabel.FontSize = FontSize;
        // ✅ Жирность принудительно
        AnimatedLabel.FontAttributes = FontAttributes.Bold;
        AnimatedLabel.FontFamily = "OpenSansBold";
        AnimatedLabel.HorizontalTextAlignment = TextAlignment;
        AnimatedLabel.TextColor = TextColor;
    }

    private void RestartAnimation()
    {
        _timer?.Stop();
        _timer?.Dispose();
        _index = 0;
        _colorIndex = 0;
        StartAnimation();
    }

    private void StartAnimation()
    {
        if (Texts == null || Texts.Length == 0 || ColorPairs == null || ColorPairs.Length == 0)
            return;

        UpdateText();
        _timer = new System.Timers.Timer(Interval);
        _timer.Elapsed += OnTimerElapsed;
        _timer.AutoReset = true;
        _timer.Start();
    }

    private void OnTimerElapsed(object sender, System.Timers.ElapsedEventArgs e)
    {
        _index = (_index + 1) % Texts.Length;
        _colorIndex = (_colorIndex + 1) % ColorPairs.Length;

        MainThread.BeginInvokeOnMainThread(() => UpdateText());
    }

    private void UpdateText()
    {
        try
        {
            var first = Texts[_index][0];
            var second = Texts[_index][1];
            var firstColor = ColorPairs[_colorIndex % ColorPairs.Length][0];
            var secondColor = ColorPairs[_colorIndex % ColorPairs.Length][1];

            var formatted = new FormattedString();
            formatted.Spans.Add(new Span
            {
                Text = first + " ",
                TextColor = Color.FromArgb(firstColor),
                FontAttributes = FontAttributes.Bold  // ✅ Жирный Span
            });
            formatted.Spans.Add(new Span
            {
                Text = second,
                TextColor = Color.FromArgb(secondColor),
                FontAttributes = FontAttributes.Bold  // ✅ Жирный Span
            });

            AnimatedLabel.FormattedText = formatted;
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"AnimatedTextBlock error: {ex.Message}");
        }
    }

    ~AnimatedTextBlock()
    {
        _timer?.Stop();
        _timer?.Dispose();
    }
}