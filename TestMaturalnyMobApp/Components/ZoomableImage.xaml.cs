using System.Windows.Input;

namespace TestMaturalnyMobApp.Components;

public partial class ZoomableImage : ContentView
{
    public static readonly BindableProperty SourceProperty =
        BindableProperty.Create(nameof(Source), typeof(string), typeof(ZoomableImage), default(string));

    public static readonly BindableProperty MaxHeightProperty =
        BindableProperty.Create(nameof(MaxHeight), typeof(int), typeof(ZoomableImage), 75);

    public static readonly BindableProperty MaxWidthProperty =
        BindableProperty.Create(nameof(MaxWidth), typeof(int), typeof(ZoomableImage), 150);

    public static readonly BindableProperty PlaceholderImageProperty =
        BindableProperty.Create(nameof(PlaceholderImage), typeof(string), typeof(ZoomableImage), "no_image.png");

    public string Source
    {
        get => (string)GetValue(SourceProperty);
        set => SetValue(SourceProperty, value);
    }

    public int MaxHeight
    {
        get => (int)GetValue(MaxHeightProperty);
        set => SetValue(MaxHeightProperty, value);
    }

    public int MaxWidth
    {
        get => (int)GetValue(MaxWidthProperty);
        set => SetValue(MaxWidthProperty, value);
    }

    public string PlaceholderImage
    {
        get => (string)GetValue(PlaceholderImageProperty);
        set => SetValue(PlaceholderImageProperty, value);
    }

    // ===== ZOOM & PAN & PINCH =====
    private double _currentScale = 1.0;
    private double _startScale = 1.0;
    private double _currentX = 0;
    private double _currentY = 0;
    private double _startX = 0;
    private double _startY = 0;

    private const double MIN_SCALE = 0.5;
    private const double MAX_SCALE = 3.0;
    private const double ZOOM_STEP = 0.25;

    public string ScaleText => $"{_currentScale:F1}x";

    public ZoomableImage()
    {
        InitializeComponent();
    }

    // ===== ОТКРЫТИЕ / ЗАКРЫТИЕ =====
    private void OnImageTapped(object sender, EventArgs e)
    {
        ShowFullscreen();
    }

    private void OnImageFullscreenTapped(object sender, EventArgs e)
    {
        if (_currentScale <= 1.0)
        {
            HideFullscreen();
        }
    }

    private void OnOverlayTapped(object sender, EventArgs e)
    {
        HideFullscreen();
    }

    private void OnCloseClicked(object sender, EventArgs e)
    {
        HideFullscreen();
    }

    private void ShowFullscreen()
    {
        FullscreenOverlay.IsVisible = true;
        ResetTransform();

        if (this.Parent is ScrollView scrollView)
        {
            scrollView.ScrollToAsync(this, ScrollToPosition.Center, true);
        }
    }

    private void HideFullscreen()
    {
        FullscreenOverlay.IsVisible = false;
        ResetTransform();
    }

    private void ResetTransform()
    {
        _currentScale = 1.0;
        _currentX = 0;
        _currentY = 0;
        ApplyTransform();
    }

    // ===== PINCH (Масштабирование двумя пальцами) =====
    private void OnPinchUpdated(object sender, PinchGestureUpdatedEventArgs e)
    {
        System.Diagnostics.Debug.WriteLine($"🔍 Pinch: Status={e.Status}, Scale={e.Scale}");

        switch (e.Status)
        {
            case GestureStatus.Started:
                _startScale = _currentScale;
                System.Diagnostics.Debug.WriteLine($"   Started: startScale={_startScale:F2}");
                break;

            case GestureStatus.Running:
                var newScale = _startScale * e.Scale;
                newScale = Math.Max(MIN_SCALE, Math.Min(MAX_SCALE, newScale));
                _currentScale = newScale;
                ApplyTransform();
                System.Diagnostics.Debug.WriteLine($"   Running: scale={_currentScale:F2}");
                break;

            case GestureStatus.Completed:
                System.Diagnostics.Debug.WriteLine($"   Completed: scale={_currentScale:F2}");
                break;
        }
    }

    // ===== PAN (Перетаскивание) =====
    private void OnPanUpdated(object sender, PanUpdatedEventArgs e)
    {
        if (_currentScale <= 1.0) return;

        switch (e.StatusType)
        {
            case GestureStatus.Started:
                _startX = _currentX;
                _startY = _currentY;
                break;

            case GestureStatus.Running:
                var newX = _startX + e.TotalX;
                var newY = _startY + e.TotalY;

                var maxX = (FullscreenImage.Width * (_currentScale - 1)) / 2;
                var maxY = (FullscreenImage.Height * (_currentScale - 1)) / 2;

                if (FullscreenImage.Width <= 0 || FullscreenImage.Height <= 0)
                {
                    var containerWidth = ZoomContainer?.Width ?? 400;
                    var containerHeight = ZoomContainer?.Height ?? 400;
                    maxX = (containerWidth * (_currentScale - 1)) / 2;
                    maxY = (containerHeight * (_currentScale - 1)) / 2;
                }

                _currentX = Math.Max(-maxX, Math.Min(maxX, newX));
                _currentY = Math.Max(-maxY, Math.Min(maxY, newY));
                ApplyTransform();
                break;
        }
    }

    // ===== КНОПКИ УПРАВЛЕНИЯ =====
    private void OnZoomInClicked(object sender, EventArgs e)
    {
        var newScale = Math.Min(_currentScale + ZOOM_STEP, MAX_SCALE);
        _currentScale = newScale;

        if (_currentScale > 1.0)
        {
            _currentX = 0;
            _currentY = 0;
        }

        ApplyTransform();
        OnPropertyChanged(nameof(ScaleText));
    }

    private void OnZoomOutClicked(object sender, EventArgs e)
    {
        var newScale = Math.Max(_currentScale - ZOOM_STEP, MIN_SCALE);
        _currentScale = newScale;

        if (_currentScale <= 1.0)
        {
            _currentX = 0;
            _currentY = 0;
        }

        ApplyTransform();
        OnPropertyChanged(nameof(ScaleText));
    }

    private void OnResetZoomClicked(object sender, EventArgs e)
    {
        ResetTransform();
        OnPropertyChanged(nameof(ScaleText));
    }

    // ===== ПРИМЕНЕНИЕ ТРАНСФОРМАЦИИ =====
    private void ApplyTransform()
    {
        if (ZoomContainer == null) return;

        ZoomContainer.Scale = _currentScale;
        ZoomContainer.TranslationX = _currentX;
        ZoomContainer.TranslationY = _currentY;

        OnPropertyChanged(nameof(ScaleText));
    }

    // ===== ОБРАБОТКА ОШИБОК =====
    private void OnImageError(object sender, EventArgs e)
    {
        if (sender is Image image)
        {
            image.Source = PlaceholderImage;
        }
    }
}