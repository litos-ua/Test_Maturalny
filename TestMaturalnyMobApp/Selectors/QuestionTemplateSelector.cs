//using TestMaturalnyMobApp.Models;

//namespace TestMaturalnyMobApp.Selectors;

//public class QuestionTemplateSelector : DataTemplateSelector
//{
//    public DataTemplate? SingleChoiceTemplate { get; set; }
//    public DataTemplate? MultipleChoiceTemplate { get; set; }
//    public DataTemplate? DoubleChoiceTemplate { get; set; }
//    public DataTemplate? MatchingTemplate { get; set; }
//    public DataTemplate? CorrectSequenceTemplate { get; set; }

//    protected override DataTemplate OnSelectTemplate(object item, BindableObject container)
//    {
//        if (item is Question question)
//        {
//            return question.Type switch
//            {
//                QuestionType.SingleChoice => SingleChoiceTemplate,
//                QuestionType.MultipleChoice => MultipleChoiceTemplate,
//                QuestionType.DoubleChoice => DoubleChoiceTemplate,
//                QuestionType.Matching => MatchingTemplate,
//                QuestionType.CorrectSequence => CorrectSequenceTemplate,
//                _ => SingleChoiceTemplate ?? throw new InvalidOperationException("SingleChoiceTemplate is null")
//            } ?? throw new InvalidOperationException($"Template for {question.Type} is null");
//        }
//        return SingleChoiceTemplate ?? throw new InvalidOperationException("SingleChoiceTemplate is null");
//    }
//}


using TestMaturalnyMobApp.Models;

namespace TestMaturalnyMobApp.Selectors;

public class QuestionTemplateSelector : DataTemplateSelector
{
    public DataTemplate? SingleChoiceTemplate { get; set; }
    public DataTemplate? MultipleChoiceTemplate { get; set; }
    public DataTemplate? DoubleChoiceTemplate { get; set; }
    public DataTemplate? MatchingTemplate { get; set; }
    public DataTemplate? CorrectSequenceTemplate { get; set; }

    protected override DataTemplate OnSelectTemplate(object item, BindableObject container)
    {
        if (item is Question question)
        {
            return question.Type switch
            {
                QuestionType.SingleChoice => SingleChoiceTemplate,
                QuestionType.MultipleChoice => MultipleChoiceTemplate,
                QuestionType.DoubleChoice => DoubleChoiceTemplate,
                QuestionType.Matching => MatchingTemplate,
                QuestionType.CorrectSequence => CorrectSequenceTemplate,
                _ => SingleChoiceTemplate
            };
        }
        return SingleChoiceTemplate;
    }
}