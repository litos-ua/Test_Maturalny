
//using System.Collections.ObjectModel;
//using TestMaturalnyMobApp.Models;

//namespace TestMaturalnyMobApp.Components.Questions;

//public partial class QuestionMatching : QuestionBase
//{
//    public ObservableCollection<MatchingItem> LeftItems { get; } = new();
//    public ObservableCollection<RightItem> RightItems { get; } = new();

//    public QuestionMatching()
//    {
//        InitializeComponent();
//    }

//    public override void OnQuestionChanged()
//    {
//        LeftItems.Clear();
//        RightItems.Clear();

//        if (Question?.Options == null) return;

//        // Собираем уникальные правые варианты
//        var rightOptions = Question.Options
//            .Where(o => !string.IsNullOrEmpty(o.MatchLabel))
//            .Select(o => o.MatchLabel!)
//            .Distinct()
//            .ToList();

//        // Формируем список правых опций с буквами
//        char letter = 'A';
//        foreach (var opt in rightOptions)
//        {
//            var option = Question.Options.First(o => o.MatchLabel == opt);
//            RightItems.Add(new RightItem
//            {
//                Id = option.Id,
//                Letter = letter.ToString(),
//                Text = opt,
//                GroupKey = option.GroupKey
//            });
//            letter++;
//        }
//        // Формируем список букв для Picker с опцией "Нет соответствия"
//        var letters = RightItems.Select(r => r.Letter).ToList();
//        letters.Insert(0, "⊗");

//        // Формируем список левых опций с номерами и буквами для пикера
//        int number = 1;
//        foreach (var opt in Question.Options)
//        {
//            var item = new MatchingItem
//            {
//                Id = opt.Id,
//                Number = number.ToString(),
//                Text = opt.Text,
//                GroupKey = opt.GroupKey,
//                RightOptions = RightItems.Select(r => r.Letter).ToList(),
//                SelectedIndex = -1
//            };

//            // ✅ Восстанавливаем сохраненный ответ
//            if (SavedAnswer != null && SavedAnswer.Count > LeftItems.Count)
//            {
//                var savedId = SavedAnswer[LeftItems.Count];
//                if (savedId > 0)
//                {
//                    var rightItem = RightItems.FirstOrDefault(r => r.Id == savedId);
//                    if (rightItem != null)
//                    {
//                        var index = RightItems.IndexOf(rightItem);
//                        if (index >= 0 && index < item.RightOptions.Count)
//                        {
//                            item.SelectedIndex = index;
//                        }
//                    }
//                }
//            }

//            LeftItems.Add(item);
//            number++;
//        }
//    }

//    private void OnPickerSelectedChanged(object sender, EventArgs e)
//    {
//        var picker = sender as Picker;
//        if (picker?.BindingContext is MatchingItem item)
//        {
//            // Проверяем глобальный флаг восстановления
//            if (IsGlobalRestoring)
//            {
//                return;
//            }

//            // Формируем ответ: список ID правых элементов
//            var answers = LeftItems.Select(x =>
//            {
//                if (x.SelectedIndex >= 0 && x.SelectedIndex < RightItems.Count)
//                {
//                    return RightItems[x.SelectedIndex].Id;
//                }
//                return 0;
//            }).ToList();

//            AnswerCommand?.Execute(new object[] { Question?.Id, answers });
//        }
//    }
//}




// Добавляем обработку выбора в Picker с учетом "Нет соответствия" и восстановления
using System.Collections.ObjectModel;
using TestMaturalnyMobApp.Helpers;
using TestMaturalnyMobApp.Models;

namespace TestMaturalnyMobApp.Components.Questions;

public partial class QuestionMatching : QuestionBase
{
    public ObservableCollection<MatchingItem> LeftItems { get; } = new();
    public ObservableCollection<RightItem> RightItems { get; } = new();

    public QuestionMatching()
    {
        InitializeComponent();
    }

    //public override void OnQuestionChanged()
    //{
    //    LeftItems.Clear();
    //    RightItems.Clear();

    //    if (Question?.Options == null) return;

    //    // Собираем уникальные правые варианты
    //    var rightOptions = Question.Options
    //        .Where(o => !string.IsNullOrEmpty(o.MatchLabel))
    //        .Select(o => o.MatchLabel!)
    //        .Distinct()
    //        .ToList();

