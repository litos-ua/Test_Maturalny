// ✅ Защита от повторного срабатывания события Picker ПРИ ВОССТАНОВЛЕНИИ СОСТОЯНИЯ!

using System.Collections.ObjectModel;
using TestMaturalnyMobApp.Models;

namespace TestMaturalnyMobApp.Components.Questions;

public partial class QuestionCorrectSequence : QuestionBase
{
    public ObservableCollection<SequenceItem> LeftItems { get; } = new();
    private bool _isRestoring = false;

    public QuestionCorrectSequence()
    {
        InitializeComponent();
    }

    public override void OnQuestionChanged()
    {
        _isRestoring = true;

        LeftItems.Clear();
        if (Question?.Options == null)
        {
            _isRestoring = false;
            return;
        }

        var positionCount = Question.Options.Count;
        var positions = Enumerable.Range(1, positionCount).ToList();

        foreach (var opt in Question.Options)
        {
            var item = new SequenceItem
            {
                Id = opt.Id,
                Text = opt.Text,
                GroupKey = opt.GroupKey,
                Positions = positions,
                SelectedPositionIndex = -1
            };
            LeftItems.Add(item);
        }

        if (SavedAnswer != null)
        {
            for (int i = 0; i < SavedAnswer.Count && i < LeftItems.Count; i++)
            {
                var savedPosition = SavedAnswer[i];
                if (savedPosition > 0 && savedPosition <= positionCount)
                {
                    LeftItems[i].SelectedPositionIndex = savedPosition - 1;
                }
            }
        }

        _isRestoring = false;
    }

    private void OnPickerSelectedChanged(object sender, EventArgs e)
    {
        // ✅ ИГНОРИРУЕМ СОБЫТИЯ ВО ВРЕМЯ ВОССТАНОВЛЕНИЯ
        if (_isRestoring)
        {
            System.Diagnostics.Debug.WriteLine($"⏭️ Пропускаем событие Picker (восстановление)");
            return;
        }

        var picker = sender as Picker;
        if (picker?.BindingContext is SequenceItem item)
        {
            System.Diagnostics.Debug.WriteLine($"🔘 Picker changed: ItemId={item.Id}, SelectedIndex={picker.SelectedIndex}");

            if (picker.SelectedIndex < 0)
                return;

            item.SelectedPositionIndex = picker.SelectedIndex;

            var isDuplicate = LeftItems
                .Where(x => x.Id != item.Id && x.SelectedPositionIndex >= 0)
                .Any(x => x.SelectedPositionIndex == item.SelectedPositionIndex);

            if (isDuplicate)
            {
                item.SelectedPositionIndex = -1;
                picker.SelectedIndex = -1;
                Application.Current?.MainPage?.DisplayAlert(
                    "Увага",
                    "Ця позиція вже зайнята. Виберіть іншу.",
                    "OK");
                return;
            }

            var answers = LeftItems.Select(x => x.SelectedPositionIndex + 1).ToList();
            System.Diagnostics.Debug.WriteLine($"   📤 Отправка ответа: QuestionId={Question?.Id}, Answers=[{string.Join(",", answers)}]");
            AnswerCommand?.Execute(new object[] { Question?.Id, answers });
        }
    }
}