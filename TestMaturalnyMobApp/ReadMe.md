# 2026.07.20
1. API возвращает: { "text": "/images/test/history/options/history_opt_0501.jpg", "groupKey": "image_11389_01" }
   ↓
2. AnswerOption.IsImage = true (по GroupKey)
   ↓
3. XAML: <ContentView IsVisible="{Binding IsImage}">
   ↓
4. <controls:ZoomableImage Source="{Binding Text}" />
   ↓
5. ZoomableImage использует RelativeToAbsoluteUrlConverter
   ↓
6. "/images/test/..." → "https://zno-nmt.com.ua/images/test/..."
   ↓
7. MAUI загружает изображение
   ↓
8. Показывает миниатюру (кликабельную)


# 2026.07.20
Причина падения: Command с async Task на Android в релизном режиме
Проблемный код:

// ❌ ЭТО ВЫЗЫВАЛО ПАДЕНИЕ НА ANDROID В РЕЛИЗНОМ РЕЖИМЕ
SaveCurrentAnswerCommand = new Command(async () => await SaveCurrentAnswerAsync());
CompleteTestCommand = new Command(async () => await CompleteTestAsync());
Почему это вызывало падение:
Command ожидает синхронный делегат (Action), а не async Task

При передаче async () => await ... создается async void лямбда

async void методы опасны - они не возвращают Task и ошибки не могут быть перехвачены вызывающим кодом

На Android в релизном режиме, когда происходит исключение в async void:

Исключение выбрасывается в UI потоке

Приложение падает (crash) без возможности обработки

В отладке исключение перехватывается дебаггером, поэтому приложение не падает

Разница между режимами:
Режим	Поведение
Отладка (Debug)	Исключения перехватываются дебаггером, показывается ошибка, приложение продолжает работу
Релиз (Release)	Исключение в async void вызывает немедленный crash без возможности обработки
Правильное решение:
csharp
// ✅ Используем async void метод вместо async лямбды
SaveCurrentAnswerCommand = new Command(SaveCurrentAnswer);
CompleteTestCommand = new Command(CompleteTest);

// ✅ Методы с async void (но с try-catch внутри!)
private async void SaveCurrentAnswer()
{
    try
    {
        // ... логика с await
    }
    catch (Exception ex)
    {
        // Обработка ошибки
        System.Diagnostics.Debug.WriteLine($"❌ Ошибка: {ex.Message}");
    }
}

private async void CompleteTest()
{
    try
    {
        // ... логика с await
    }
    catch (Exception ex)
    {
        // Обработка ошибки
        System.Diagnostics.Debug.WriteLine($"❌ Ошибка: {ex.Message}");
    }
}

Краткий итог:
Главная причина падения: использование async лямбды в Command → создание async void → необработанное исключение → crash на Android в Release режиме.

Решение: заменить на метод с async void с обработкой ошибок внутри (try-catch).



# 2026.07.22

1. Компонент ZoomableImage - работа с изображениями
Добавленный функционал:
Функция	Описание
Увеличение/уменьшение	Кнопки ＋ и － с шагом 0.25x (от 0.5x до 3.0x)
Пинч-зум	Масштабирование двумя пальцами (сенсорные экраны)
Перетаскивание	Pan пальцем при увеличении > 1.0x
Сброс масштаба	Кнопка ⟲ возвращает к 1.0x и центрирует
Адаптивные размеры	Разные размеры для Phone/Tablet/Desktop
Индикатор масштаба	Отображение текущего уровня (1.0x, 1.5x, 2.0x...)
Полноэкранный режим	Открытие по тапу на миниатюру
Закрытие	По тапу на фон или кнопку ✕
Параметры для миниатюры:
csharp
MaxHeight = 75px   // По умолчанию
MaxWidth = 150px   // По умолчанию
Параметры для полноэкранного режима:
Устройство	HeightRequest	WidthRequest
Phone	300	450
Tablet	450	650
Desktop	600	800
2. Компонент QuestionSingleChoice - адаптация для опций
Добавленный функционал:
Функция	Описание
Горизонтальный скроллинг опций	Единый скролл для всех опций
Вертикальное расположение опций	Сохранено (как было)
Индивидуальный скроллинг формул	Каждая формула может скроллиться вертикально
Распознавание формул	Автоматическое определение LaTeX формул в тексте
Отображение формул	Через MathJax в WebView (MathFormulaView)
Отображение изображений	Через ZoomableImage (с возможностью увеличения)
Адаптация контента	Корректное отображение текста, формул и изображений
3. Компонент MathFormulaView - отображение формул
Созданный компонент:
Функция	Описание
MathJax рендеринг	Отображение LaTeX формул через WebView
Адаптивные размеры	HeightRequest=50, WidthRequest=300
Минимальные отступы	Убраны лишние padding для компактности
Вертикальное центрирование	Формулы центрируются внутри контейнера
Поддержка скроллинга	Работает внутри ScrollView
4. Хелпер MathHelper - распознавание формул
Созданный хелпер:
Функция	Описание
Распознавание формул	Определение LaTeX в тексте
Поддержка функций	sin, cos, log, sqrt, frac, int, sum, lim и др.
Поддержка символов	Греческие буквы, математические символы
Очистка LaTeX	Преобразование в читаемый вид
Универсальность	Используется в Question и AnswerOption
Поддерживаемые формулы:
Тригонометрические: \sin, \cos, \tan, \cot, \arcsin, \arccos, \arctan

