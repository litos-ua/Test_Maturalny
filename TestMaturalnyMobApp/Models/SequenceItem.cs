using System.ComponentModel;
using System.Runtime.CompilerServices;
using TestMaturalnyMobApp.Converters;
using TestMaturalnyMobApp.Helpers;

namespace TestMaturalnyMobApp.Models;

public class SequenceItem : INotifyPropertyChanged
{
    private int _selectedPositionIndex = -1;
    private bool _isSelected;

    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public string? GroupKey { get; set; }
    public List<int> Positions { get; set; } = new();
    private static readonly string[] ImageExtensions = {".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff", ".webp", ".svg" };

    public Color SelectedTextColor =>
    SelectedPositionIndex < 0
        ? Colors.Gray
        : PositionColorConverter.GetTextColor(SelectedPositionIndex);

    public Color SelectedBackgroundColor =>
    SelectedPositionIndex < 0
        ? Colors.Transparent
        : PositionColorConverter.GetBackgroundColor(SelectedPositionIndex);

    public int SelectedPositionIndex
    {
        get => _selectedPositionIndex;
        set
        {
            if (_selectedPositionIndex != value)
            {
                _selectedPositionIndex = value;
                OnPropertyChanged();
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
                OnPropertyChanged();
            }
        }
    }

    public bool IsFormula => !string.IsNullOrEmpty(Text) && MathHelper.IsMathExpression(Text);

    public bool IsImage =>
    (!string.IsNullOrEmpty(GroupKey) &&
     (GroupKey.StartsWith("img", StringComparison.OrdinalIgnoreCase) ||
      GroupKey.StartsWith("image", StringComparison.OrdinalIgnoreCase)))
    ||
    (!string.IsNullOrEmpty(Text) &&
     ImageExtensions.Any(ext => Text.EndsWith(ext, StringComparison.OrdinalIgnoreCase)));

    public bool IsPlainText => !IsImage && !IsFormula;

    public event PropertyChangedEventHandler? PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