    //    // Формируем список правых опций с буквами
    //    char letter = 'A';
    //    foreach (var opt in rightOptions)
    //    {
    //        var option = Question.Options.First(o => o.MatchLabel == opt);
    //        RightItems.Add(new RightItem
    //        {
    //            Id = option.Id,
    //            Letter = letter.ToString(),
    //            Text = opt,
    //            GroupKey = option.GroupKey
    //        });
    //        letter++;
    //    }

    //    // ✅ Формируем список букв для Picker с опцией "Нет соответствия"
    //    var letters = RightItems.Select(r => r.Letter).ToList();
    //    letters.Add("⊗");  // Нет соответствия в конце списка

    //    // Формируем список левых опций с номерами и буквами для пикера
    //    int number = 1;
    //    foreach (var opt in Question.Options)
    //    {
    //        var item = new MatchingItem
    //        {
    //            Id = opt.Id,
    //            Number = number.ToString(),
    //            Text = opt.Text,
    //            GroupKey = opt.GroupKey,
    //            RightOptions = letters,
    //            SelectedIndex = -1
    //        };

    //        // ✅ Восстанавливаем сохраненный ответ
    //        if (SavedAnswer != null && SavedAnswer.Count > LeftItems.Count)
    //        {
    //            var savedId = SavedAnswer[LeftItems.Count];

    //            if (savedId == -1)
    //            {
    //                // ✅ "⊗" выбран — последний индекс
    //                item.SelectedIndex = item.RightOptions.Count - 1;
    //            }
    //            else if (savedId > 0)
    //            {
    //                // ✅ Ищем правую опцию по ID
    //                var rightItem = RightItems.FirstOrDefault(r => r.Id == savedId);
    //                if (rightItem != null)
    //                {
    //                    // ✅ Индекс в RightItems — это и есть правильный индекс (0 для A, 1 для B...)
    //                    var index = RightItems.IndexOf(rightItem);
    //                    if (index >= 0)
    //                    {
    //                        item.SelectedIndex = index;
    //                    }
    //                }
    //            }
    //            // savedId == 0 → ничего не выбрано, оставляем -1
    //        }

    //        LeftItems.Add(item);
    //        number++;
    //    }

    //    // ✅ ПОСЛЕ ВОССТАНОВЛЕНИЯ ВСЕХ ЛЕВЫХ ОПЦИЙ:
    //    // Обновляем правые опции на основе восстановленных левых
    //    foreach (var leftItem in LeftItems)
    //    {
    //        if (leftItem.SelectedIndex > 0 && leftItem.SelectedIndex <= RightItems.Count)
    //        {
    //            var rightItem = RightItems[leftItem.SelectedIndex - 1];
    //            rightItem.IsSelected = true;
    //            rightItem.SelectedIndex = leftItem.SelectedIndex;
    //        }
    //    }
    //}

    public override void OnQuestionChanged()
    {
        LeftItems.Clear();
        RightItems.Clear();

        if (Question?.Options == null) return;

        // ✅ Перемешиваем левые опции
        var shuffledOptions = ShuffleHelper.Shuffle(Question.Options);

        // Собираем уникальные правые варианты
        var rightOptions = Question.Options
            .Where(o => !string.IsNullOrEmpty(o.MatchLabel))
            .Select(o => o.MatchLabel!)
            .Distinct()
            .ToList();

        // Формируем список правых опций с буквами
        char letter = 'A';
        foreach (var opt in rightOptions)
        {
            var option = Question.Options.First(o => o.MatchLabel == opt);
            RightItems.Add(new RightItem
            {
                Id = option.Id,
                Letter = letter.ToString(),
                Text = opt,
                GroupKey = option.GroupKey
            });
            letter++;
        }

        // Формируем список букв для Picker
        var letters = RightItems.Select(r => r.Letter).ToList();
        letters.Add("⊗");

        // ✅ Восстанавливаем ответы по ID
        var savedAnswersDict = new Dictionary<int, int>();
        if (SavedAnswer != null)
        {
            for (int i = 0; i < SavedAnswer.Count && i < Question.Options.Count; i++)
            {
                var opt = Question.Options[i];
                savedAnswersDict[opt.Id] = SavedAnswer[i];
            }
        }

        // Формируем левые опции
        int number = 1;
        foreach (var opt in shuffledOptions)
        {
            var item = new MatchingItem
            {
                Id = opt.Id,
                Number = number.ToString(),
                Text = opt.Text,
                GroupKey = opt.GroupKey,
                RightOptions = letters,
                SelectedIndex = -1
            };

            if (savedAnswersDict.TryGetValue(opt.Id, out var savedId))
            {
                if (savedId == -1)
                {
                    item.SelectedIndex = item.RightOptions.Count - 1;
                }
                else if (savedId > 0)
                {
                    var rightItem = RightItems.FirstOrDefault(r => r.Id == savedId);
                    if (rightItem != null)
                    {
                        var index = RightItems.IndexOf(rightItem);
                        if (index >= 0)
                        {
                            item.SelectedIndex = index;
                        }
                    }
                }
            }

            LeftItems.Add(item);
            number++;
        }

        // Обновляем правые опции
        foreach (var leftItem in LeftItems)
        {
            if (leftItem.SelectedIndex >= 0 && leftItem.SelectedIndex < RightItems.Count)
            {
                var rightItem = RightItems[leftItem.SelectedIndex];
                rightItem.IsSelected = true;
                rightItem.SelectedIndex = leftItem.SelectedIndex;
            }
        }
    }