Логарифмы: \log, \ln, \lg

Корни: \sqrt, \root

Дроби: \frac, \dfrac, \tfrac

Интегралы: \int, \iint, \iiint, \oint

Суммы: \sum, \prod

Пределы: \lim, \max, \min

Комбинаторика: \binom, \choose, \perm, \comb

Греческие буквы: \alpha, \beta, \gamma, \pi, \omega и др.

Специальные символы: \infty, \partial, \nabla, \forall, \exists

Математические символы Unicode: ²³⁴⁵⁶⁷⁸⁹, ±×÷√∞∫∑∏π и др.

5. Конвертер MathTextConverter - разбор текста
Созданный конвертер:
Функция	Описание
Разбор текста	Разделяет текст на части (обычный текст + формулы)
Распознавание формул	Формулы выделяются обратными кавычками `формула`
Поддержка MathPart	Каждая часть имеет флаг IsFormula и Content
6. Обновления в моделях
Question.cs:
csharp
public bool IsFormula => !string.IsNullOrEmpty(Text) && MathHelper.IsMathExpression(Text);
AnswerOption.cs:
csharp
public bool IsFormula => !string.IsNullOrEmpty(Text) && MathHelper.IsMathExpression(Text);
public bool IsImage => !string.IsNullOrEmpty(GroupKey) && 
                       (GroupKey.ToLower().StartsWith("img") ||
                        GroupKey.ToLower().StartsWith("image"));
7. Структура файлов (итоговая)
text
TestMaturalnyMobApp/
├── Components/
│   ├── ZoomableImage.xaml
│   ├── ZoomableImage.xaml.cs
│   └── Questions/
│       └── QuestionSingleChoice.xaml
│
├── Controls/
│   └── MathFormulaView.cs          ← Новый компонент
│
├── Converters/
│   ├── MathTextConverter.cs        ← Новый конвертер
│   └── ...
│
├── Helpers/
│   └── MathHelper.cs               ← Новый хелпер
│
└── Models/
    └── Question.cs                 ← Обновлен
8. Визуальный результат
Опции с текстом:
text
[Radio] Розв'яжіть рівняння: log₂(x + 3) = 4
[Radio] x = 13
[Radio] x = 16
[Radio] x = 5
Опции с формулой:
text
[Radio] ┌─────────────────────────┐
        │  log₂(x + 3) = 4        │  ← MathFormulaView
        └─────────────────────────┘
Опции с изображением:
text
[Radio] ┌──────────┐
        │  Image   │  ← ZoomableImage (миниатюра)
        └──────────┘
Полноэкранный режим изображения:
text
┌─────────────────────────────────────┐
│  ➕   ⟲   ➖                        │ ← Управление масштабом
│                                     │
│        ┌──────────────┐             │
│        │  Image       │             │ ← Увеличенное изображение
│        │  (Zoom/Pan)  │             │   (можно тащить)
│        └──────────────┘             │
│                                     │
│                    ✕                │ ← Закрыть
└─────────────────────────────────────┘


# 2026.07.24

корректировок компонента QuestionCorrectSequence
1. Обновлена модель SequenceItem
Добавлена реализация INotifyPropertyChanged

Добавлены свойства: IsImage, IsFormula, IsPlainText, SelectedColor

SelectedPositionIndex по умолчанию = -1 (позиция не выбрана)

SelectedColor возвращает цвет в зависимости от выбранной позиции

2. Обновлен XAML компонента
Добавлен единый фон для опций через LightOptionsBackgroundColor / DarkOptionsBackgroundColor

Добавлена поддержка изображений через ZoomableImage

Добавлена поддержка формул через MathFormulaView

Добавлен Picker с обработчиком SelectedIndexChanged

Добавлен конвертер PositionColorConverter для цветовой индикации выбранной позиции

Убрано дублирование заголовков

3. Обновлен код компонента
Исправлена логика проверки дублирования позиций:

Проверяются только выбранные позиции (игнорируются -1)

При конфликте позиция сбрасывается и показывается предупреждение

Ответ сохраняется через AnswerCommand.Execute() с передачей QuestionId и списка позиций

Добавлена отладка для контроля работы

4. Создан конвертер PositionColorConverter
Преобразует индекс позиции в цвет:

0 → Красный

1 → Оранжевый

2 → Зеленый

3 → Синий

4+ → Фиолетовый/Бирюзовый

Зарегистрирован в App.xaml

