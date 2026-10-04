//using System.ComponentModel;
//using TestMaturalnyMobApp.Helpers;

//namespace TestMaturalnyMobApp.Models;

//public class MatchingItem : INotifyPropertyChanged
//{
//    private int _selectedIndex = -1;
//    private bool _isSelected;

//    public event PropertyChangedEventHandler? PropertyChanged;

//    public int Id { get; set; }
//    public string Number { get; set; } = string.Empty;
//    public string Text { get; set; } = string.Empty;
//    public string? GroupKey { get; set; }
//    public List<string> RightOptions { get; set; } = new();

//    private static readonly string[] ImageExtensions = { ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff", ".webp", ".svg" };

//    public int SelectedIndex
//    {
//        get => _selectedIndex;
//        set
//        {
//            if (_selectedIndex != value)
//            {
//                _selectedIndex = value;
//                OnPropertyChanged(nameof(SelectedIndex));
//                OnPropertyChanged(nameof(IsAnswered));
//            }
//        }
//    }

//    public bool IsSelected
//    {
//        get => _isSelected;
//        set
//        {
//            if (_isSelected != value)
//            {
//                _isSelected = value;
//                OnPropertyChanged(nameof(IsSelected));
//            }
//        }
//    }

//    public bool IsAnswered => SelectedIndex >= 0;

//    public bool IsImage =>
//        (!string.IsNullOrEmpty(GroupKey) &&
//         (GroupKey.StartsWith("img", StringComparison.OrdinalIgnoreCase) ||
//          GroupKey.StartsWith("image", StringComparison.OrdinalIgnoreCase)))
//        ||
//        (!string.IsNullOrEmpty(Text) &&
//         ImageExtensions.Any(ext => Text.EndsWith(ext, StringComparison.OrdinalIgnoreCase)));

//    public bool IsFormula => !string.IsNullOrEmpty(Text) && !IsImage && MathHelper.IsMathExpression(Text);

//    public bool IsPlainText => !IsImage && !IsFormula;

//    protected void OnPropertyChanged(string propertyName) =>
//        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
//}

//public class RightItem
//{
//    public int Id { get; set; }
//    public string Letter { get; set; } = string.Empty;
//    public string Text { get; set; } = string.Empty;
//    public string? GroupKey { get; set; }

//    private static readonly string[] ImageExtensions = { ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff", ".webp", ".svg" };

//    public bool IsImage =>
//        (!string.IsNullOrEmpty(GroupKey) &&
//         (GroupKey.StartsWith("img", StringComparison.OrdinalIgnoreCase) ||
//          GroupKey.StartsWith("image", StringComparison.OrdinalIgnoreCase)))
//        ||
//        (!string.IsNullOrEmpty(Text) &&
//         ImageExtensions.Any(ext => Text.EndsWith(ext, StringComparison.OrdinalIgnoreCase)));

//    public bool IsFormula => !string.IsNullOrEmpty(Text) && !IsImage && MathHelper.IsMathExpression(Text);

//    public bool IsPlainText => !IsImage && !IsFormula;
//}

// Раздельная проверка на имедж левых и правых опций.

using System.ComponentModel;
using TestMaturalnyMobApp.Converters;
using TestMaturalnyMobApp.Helpers;

namespace TestMaturalnyMobApp.Models;

public class MatchingItem : INotifyPropertyChanged
{
    private int _selectedIndex = -1;
    private bool _isSelected;

    public event PropertyChangedEventHandler? PropertyChanged;