    //private void OnPickerSelectedChanged(object sender, EventArgs e)
    //{
    //    var picker = sender as Picker;
    //    if (picker?.BindingContext is MatchingItem item)
    //    {
    //        if (IsGlobalRestoring) return;

    //        // Сбрасываем ВСЕ правые опции
    //        foreach (var ri in RightItems)
    //        {
    //            ri.IsSelected = false;
    //            ri.SelectedIndex = -1;
    //        }

    //        // Отмечаем ВСЕ выбранные соответствия из LeftItems
    //        foreach (var leftItem in LeftItems)
    //        {
    //            // ✅ Индекс 0..N-2 — это ответы (A, B, C...)
    //            // ✅ Индекс RightOptions.Count - 1 — это "⊗" (нет соответствия)
    //            if (leftItem.SelectedIndex >= 0 && leftItem.SelectedIndex < RightItems.Count)
    //            {
    //                var rightItem = RightItems[leftItem.SelectedIndex];
    //                rightItem.IsSelected = true;
    //                rightItem.SelectedIndex = leftItem.SelectedIndex;
    //            }
    //        }

    //        var answers = LeftItems.Select(x =>
    //        {
    //            // ✅ Если выбран "⊗" (последний индекс) — возвращаем -1
    //            if (x.SelectedIndex == x.RightOptions.Count - 1)
    //                return -1;

    //            // ✅ Если выбран ответ (индекс 0..N-2) — возвращаем ID правой опции
    //            if (x.SelectedIndex >= 0 && x.SelectedIndex < RightItems.Count)
    //            {
    //                return RightItems[x.SelectedIndex].Id;
    //            }

    //            return 0; // Не выбрано
    //        }).ToList();

    //        AnswerCommand?.Execute(new object[] { Question?.Id, answers });
    //    }
    //}

    private void OnPickerSelectedChanged(object sender, EventArgs e)
    {
        var picker = sender as Picker;
        if (picker?.BindingContext is MatchingItem item)
        {
            if (IsGlobalRestoring) return;

            // ✅ Сбрасываем правые опции
            foreach (var ri in RightItems)
            {
                ri.IsSelected = false;
                ri.SelectedIndex = -1;
            }

            // ✅ Отмечаем выбранные правые опции
            foreach (var leftItem in LeftItems)
            {
                if (leftItem.SelectedIndex >= 0 && leftItem.SelectedIndex < RightItems.Count)
                {
                    var rightItem = RightItems[leftItem.SelectedIndex];
                    rightItem.IsSelected = true;
                    rightItem.SelectedIndex = leftItem.SelectedIndex;
                }
            }

            // ✅ Формируем ответ в ПОРЯДКЕ ИСХОДНЫХ ОПЦИЙ (Question.Options)
            var answers = Question.Options.Select(opt =>
            {
                var leftItem = LeftItems.FirstOrDefault(x => x.Id == opt.Id);
                if (leftItem == null) return 0;

                if (leftItem.SelectedIndex == leftItem.RightOptions.Count - 1)
                    return -1;

                if (leftItem.SelectedIndex >= 0 && leftItem.SelectedIndex < RightItems.Count)
                {
                    return RightItems[leftItem.SelectedIndex].Id;
                }

                return 0;
            }).ToList();

            AnswerCommand?.Execute(new object[] { Question?.Id, answers });
        }
    }
}