5. Добавлены цвета в темы
LightOptionsBackgroundColor / DarkOptionsBackgroundColor

LightOptionsTextColor / DarkOptionsTextColor

LightOptionsLabelColor / DarkOptionsLabelColor

6. Итоговая логика работы
Что	Как работает
Отображение опций	Текст / Изображение / Формула — в зависимости от содержимого
Выбор позиции	Picker с цветовой индикацией (PositionColorConverter)
Проверка дублирования	Игнорируются -1, только выбранные позиции проверяются
Сохранение ответа	AnswerCommand.Execute() → TestSessionService.SaveAnswer()
Восстановление ответа	Через SavedAnswer при загрузке вопроса
IsAnswered	Автоматически обновляется при сохранении
7. Цветовая схема Picker
Позиция	Цвет
1	🔴 Красный
2	🟠 Оранжевый
3	🟢 Зеленый
4	🔵 Синий
5	🟣 Фиолетовый
6	🩵 Бирюзовый
8. Исправленные проблемы
Проблема	Решение
❌ Текст опций не отображался	Добавлен Label с правильной привязкой
❌ Изображения и текст накладывались	Разделение через IsImage / IsPlainText
❌ Формулы не отображались	Добавлен MathFormulaView
❌ Дублирование заголовков	Убран лишний Label
❌ Выбор позиции не сохранялся	Добавлен SelectedIndexChanged
❌ Ложные предупреждения о дублировании	Проверка только выбранных позиций
❌ Не было цветовой индикации	Добавлен PositionColorConverter
❌ Фон опций не менялся	Добавлены LightOptionsBackgroundColor / DarkOptionsBackgroundColor
9. Файлы, которые были изменены/созданы
Файл	Действие
Models/SequenceItem.cs	Обновлен (INotifyPropertyChanged, IsImage, IsFormula, IsPlainText, SelectedColor)
Components/Questions/QuestionCorrectSequence.xaml	Обновлен (фон, ZoomableImage, MathFormulaView, Picker с конвертером)
Components/Questions/QuestionCorrectSequence.xaml.cs	Обновлен (логика дублирования, сохранение ответа)
Converters/PositionColorConverter.cs	Создан
Styles/LightColors.xaml	Добавлены LightOptionsBackgroundColor, LightOptionsTextColor, LightOptionsLabelColor
Styles/DarkColors.xaml	Добавлены DarkOptionsBackgroundColor, DarkOptionsTextColor, DarkOptionsLabelColor
App.xaml	Зарегистрирован PositionColorConverter


# 2026.07.27 
1. Единый источник ответов
Все ответы хранятся в TestSessionService._answers

Доступ через GetAnswer(questionId) и SaveAnswer(questionId, List<int>)

2. Глобальный флаг восстановления IsGlobalRestoring
Добавлен в QuestionBase

Устанавливается в true до создания компонента в QuestionToViewConverter

Сбрасывается в false после восстановления

Все компоненты проверяют этот флаг и игнорируют события UI во время восстановления

3. Восстановление через SavedAnswer
SavedAnswer передается в компонент через конвертер

В OnQuestionChanged() состояние восстанавливается из SavedAnswer

4. Исправлены компоненты
Компонент	Проблема	Решение
SingleChoice	Не было проблемы	RadioButton не генерирует события при программном изменении
MultipleChoice	CheckBox генерировал CheckedChanged	Проверка IsGlobalRestoring в OnOptionChecked
CorrectSequence	Picker генерировал SelectedIndexChanged	Флаг _isRestoring в компоненте
Matching	Picker генерировал SelectedIndexChanged	Флаг _isRestoring в компоненте
5. Очистка LoadCurrentAnswer()
Теперь работает только для SingleChoice

Остальные типы восстанавливаются через SavedAnswer в своих компонентах

Итог
Теперь при возврате к любому типу вопроса:

✅ UI правильно отображает выбранные опции

✅ Ответы не перезаписываются

✅ Состояние сохраняется при многократных переключениях

2026.07.28

Во TestSessionViewModel добавлено свойство public string CurrentQuestionDisplayText, которое преобразует
символы "<br>" и "\\n" в "\n".

В ZoomableImage в Pinch добавлено <PanGestureRecognizer PanUpdated="OnPanUpdated"/>    для поддержки перетаскивания изображения при увеличении.


# 2026.07.29

1. Изменение внешнего вида Matching
Было: Правые опции отображались в Picker (выпадающий список)

Стало: Правые опции вынесены в отдельный блок внизу, в Picker только буквы (A, B, C, D)

Цель: Экономия места, удобство восприятия длинных текстов

2. Добавлены новые модели
Модель	Назначение
MatchingItem	Левая опция (номер, текст, GroupKey, список букв, SelectedIndex)
RightItem	Правая опция (буква, текст, GroupKey, IsSelected)
3. Логика работы
Левая опция → выбор буквы в Picker → соответствует правой опции

Сохраняется ID правой опции, а не индекс

Добавлена опция "⊗" (нет соответствия) → сохраняется -1