    public int Id { get; set; }
    public string Number { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public string? GroupKey { get; set; }
    public List<string> RightOptions { get; set; } = new();

    private static readonly string[] ImageExtensions = { ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff", ".webp", ".svg" };

    public Color SelectedTextColor
    {
        get
        {
            // Если не выбрано или выбран "⊗" (последний индекс) - серый
            if (SelectedIndex < 0 || SelectedIndex == RightOptions.Count - 1)
                return Colors.Gray;

            return PositionColorConverter.GetTextColor(SelectedIndex);
        }
    }

    public Color SelectedBackgroundColor
    {
        get
        {
            if (SelectedIndex < 0 || SelectedIndex == RightOptions.Count - 1)
                return Colors.Transparent;

            return PositionColorConverter.GetBackgroundColor(SelectedIndex);
        }
    }

    public int SelectedIndex
    {
        get => _selectedIndex;
        set
        {
            if (_selectedIndex != value)
            {
                _selectedIndex = value;
                OnPropertyChanged(nameof(SelectedIndex));
                OnPropertyChanged(nameof(IsAnswered));
                OnPropertyChanged(nameof(SelectedTextColor));
                OnPropertyChanged(nameof(SelectedBackgroundColor));
            }
        }
    }

    public bool IsSelected
    {
        get => _isSelected;
        set
        {
            if (_isSelected != value)
            {
                _isSelected = value;
                OnPropertyChanged(nameof(IsSelected));
            }
        }
    }
    
    
    // ✅ Ответ считается, если выбран не "⊗" и не "не выбрано"
    // Индексы ответов: 0, 1, 2, 3... (A, B, C, D...)
    // Индекс "⊗": RightOptions.Count - 1 (последний)
    public bool IsAnswered => SelectedIndex >= 0 && SelectedIndex < RightOptions.Count - 1;

    public bool IsImage =>
        (!string.IsNullOrEmpty(GroupKey) &&
         (GroupKey.StartsWith("img", StringComparison.OrdinalIgnoreCase) ||
          GroupKey.StartsWith("image", StringComparison.OrdinalIgnoreCase)))
        &&
        (!string.IsNullOrEmpty(Text) &&
         ImageExtensions.Any(ext => Text.EndsWith(ext, StringComparison.OrdinalIgnoreCase)));

    public bool IsFormula => !string.IsNullOrEmpty(Text) && !IsImage && MathHelper.IsMathExpression(Text);

    public bool IsPlainText => !IsImage && !IsFormula;

    protected void OnPropertyChanged(string propertyName) =>
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
}

public class RightItem : INotifyPropertyChanged
{
    private int _selectedIndex = -1;
    private bool _isSelected;
    private string _letter = string.Empty;
    private string _text = string.Empty;
    private string? _groupKey;

    public int Id { get; set; }

    public string Letter
    {
        get => _letter;
        set
        {
            if (_letter != value)
            {
                _letter = value;
                OnPropertyChanged(nameof(Letter));
            }
        }
    }

    public string Text
    {
        get => _text;
        set
        {
            if (_text != value)
            {
                _text = value;
                OnPropertyChanged(nameof(Text));
                OnPropertyChanged(nameof(IsImage));
                OnPropertyChanged(nameof(IsFormula));
                OnPropertyChanged(nameof(IsPlainText));
            }
        }
    }

    public string? GroupKey
    {
        get => _groupKey;
        set
        {
            if (_groupKey != value)
            {
                _groupKey = value;
                OnPropertyChanged(nameof(GroupKey));
                OnPropertyChanged(nameof(IsImage));
            }
        }
    }

    public int SelectedIndex
    {
        get => _selectedIndex;
        set
        {
            if (_selectedIndex != value)
            {
                _selectedIndex = value;
                OnPropertyChanged(nameof(SelectedIndex));
                OnPropertyChanged(nameof(SelectedTextColor));
                OnPropertyChanged(nameof(SelectedBackgroundColor));
                OnPropertyChanged(nameof(IsSelected));
            }
        }
    }

    public bool IsSelected
    {
        get => _isSelected;
        set
        {
            if (_isSelected != value)
            {
                _isSelected = value;
                OnPropertyChanged(nameof(IsSelected));
                OnPropertyChanged(nameof(SelectedTextColor));
                OnPropertyChanged(nameof(SelectedBackgroundColor));
            }
        }
    }

    public Color SelectedTextColor => IsSelected && SelectedIndex >= 0 ? PositionColorConverter.GetTextColor(SelectedIndex) : Colors.Gray;

    public Color SelectedBackgroundColor => IsSelected && SelectedIndex >= 0 ? PositionColorConverter.GetBackgroundColor(SelectedIndex) : Colors.Transparent;

    private static readonly string[] ImageExtensions = { ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff", ".webp", ".svg" };

    public bool IsImage =>
        (!string.IsNullOrEmpty(GroupKey) &&
         (GroupKey.StartsWith("img", StringComparison.OrdinalIgnoreCase) ||
          GroupKey.StartsWith("image", StringComparison.OrdinalIgnoreCase)))
        &&
        (!string.IsNullOrEmpty(Text) &&
         ImageExtensions.Any(ext => Text.EndsWith(ext, StringComparison.OrdinalIgnoreCase)));

    public bool IsFormula => !string.IsNullOrEmpty(Text) && !IsImage && MathHelper.IsMathExpression(Text);

    public bool IsPlainText => !IsImage && !IsFormula;

    public event PropertyChangedEventHandler? PropertyChanged;
    protected void OnPropertyChanged(string propertyName) =>
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
}