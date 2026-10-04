
namespace TestMaturalnyMobApp.Constants
{
    /// <summary>
    /// Константы и расчёты, связанные с размерами экрана,
    /// используемые для адаптивной вёрстки блоков с формулами.
    /// </summary>
    public static class ScreenConfig
    {
        /// <summary>
        /// Приблизительная ширина горизонтальных отступов при расчёте ширины
        /// элемента внутри карточки вопроса (RadioButton/CheckBox + padding Grid'ов + запас).
        /// </summary>
        public const double HorizontalPaddingEstimate = 130;

        /// <summary>
        /// Минимальная допустимая ширина блока с текстом.
        /// </summary>
        public const double MinContentWidth = 180;

        /// <summary>
        /// Порог, ниже которого ширина считается «ещё не заданной».
        /// </summary>
        public const double MinValidWidth = 100;
    }
}