4. Восстановление состояния
При возврате к вопросу SavedAnswer восстанавливает выбранные соответствия

Правые опции подсвечиваются цветом выбранной пары

5. Цветовая индикация
Используется PositionColorConverter (как в CorrectSequence)

Каждая пара (левая-правая) получает свой цвет

Полупрозрачный фон для выбранных опций

6. Поддержка контента
Изображения: ZoomableImage (по GroupKey и расширениям)

Формулы: MathFormulaView (по наличию LaTeX)

Текст: Обычный Label (если не изображение и не формула)

7. Исправленные проблемы
Проблема	Решение
Правые опции не восстанавливали цвет	Добавлен проход по LeftItems после восстановления
Одинаковый цвет для всех правых опций	Передается SelectedIndex в RightItem
"⊗" не отображался	Добавлен в список RightOptions
IsAnswered не работал для "⊗"	IsAnswered = SelectedIndex > 0
8. Файлы, которые были изменены
Файл	Изменения
QuestionMatching.xaml	Новая структура (левые + правые опции)
QuestionMatching.xaml.cs	Логика выбора, восстановления, цветов
MatchingItem.cs	Добавлены цветовые свойства
RightItem.cs	Добавлены цветовые свойства, INotifyPropertyChanged
PositionColorConverter.cs	Расширен для работы с Matching
9. Итоговый результат
✅ Matching полностью работает

✅ Сохраняет и восстанавливает ответы

✅ Цветовая индикация пар (как в CorrectSequence)

✅ Поддерживает изображения и формулы

✅ Есть опция "⊗" (нет соответствия)

✅ Правые опции вынесены вниз для удобства

# 2026.07.31

Перемешивание опций
1. Единый механизм перемешивания
Создан метод ShuffleHelper.Shuffle<T>() для перемешивания любых списков

Перемешивание происходит при загрузке вопросов в InitializeQuestions

2. Что перемешивается
Тип вопроса	Что перемешивается	Как
SingleChoice	Опции	Через ShuffleHelper в InitializeQuestions
MultipleChoice	Опции	Через ShuffleHelper в InitializeQuestions
CorrectSequence	Элементы последовательности	Через ShuffleHelper в InitializeQuestions
Matching	Левые опции	Явно в OnQuestionChanged
3. Matching (особый случай)
Правые опции — не перемешиваются, остаются в порядке A, B, C, D

Левые опции — перемешиваются через ShuffleHelper.Shuffle(Question.Options)

Восстановление ответов — по ID, а не по индексу (из-за перемешивания)

4. Сохранение и восстановление
SingleChoice/MultipleChoice/CorrectSequence — работают через стандартный механизм SavedAnswer

Matching — SavedAnswer восстанавливается по ID опции, ответы сохраняются в порядке Question.Options


# 2026.08.03

1. Создана страница ExamRulesPage
Расположение: Views/ExamRulesPage.xaml

ViewModel: ExamRulesViewModel (наследуется от BaseViewModel)

Модель данных: QuestionType (record с полями Type, Title, Short, Details)

2. Структура страницы
Использует LayoutView для единого стиля (Header + Footer)

Список типов вопросов через CollectionView

Каждый тип вопроса отображается в отдельном Frame с:

Названием (Title)

Кратким описанием (Short)

Кнопкой "Докладніше про оцінювання"

3. Адаптация под темы
Добавлены цвета для Frame:

