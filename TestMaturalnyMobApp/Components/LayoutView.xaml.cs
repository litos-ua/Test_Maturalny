// ScreenSizeService.ScreenWidth с проверкой на NaN и > 0  this.WidthRequest = 400; (дефолтное значение)  Добавлена проверка !double.IsNaN()
using TestMaturalnyMobApp.Services;

namespace TestMaturalnyMobApp.Components;

public partial class LayoutView : ContentView
{
    private View _content;
    private bool _isFirstLayout = true;

    public View PageContent
    {
        get => _content;
        set
        {
            _content = value;
            if (ContentArea != null)
            {
                ContentArea.Content = value;
            }
        }
    }

    public LayoutView()
    {
        InitializeComponent();
        System.Diagnostics.Debug.WriteLine($"🟢 LayoutView CONSTRUCTOR: {DateTime.Now:HH:mm:ss.fff}");

        if (_content != null && ContentArea != null)
        {
            ContentArea.Content = _content;
        }

        this.SizeChanged += OnSizeChanged;

        // ✅ Применяем размеры, если они уже известны и валидны
        if (ScreenSizeService.IsInitialized &&
            !double.IsNaN(ScreenSizeService.ScreenWidth) &&
            !double.IsNaN(ScreenSizeService.ScreenHeight) &&
            ScreenSizeService.ScreenWidth > 0 &&
            ScreenSizeService.ScreenHeight > 0)
        {
            this.WidthRequest = ScreenSizeService.ScreenWidth;
            this.HeightRequest = ScreenSizeService.ScreenHeight;
            System.Diagnostics.Debug.WriteLine($"🟢 LayoutView: установлены размеры из ScreenSizeService: {this.WidthRequest}x{this.HeightRequest}");
        }
        else
        {
            // ✅ Если размеры не валидны — устанавливаем дефолтные
            this.WidthRequest = 400;
            this.HeightRequest = 800;
            System.Diagnostics.Debug.WriteLine($"🟢 LayoutView: установлены дефолтные размеры: {this.WidthRequest}x{this.HeightRequest}");
        }
    }

    // ✅ ИСПОЛЬЗУЕМ OnParentSet ВМЕСТО СОБЫТИЯ
    protected override void OnParentSet()
    {
        base.OnParentSet();

        // Когда LayoutView добавлен в родителя — фиксируем размеры
        if (this.Parent != null && _isFirstLayout)
        {
            if (ScreenSizeService.IsInitialized &&
                !double.IsNaN(ScreenSizeService.ScreenWidth) &&
                !double.IsNaN(ScreenSizeService.ScreenHeight) &&
                ScreenSizeService.ScreenWidth > 0 &&
                ScreenSizeService.ScreenHeight > 0)
            {
                this.WidthRequest = ScreenSizeService.ScreenWidth;
                this.HeightRequest = ScreenSizeService.ScreenHeight;
                System.Diagnostics.Debug.WriteLine($"🟢 LayoutView: размеры зафиксированы в OnParentSet: {this.WidthRequest}x{this.HeightRequest}");
            }
            else
            {
                // ✅ Если размеры не валидны — используем текущие
                if (this.Width > 0 && this.Height > 0)
                {
                    this.WidthRequest = this.Width;
                    this.HeightRequest = this.Height;
                    System.Diagnostics.Debug.WriteLine($"🟢 LayoutView: размеры зафиксированы из текущих: {this.WidthRequest}x{this.HeightRequest}");
                }
            }
        }
    }

    private void OnSizeChanged(object sender, EventArgs e)
    {
        if (_isFirstLayout && this.Width > 0 && this.Height > 0)
        {
            _isFirstLayout = false;
            this.WidthRequest = this.Width;
            this.HeightRequest = this.Height;
            System.Diagnostics.Debug.WriteLine($"🟢 LayoutView SizeChanged: Width={this.Width}, Height={this.Height}, Time={DateTime.Now:HH:mm:ss.fff}");
        }
    }
}