Светлая тема: LightCardBackgroundColor (#FFFFFF)

Темная тема: DarkCardBackgroundColor (#2A2A2A)

Текст адаптирован через AppThemeBinding

4. Функциональность
Кнопка "Докладніше" → показывает DisplayAlert с полными правилами оценивания

ToggleTheme → переключение темной/светлой темы через BaseViewModel

5. Интеграция с выпадающим меню
В HeaderView добавлен пункт меню "Правила тестування"

При выборе → навигация на ExamRulesPage

6. Маршрутизация
Зарегистрирован маршрут в AppShell.xaml.cs:

csharp
Routing.RegisterRoute("ExamRulesPage", typeof(Views.ExamRulesPage));



# 2026.08.05

1. Создана страница
Файл: Views/SubjectsPage.xaml

ViewModel: SubjectsViewModel (наследуется от BaseViewModel)

Модель: SubjectDto (record с полями Name, Description)

2. Структура страницы
Использует LayoutView (Header + Footer)

Два раздела:

Обов'язкові предмети (3 предмета)

Необов'язкові дисципліни (5 предметов)

3. Функциональность
Отображение списка предметов через CollectionView

Адаптивные цвета под тему (светлая/темная)

Кнопка выбора необязательного предмета (SelectionChanged)

Переключение темы через HeaderView (наследование от BaseViewModel)

4. Интеграция с меню
Добавлен пункт "📚 Предмети" в выпадающее меню

Навигация: ///SubjectsPage

5. Цветовая адаптация
LightCardBackgroundColor / DarkCardBackgroundColor

LightTextPrimaryColor / DarkTextPrimaryColor

LightTextSecondaryColor / DarkTextSecondaryColor




# 2026.08.06

Внедрение аутентификации в MAUI
1. Бэкенд (ASP.NET)
Уже готов: AuthController (регистрация, вход, обновление токенов, выход, восстановление пароля)

JWT токены + Refresh токены

Роли: Guest, Student, Teacher, Admin

2. Модели DTO
DTO	Назначение
LoginRequestDto	Вход (email + password)
RegisterUserDto	Регистрация
TokenApiResponseDto	Ответ с токенами
AuthUserDto	Данные пользователя
ForgotPasswordRequestDto	Восстановление пароля
ResetPasswordRequestDto	Сброс пароля
3. Сервисы
Сервис	Назначение
AuthApiClient	HTTP-запросы к API аутентификации
IAuthService / AuthService	Логика аутентификации
ITokenService / TokenService	Хранение токенов в SecureStorage
IAuthStateService / AuthStateService	Глобальное состояние аутентификации
4. ViewModels
ViewModel	Назначение
LoginViewModel	Вход (email + password)
RegisterViewModel	Регистрация (валидация через FluentValidation)
ForgotPasswordViewModel	Восстановление пароля
ResetPasswordViewModel	Сброс пароля
5. Views (страницы)
Страница	Статус
LoginPage	✅ Готова
RegisterPage	✅ Готова
ForgotPasswordPage	✅ Готова
ResetPasswordPage	✅ Готова
6. Навигация
Маршруты зарегистрированы в AppShell

Защита маршрутов через OnNavigating (только для авторизованных)

Переходы через Shell.Current.GoToAsync()

7. HeaderView (адаптация)
Элемент	Изменение
Кнопка входа	Показывается только неавторизованным
Кнопка выхода	Показывается только авторизованным
Кнопка регистрации	Показывается только неавторизованным
Меню	Динамическое (вход/выход в зависимости от статуса)
Тема	Сохранение состояния, обновление иконок
8. Состояние аутентификации
AuthStateService — глобальный сервис

Подписка на изменения в HeaderView

Обновление UI при входе/выходе

9. Валидация
FluentValidation для Login, Register, ResetPassword

Проверка email, пароля (длина, спецсимволы), подтверждения

10. Интеграция с существующей логикой
BaseViewModel расширен для поддержки IAuthStateService

HomePageViewModel использует состояние для меню

ApiClient обновлен для работы с токенами

📊 Статус компонентов аутентификации:
Компонент	Статус
DTO	✅ Готово
Сервисы	✅ Готово
ViewModels	✅ Готово
Views	✅ Готово
Навигация	✅ Готово
HeaderView	✅ Готово
Валидация	✅ Готово
Токены (SecureStorage)	✅ Готово
Глобальное состояние	✅ Готово
🔑 Поток аутентификации:
text
1. Пользователь вводит email + password → LoginPage
   ↓
2. LoginViewModel → AuthService.LoginAsync()
   ↓
3. AuthApiClient → POST /api/auth/login
   ↓
4. Сервер возвращает access + refresh токены
   ↓
5. TokenService → сохраняет в SecureStorage
   ↓
6. AuthStateService → обновляет состояние (IsAuthenticated = true)
   ↓
7. HeaderView → обновляет UI (скрывает вход, показывает выход)
   ↓
8. Shell → переход на HomePage


# 2026.08.08

Подключение иконок вместо эмодзи
1. Структура иконок
Resources/Images/icons/
├── menu_light.png          # Меню (светлая тема)
├── menu_dark.png           # Меню (темная тема)
├── mode_light.png          # Переключение темы (светлая → показываем полумесяц)
├── mode_dark.png           # Переключение темы (темная → показываем солнышко)
├── login_light.png         # Вход (светлая тема)
├── login_dark.png          # Вход (темная тема)
├── logout_light.png        # Выход (светлая тема)
├── logout_dark.png         # Выход (темная тема)
├── app_registration_light.png  # Регистрация (светлая тема)
└── app_registration_dark.png   # Регистрация (темная тема)

2. Метод обновления иконок UpdateAllIcons()
3. XAML (без ImageSource привязок)
4. Логика работы
 Тема	    menu	        login	        logout	            app_registration	            theme
 Светлая	menu_light.png	login_light.png	logout_light.png	app_registration_light.png	    darkmode_light.png (🌙)
 Темная	    menu_dark.png	login_dark.png	logout_dark.png	    app_registration_dark.png	    lightmode_dark.png (☀️)
5. Схема работы
При запуске / переключении темы
    ↓
UpdateAllIcons() вызывается
    ↓
Определяется isDark = Application.Current?.UserAppTheme == AppTheme.Dark
    ↓
suffix = isDark ? "_dark" : "_light"
    ↓
iconPath = $"icons/{baseName}{suffix}.png"
    ↓
button.ImageSource = iconPath
    ↓
Иконка обновляется на правильную для текущей темы

# 2026.09.28

1. Поддержка вопросов типа OpenAnswer
Models/Question.cs — в enum QuestionType добавлено значение OpenAnswer = 5. Существующие значения не сдвинуты, обратная совместимость сохранена.
Components/Questions/QuestionBase.cs — добавлены bindable-свойства SavedTextAnswer (тип List<string>) и TextAnswerCommand (тип ICommand) для передачи текстовых ответов.
Components/Questions/QuestionOpenAnswer.xaml + .xaml.cs — создан новый компонент:
количество полей ввода = число опций с IsCorrect == true;
значения хранятся как строки (как в React), чтобы не терять промежуточный ввод;
валидация на вводе: только цифры и не более одной точки;
ответ сохраняется автоматически на каждое изменение текста через TextAnswerCommand.
Services/TestSessionService.cs — добавлен параллельный словарь _textAnswers: Dictionary<int, List<string>> (не ломает существующий _answers):
метод SaveTextAnswer(questionId, texts) — сохраняет текстовый ответ и обновляет Question.IsAnswered;
метод GetTextAnswer(questionId) — возвращает текстовый ответ;
метод GetAllTextAnswers() — возвращает все текстовые ответы;
инициализация пустых списков для OpenAnswer-вопросов в InitializeQuestions;
очистка _textAnswers в ResetTest.
Helpers/TestConfigHelpers.cs — правила для OpenAnswer:
GetRequiredAnswerCount возвращает число правильных опций;
IsPartialScoreAllowed возвращает false (частичных баллов нет).
Helpers/TestCalculator.cs — добавлена ветка оценки OpenAnswer:
2 балла за каждое верное поле;
сравнение сначала как чисел, затем как строк (как в React, без нормализации запятой);
isCorrect — только при полном совпадении;
score = min(correctCount * 2, question.MaxScore).
Converters/QuestionToViewConverter.cs — добавлены статические поля GlobalTextAnswerCommand и GlobalGetTextAnswer, 
кейс QuestionType.OpenAnswer в switch, передача TextAnswerCommand и SavedTextAnswer в создаваемый компонент.
ViewModels/TestSessionViewModel.cs — добавлены SaveTextAnswerCommand, OnSaveTextAnswerCommand, GetTextAnswer; прокинуты в QuestionToViewConverter.

2. Улучшение работы кнопки «Зберегти»
ViewModels/TestSessionViewModel.cs — метод SaveCurrentAnswer переработан:
добавлен метод ValidateCurrentAnswer(questionId, out errorMessage) с проверками по каждому типу вопроса (SingleChoice, MultipleChoice, DoubleChoice, Matching, CorrectSequence, OpenAnswer);
при невалидном ответе — alert с конкретным сообщением под тип;
при валидном ответе — переход к следующему вопросу (или подсказка про «Завершити», если это последний вопрос);
для SingleChoice — явное сохранение через SaveAnswer, для остальных — ответ уже сохранён автоматически.
Устранено ложное предупреждение «Будь ласка, виберіть варіант відповіді», которое раньше появлялось для всех типов, кроме SingleChoice.

3. Улучшение визуализации формул (inline вместо блочных)
Controls/MathRichText.cs — создан новый компонент:
принимает строку с формулами, обрамлёнными в обратные кавычки (`...`);
рендерит весь текст (обычный + формулы) как один HTML-документ с inline-формулами MathJax (\( ... \));
заменяет блочный display-режим (\[ ... \]) на inline, что устраняет переносы строк до и после формул;
стиль display: inline-block для контейнера формулы (вместо display: flex).
Components/Questions/QuestionSingleChoice.xaml — блок FlexLayout + MathFormulaView + Label заменён на один MathRichText.
Components/Questions/QuestionMultipleChoice.xaml — аналогичная замена.
Components/Questions/QuestionMatching.xaml и QuestionCorrectSequence.xaml — ветка формулы и ветка текста объединены в один MathRichText; ветка изображения (ZoomableImage) осталась отдельной.

4. Улучшение эвристики вычисления высоты
Controls/MathRichText.cs — переработан расчёт HeightRequest:
добавлено bindable-свойство AvailableWidth — позволяет задать ширину извне;
приоритет источника ширины: AvailableWidth → Width (реальная ширина блока) → ширина экрана с запасом;
подписка на SizeChanged самого компонента — пересчёт высоты, когда MAUI вычисляет реальную ширину;
улучшенная эвристика: средняя ширина символа TextSize * 0.55, нормализация формул (замена на строку длиной ~1.4 от текста формулы), 
запас 15% на переносы по словам, межстрочный интервал TextSize * 1.5;
защита _lastUsedWidth от повторного пересчёта при незначительных изменениях ширины.

5. Обработка тега <br> в тексте вопроса
Controls/MathRichText.cs — перед HtmlEncode добавлена нормализация:
<br>, <br/>, <br /> (и любые <br\s*/?>) заменяются на \n;
затем текст энкодится и \n превращается в <br/>;
результат: тег <br> из данных сервера корректно отображается как перенос строки, а не как текст.
Другие HTML-теги остаются экранированными — это защита от произвольного HTML в данных.

6. Подсчёт отвеченных вопросов с учётом OpenAnswer
ViewModels/TestSessionViewModel.cs — метод CompleteTest:
перед подсчётом вызывается _sessionService.RecalculateAnsweredFlags() — пересчёт флагов IsAnswered из данных (защита от рассинхрона);
количество отвеченных вопросов считается через Questions.Count(q => q.IsAnswered) — единый источник истины для UI и счётчика.
Services/TestSessionService.cs — добавлен метод RecalculateAnsweredFlags():
проходит по всем вопросам;
для OpenAnswer проверяет наличие хотя бы одного непустого текста в _textAnswers;
для остальных типов — наличие хотя бы одного id > 0 в _answers;
обновляет Question.IsAnswered.

7. Точечные исправления
ViewModels/TestSessionViewModel.cs — везде, где используется QuestionType, применено полное имя TestMaturalnyMobApp.Models.QuestionType — устраняет конфликт с другим QuestionType, подтягиваемым из неявных using.

8. Корректировка счетчика для вопросов OpenAnswer (брался из двух мест, и оба смотрели только на _answers (числовые ответы), игнорируя _textAnswers - TestSessionViewModel.CompleteTest
и TestSessionService.IsQuestionAnswered).
Для корректировки опираемся на опираться на Question.IsAnswered - используем флаг IsAnswered у самих вопросов, потому что он уже корректно ставится и для числовых, и для текстовых ответов.
(Questions.Count(q => q.IsAnswered)) — берёт флаг IsAnswered у объекта Question. Источник истины — флаг, который кто-то (SaveAnswer / SaveTextAnswer) 
должен поддерживать в актуальном состоянии.
Добавляем страховку — метод, который при желании пересчитывает флаг из данных: RecalculateAnsweredFlags() и вызываем его в CompleteTest перед счётчиком.

8. Подкорректирован MauiProgram.cs с добавлением Android-хендлера для поля ввода:
'#if ANDROID
            Microsoft.Maui.Handlers.EntryHandler.Mapper.AppendToMapping( '

На всех Android-устройствах, независимо от региональных настроек, клавиатура будет принимать точку, запятую и минус в полях с Keyboard="Numeric".

# 2026.09.29

Компонент MathRichText (Controls/MathRichText.cs)
Создан кастомный WebView для отображения текста с inline-формулами MathJax:
принимает строку с формулами, обрамлёнными в обратные кавычки (`...`);
рендерит весь текст (обычный + формулы) как один HTML-документ, формулы встраиваются в поток через inline-режим MathJax (\( ... \));
заменяет блочный display-режим (\[ ... \]) на inline — это устраняет переносы строк до и после формул;
подставляет цвет текста в зависимости от темы (светлая/тёмная);
нормализует HTML-тег <br> (<br>, <br/>, <br />) в перенос строки, остальные теги экранируются;
поддерживает bindable-свойства: Text, TextSize, BaseHeight, AvailableWidth, MaximumHeightRequest.

Улучшение визуализации формул
Вопрос и опции теперь рендерятся как единый HTML-блок, а не как цепочка Label + MathFormulaView + Label (раньше формулы «выпадали» из потока текста и переносились на отдельную строку).

В компонентах QuestionSingleChoice, QuestionMultipleChoice, QuestionMatching, QuestionCorrectSequence:

блок FlexLayout + MathFormulaView + Label заменён на один MathRichText;
ветка изображения (ZoomableImage) осталась отдельной и работает как раньше;
ветка формулы и ветка текста объединены в один компонент.

В TestSessionPage.xaml текст вопроса также обёрнут в MathRichText.

Эвристика высоты блока
RecalculateHeight вычисляет HeightRequest по:

средней ширине символа (TextSize * 0.55);
нормализации формул (замена на строку длиной ~1.4 от текста формулы);
запасу 10% на переносы по словам;
межстрочному интервалу TextSize * 1.5;
padding +16.
Учитывается MaximumHeightRequest сверху: HeightRequest = Math.Min(maxHeight, Math.Max(BaseHeight, calculatedHeight)). Это позволяет ограничить высоту блока и включить прокрутку для длинного текста.
Подписка на SizeChanged через OnSelfSizeChanged:
если ширина ещё не задана или слишком мала — вычисляется из ширины экрана с учётом отступов;
иначе — пересчёт высоты при изменении ширины с защитой от лишних вызовов (_lastUsedWidth).

Ограничение высоты и прокрутка
В опциях текст обёрнут в ScrollView Orientation="Vertical" с MaximumHeightRequest="180". Это даёт вертикальную прокрутку для длинных опций, не мешая горизонтальной прокрутке ряда опций.

Для текста вопроса используется аналогичный подход с MaximumHeightRequest="300".

Внутри HTML включены height: 100% и overflow-y: auto — без них прокрутка внутри WebView не работала бы.

Адаптивная ширина
Ширина опций вычисляется по формуле screenWidth - HorizontalPaddingEstimate, где отступ учитывает RadioButton/CheckBox, отступы Grid и запас.

Расчёт вынесен в ScreenConfig (Constants/ScreenConfig.cs):

HorizontalPaddingEstimate = 130 — приблизительная ширина горизонтальных отступов;
MinContentWidth = 180 — минимальная допустимая ширина блока;
MinValidWidth = 100 — порог, ниже которого ширина считается «ещё не заданной».

Это устранило жёсткие WidthRequest под конкретное устройство (ранее использовался OnIdiom Phone=220).


Формулы больше не «выпадают» из текста: они встроены в поток, как в React-приложении.

Текст вопроса и длинных опций можно прокручивать внутри блока, если он не помещается.

Блоки адаптируются под ширину экрана устройства без ручного подбора под каждый телефон.

Короткие опции занимают ровно столько места, сколько нужно; длинные — ограничиваются по высоте и прокручиваются.

Сохранена совместимость: MathFormulaView и MathTextConverter остались в проекте и используются там, где это уместно (например, для отдельных формул в нестандартных местах).


# 2026.10.02

В компонентах вопросов (QuestionSingleChoice, QuestionMultipleChoice, QuestionMatching, QuestionCorrectSequence) текст и формулы рендерились через раздельные контролы:

обычный текст — Label;

формулы — MathFormulaView (WebView с MathJax в display-режиме \[ ... \]).

Связка была такой:

<FlexLayout Wrap="Wrap" AlignItems="Center">
    <BindableLayout ItemsSource="{Binding Text, Converter={StaticResource MathTextConverter}}">
        <DataTemplate>
            <Grid>
                <mathControls:MathFormulaView IsVisible="{Binding IsFormula}" ... />
                <Label IsVisible="{Binding IsFormula, Converter=...}" ... />
            </Grid>
        </DataTemplate>
    </BindableLayout>
</FlexLayout>

MathTextConverter разбирал текст по backtick'ам и возвращал список частей (MathPart) — формулы отдельно, текст отдельно.

## Новый подход
Создан единый компонент MathRichText (Controls/MathRichText.cs), который рендерит весь текст (обычный + формулы) как один HTML-документ с inline-MathJax.

Один WebView на текст. Неважно, сколько формул в тексте — один WebView, один HTML-документ, один MathJax. Это в разы уменьшает количество WebView на странице.
Inline-формулы вместо display. MathJax настроен на inline-режим (\( ... \)), формулы встраиваются в поток, как в React.
Дифференциация по содержимому. Если в тексте есть backtick'и — грузится MathJax. Если нет — рендерится простой HTML без MathJax, мгновенно.
Адаптивная высота. RecalculateHeight вычисляет высоту по ширине, средней ширине символа, количеству формул и запасу на переносы. Высота ограничивается MaximumHeightRequest сверху.
Адаптивная ширина. Ширина либо вычисляется из ширины экрана через ScreenConfig (для одноколоночных опций), либо берётся от родительского Grid через AutoWidth="False" (для опций с соседями — Picker, номер).

Как это работает внутри MathRichText
Метод Render(string raw) — диспетчер:

if (raw.Contains('`'))
    RenderWithMathJax(raw);   // есть формулы — грузим MathJax
else
    RenderPlainText(raw);     // нет формул — быстрый статический HTML

RecalculateHeight(raw);       // пересчёт высоты — общий для обоих путей
RenderWithMathJax — собирает HTML с inline-формулами (\( ... \)), подключает MathJax с CDN, ждёт typesetPromise.

RenderPlainText — собирает HTML без скриптов MathJax, только CSS для цвета, размера шрифта и переносов. Рендер мгновенный.

XAML компонентов после перехода
Вместо FlexLayout + BindableLayout + MathFormulaView + Label теперь один ScrollView с MathRichText:
<ScrollView 
    Orientation="Vertical"
    IsVisible="{Binding IsImage, Converter={StaticResource InverseBoolConverter}}"
    MaximumHeightRequest="180"
    VerticalOptions="Start"
    HorizontalOptions="Fill">

    <mathControls:MathRichText 
        Text="{Binding Text}"
        TextSize="15"
        BaseHeight="40"
        AutoWidth="False"           <!-- для Matching/CorrectSequence -->
        HorizontalOptions="Fill"
        VerticalOptions="Center"/>
</ScrollView>


# 2026.10.10

1. Состояние IsEmpty в TestSessionViewModel
Добавлено свойство IsEmpty, которое становится true, если после загрузки список вопросов пуст или произошла ошибка сети. 
Также добавлено ShowMainContent => !ShowResults && !IsEmpty, чтобы скрывать основной контент страницы при пустом тесте.

2.Защита в сеттере ShowResults
Диалог результатов не показывается, если вопросов нет.