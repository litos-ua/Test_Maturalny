# Клиентская часть платформы для подготовки к украинским выпускным экзаменам (ЗНО/НМТ). SPA на React 19 + TypeScript + Vite, UI на MUI v7, взаимодействует с ASP.NET Core Web API.

# Общая архитектура
Приложение построено как классический SPA-клиент к REST API. Вся бизнес-логика, связанная с хранением вопросов, пользователей, сессий и оценкой реальных тестов, находится на сервере. Клиент отвечает за:

отображение интерфейса и навигацию;
ввод ответов и их первичную валидацию;
локальную оценку учебных тестов (см. ниже);
отображение результатов, полученных от сервера в реальном режиме;
управление аутентификацией (JWT access + refresh токены).
Ключевая особенность — два независимых режима тестирования с разным распределением ответственности между UI и сервером, а также механизм автоматического переключения на резервный API при сетевых сбоях.

# Маршрутизация
Маршруты описаны в src/router/index.tsx через createBrowserRouter. Два дерева:
С Layout (хедер + футер): главная, о проекте, контакты, профиль, тесты, материалы.
Без Layout: auth-страницы, React Admin по /admin/*.
Защищённые маршруты оборачиваются в ProtectedRoute. Все — в ErrorBoundary.

## Основные пути:

Путь-Назначение
/	Главная
/subject-intro	Карусель предметов
/test-selection	Выбор дисциплины для теста
/test/:slug/:id	Страница дисциплины (выбор темы или типа теста)
/test/session/:id/:name	Сессия теста (учебный или реальный режим)
/test/topic-session/:topicId/:topicName/:disciplineId	Тест по конкретной теме
/usefulmaterials/:slug/:disciplineId	Корисні матеріали
/profile, /profile-settings, /profile-results	Профиль
/messages	Сообщения
/admin/*	React Admin

# Слой API и работа с бэкендом
## Базовые клиенты
apiClient (src/api/apiClient.tsx) — основной Axios-инстанс с интерсепторами.

authClient, disciplineClient, questionClient, topicClient, testSessionClient, userClient, userProfileClient — специализированные обёртки над эндпоинтами.

## Обёртки методов
get / post / put / del (src/api/index.tsx) нормализуют ошибки через handleAuthError: если ответ пришёл от сервера — пробрасывается тело ответа, иначе — generic-ошибка.

## Интерсепторы
## Request:

перед каждым запросом подставляет актуальный baseURL из configObj.axiosUrl (позволяет менять сервер на лету);
добавляет Authorization: Bearer {accessToken}, если токен есть.

## Response:

401 → попытка refresh через authService.refresh(). Если параллельно уже идёт refresh — запросы ставятся в очередь (failedQueue), после получения нового токена повторяются. Если refresh не удался — токены очищаются, редирект на /login.

Сетевая ошибка (ECONNABORTED, ERR_NETWORK, Network Error, 504, Failed to fetch) → мгновенное переключение на fallback API через switchToFallback(), запрос повторяется с новым baseURL.

## Fallback-механизм
Приложение поддерживает два бэкенда: основной (.NET) и резервный (PHP). configObj (src/constants/config.tsx) хранит оба URL и флаг isUsingFallback. При сетевом сбое switchToFallback() переключает axiosUrl и диспатчит событие api-switch, на которое подписан футер (индикатор активного сервера: LOCAL / .NET / PHP).

# Хуки и сервисы
useDisciplines — загрузка дисциплин с кэшированием между вызовами.

useExplanation — загрузка и кэширование пояснений к вопросам (/questions/{id}/explanation или AI-эндпоинт).

authService, userService, userOptionService, userProfileService, testSessionService, messageService — прикладные сервисы.

tokenService — работа с токенами в localStorage + проверка срока действия (exp из JWT).

# Аутентификация
Логин (/auth/login) → { token, refreshToken, user }. Токены сохраняются в localStorage, пользователь кладётся в AuthContext.

Refresh (/auth/refresh) — обновление пары токенов по refresh-токену. Сервер сам решает, нужно ли выдавать новый refresh (в зависимости от порога RefreshTokenRenewThresholdHours).

Logout (/auth/logout) — отзыв refresh-токена на сервере + очистка localStorage.

Регистрация (/auth/register), Forgot/Reset password — без токена.

AuthContext при старте приложения: если есть токен → refresh → getCurrentUser() → загрузка userOption.

Роли: Guest, Student, Teacher, Admin. Админ-роут защищён ProtectedRoute requiredRole="Admin".

# Механизм тестирования
Это центральная часть приложения. Существует три сценария прохождения теста, различающихся источником вопросов и тем, кто оценивает результат.

Выбор режима
На странице дисциплины (/test/:slug/:id) пользователь видит две карточки:

Учбовий тест → ?type=learn
Реальний тест → ?type=real
Также доступен список тем дисциплины — клик по теме открывает тест по теме.
Далее всё определяется query-параметром type в TestSessionPage. Развилка реализована в хуках useTestSessionCombined и useTestAnswersCombined.

## Учебный режим (learn)

Назначение: тренировка, навигация по вопросам с подсказками и пояснениями, без сохранения на сервере.
Источник вопросов: сервер (QuestionsController):
по дисциплине — GET /api/questions/random/by-discipline/{id}/{count} (30 случайных);
по теме — GET /api/questions/by-topic/{topicId} (все вопросы темы).
Опции каждого вопроса перемешиваются на клиенте (shuffleArray) перед показом.
Сессия: не создаётся (sessionId: null).
Хранение ответов: localStorage под ключом test_answers. При перезагрузке страницы ответы восстанавливаются.
Таймер:
по дисциплине — 3600 секунд (1 час);
по теме — 120 сек × количество вопросов.
Оценка: полностью на клиенте, в calculateTestResults (src/utils/testEvaluator.tsx). Результат — объект TestResult { totalScore, maxTotalScore, results[] }.
Отправка на сервер: не производится. finishAndSendResults просто вызывает локальный расчёт.
Пояснения: доступны по каждому вопросу через useExplanation → GET /api/questions/{id}/explanation (поле Explanation в AnswerOption). Отображаются в TestResultsDialog в тултипе с поддержкой LaTeX.
Результат: показывается в модальном окне, кнопки «До тесту» и «На головну». В профиле не сохраняется.

## Реальный режим (real)

Назначение: имитация экзамена НМТ с фиксированным набором вопросов, серверной оценкой и сохранением в истории.
Старт сессии: POST /api/testsession/exam/start с StartExamRequestDto:

json
{
  "userId": 42,
  "disciplineId": 1,
  "description": "Описание реальной сессии",
  "timeLimitSeconds": 3600
}
Сервер:
проверяет, что userId совпадает с аутентифицированным;
берёт TimeLimitSeconds и NumberOfTestQuestions из serverconfig.json;
формирует набор вопросов по типам, специфичным для дисциплины (см. ниже);
строит ShuffleMask — карту перемешивания опций, сохраняет в TestSession.JsonMask;
создаёт TestSession в БД;
возвращает { sessionId, questions }.
Опции приходят уже перемешанными с сервера — клиент их не трогает, чтобы JsonMask оставалась валидной.
Защита от двойного старта: флаг testSessionCreating в sessionStorage. Если пользователь обновит страницу во время старта — повторный запрос не уйдёт.
Хранение ответов: только в состоянии React. При перезагрузке — потеря.
Таймер: timeLeft инициализируется значением из конфига (3600 сек), тикает вниз. На сервере при завершении проверяется реальная длительность сессии с допуском +300 сек.
Завершение: POST /api/testsession/end/{sessionId} с телом:

json
{
  "reason": 0,
  "answers": [
    {
      "questionId": 101,
      "selectedOptionIds": [5],
      "submittedAt": "2025-...",
      "explanation": null
    }
  ]
}
Клиент формирует selectedOptionIds по-разному в зависимости от типа вопроса:
Matching — массив фиксированной длины (options.length), невалидные значения заменяются на 0;
OpenAnswer — selectedOptionIds: [], а сами текстовые ответы передаются в groupeLabel (массив строк);
остальные — фильтруются только целые не-NaN числа.
Оценка: на сервере (TestEvaluationService.EvaluateShuffleAsync + QuestionEvaluationHelper). Клиент получает TestEvaluationResultDto и маппит его в UI-модель TestResult.
Результат: сохраняется в БД (UserAnswer), доступен в профиле в разделе «Сесії користувача».

## Тест по теме
Отдельный сценарий, доступный только в учебном режиме. Пользователь кликает по теме дисциплины — переход на /test/topic-session/:topicId/:topicName/:disciplineId.

Загружаются все вопросы темы (getQuestionsByTopic).
Опции перемешиваются на клиенте.
Таймер: 120 сек × количество вопросов.
Оценка локальная, результат не сохраняется.
В useTestSessionCombined topicId прокидывается только в learn-ветку.
Типы вопросов
Поддерживается 6 типов (enum QuestionType):

Код	Тип	Особенности UI
0	SingleChoice	Radio-группа
1	MultipleChoice	Checkbox-группа
2	Matching	Select'ы с цветовой индикацией пар, перемешанный правый столбец хранится в sessionStorage
3	DoubleChoice	Два числовых поля
4	CorrectSequence	Select'ы для указания позиции каждого элемента
5	OpenAnswer	Текстовые поля с валидацией (только цифры и точка), количество полей = число правильных опций
Все компоненты единообразно принимают savedAnswer и onAnswer, поддерживают LaTeX (parseTextWithMath, MathFormula) и зум картинок (ZoomableImage).

Matching — самый сложный:
правый столбец перемешивается один раз и кэшируется в sessionStorage по ключу question-{id}-rightItems;
каждой паре присваивается свой цвет (MATCHING_COLORS), который подсвечивает и выбранный пункт слева, и соответствующий пункт справа;
поддерживаются изображения как в левом, так и в правом столбце.
CorrectSequence: пользователь для каждого элемента выбирает его позицию (1..N). Оценка зависит от того, угаданы ли первая и последняя позиции.
OpenAnswer: количество полей ввода равно количеству правильных опций. Разрешены только цифры и одна точка. Значение хранится как строка, а не число, чтобы не терять промежуточный ввод.

## Специфика по дисциплинам
Набор вопросов в реальном режиме формируется на сервере по имени дисциплины (TestSessionService.GetQuestionsForRealTestAsync):

Дисциплина	Состав
Історія України	20 SingleChoice + 4 Matching + 3 CorrectSequence + 3 MultipleChoice = 30
Математика	15 SingleChoice + 3 Matching + 4 OpenAnswer = 22
Фізика	14 SingleChoice + 2 Matching + 6 OpenAnswer = 22
Остальные	totalCount случайных вопросов по дисциплине (обычно 30)
Для учебного режима такой раскладки нет — просто N случайных вопросов по дисциплине или все вопросы темы.

На клиенте есть собственный DISCIPLINE_TEST_CONFIGS (src/constants/testConfig.tsx), который используется:
для подсказок UI (getRequiredAnswerCount — сколько ответов ожидается для вопроса);
для флагов allowPartialScore (разрешить ли частичные баллы);
для логики локальной оценки (isPartialScoreAllowed, getOpenAnswerRules).
Это дублирует часть серверной логики, поэтому теоретически возможно расхождение между учебной (клиентской) и реальной (серверной) оценкой одного и того же ответа.

## Оценка результатов
Учебный режим — calculateTestResults (клиент)
Полностью повторяет правила НМТ:
SingleChoice — 1 балл при точном совпадении.
DoubleChoice — 2 балла только если оба верны.
MultipleChoice — балл = число верно выбранных опций, но 0 при дубликатах. isCorrect — только при полном совпадении.
Matching — балл = число верных пар. isCorrect — когда верны все ожидаемые пары.
CorrectSequence — 3/2/1/0 баллов:
3 — полная последовательность;
2 — угаданы первая и последняя позиции;
1 — угадана только одна из них;
0 — иначе.
OpenAnswer — 2 балла за каждое верное поле, нормализация ,→. и сравнение чисел (с погрешностью 1e-4) или строк.
Результат показывается в TestResultsDialog с тултипами-пояснениями.

Реальный режим — сервер
Та же логика реализована в QuestionEvaluationHelper.EvaluateQuestion / EvaluateOpenAnswer. Дополнительно сервер:
восстанавливает порядок опций из JsonMask перед проверкой;
для Matching нормализует ответы из UI-порядка в базовый (NormalizeAnswerToBaseOrder);
сохраняет UserAnswer в БД.
Клиент получает TestEvaluationResultDto с массивом QuestionResultDto и отображает результаты так же, как в учебном режиме.

# Профиль и статистика
/profile — данные пользователя из AuthContext (userData), настройки (userOption), средний балл.
/profile-settings — редактирование профиля и опций.
/profile-results — список завершённых реальных сессий с пагинацией (userProfileService.getCompletedSessions → /statistics/user-session/{userId}). Каждую сессию можно:
раскрыть — детали по вопросам (/statistics/user-session/evaluation_details/{sessionId}): номер, текст, тема, балл;
удалить (DELETE /api/testsession/{id}, только свои сессии).
Учебные тесты в профиле не отображаются — они нигде не сохраняются.

# Корисні матеріали

Раздел /usefulmaterials/:slug/:disciplineId — подборка справочных таблиц по дисциплинам:
Історія України: архітектура, мистецтво, карикатури, гетьмани, персоналії, договори, жінки в історії.
Математика: формули.
Данные хранятся в src/constants/UsefulMaterials/ (разбиты по периодам). Каждый материал — это объект с id, title, component, getData, pdfConfig. Компоненты рендерятся лениво (Suspense), экспортируются в PDF через pdfExportUniversal.

# Админ-панель

React Admin (/admin/*), защищён ProtectedRoute requiredRole="Admin".
dataProvider (src/providers/dataProvider.tsx) ходит на /api/admin/{resource} с параметрами React Admin: _page, _perPage, _sort, _order, filter. Нормализует id/Id.

authProvider проверяет токен и извлекает роль из JWT.

Ресурсы: пользователи, дисциплины, темы, вопросы, варианты ответов.

## Структура проекта
text
src/
├── api/                 # Axios-клиенты и интерсепторы
│   ├── interceptors/    # auth, fallback
│   └── *Client.tsx
├── assets/              # Статика (аватары, svg)
├── components/          # Переиспользуемые компоненты
│   ├── Auth/            # ProtectedRoute
│   ├── DisciplineMenu/  # Меню дисциплин в хедере
│   ├── Header/, Footer/, Layout/
│   ├── UsefulMaterials/ # Таблицы по дисциплинам
│   ├── ZoomableImage/, RotatingImages/, ...
├── constants/           # Конфиги, тексты, данные
│   ├── UsefulMaterials/ # Данные для раздела материалов
│   ├── config.tsx       # configObj (URL'ы, fallback)
│   └── testConfig.tsx   # DISCIPLINE_TEST_CONFIGS
├── context/             # AuthContext
├── hooks/               # useTestSession*, useTestAnswers*, useExplanation, ...
├── pages/               # Страницы по маршрутам
│   ├── Admin/, Auth/, Profile/, Test/, TestSession/, UsefulMaterials/, ...
├── providers/           # React Admin: dataProvider, authProvider
├── router/              # Маршруты и ROUTE-константы
├── services/            # Прикладные сервисы (auth, user, testSession, ...)
├── types/               # TypeScript-типы по доменам
└── utils/               # Утилиты (оценка, парсинг LaTeX, PDF, ...)
## Ключевые особенности
Два режима тестирования с разной ответственностью: учебный — оценка на клиенте, реальный — на сервере.
Тест по теме — отдельный сценарий только в учебном режиме.
Специфика дисциплин — фиксированные наборы типов вопросов для Історії, Математики, Фізики в реальном режиме.
Автоматический fallback API при сетевых сбоях.
JWT с refresh и очередью запросов при 401.
LaTeX-поддержка в текстах вопросов, ответов и пояснений.
PDF-экспорт справочных материалов.
SEO через react-helmet-async.





# 2025.07.12

# Test_Maturalny
A repository for a platform for independent testing of knowledge of students who have completed high school. The platform consists of two parts - a UI React application (branch 'rect') and an API ASP.NET Core application (branch 'dotnet').

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

Определение результатов национального мультипредметного теста НМТ осуществляется в два этапа. На первом этапе определяется тестовый балл участника НМТ по каждому из трех предметных блоков: украинский язык (максимум 45 баллов), математика (максимум 32 балла) и один предмет на выбор: история Украины (максимум 54 балла), биология (максимум 46 баллов), физика (максимум 32 балла), химия (максимум 40 баллов), иностранный язык (английский, испанский, немецкий, французский на выбор участника) - (максимум 32 балла). На втором этапе на основе тестового балла определяется рейтинговая оценка результатов участника мультитеста по 200-балльной шкале, используемой при составлении рейтингового списка абитуриентов при поступлении в вузы Украины.


КАК РАССЧИТАТЬ ТЕСТОВЫЙ БАЛЛ ПО УКРАИНСКОМУ ЯЗЫКУ
Задания с выбором одного правильного ответа. Задание состоит из основы и четырех или пяти вариантов ответа, из которых только один правильный. Задание считается выполненным, если участник внешней независимой оценки выбрал и отметил ответ.
Блок мультитеста по украинскому языку содержит 25 заданий этой формы (№1–25), которые будут оцениваться в 0 или 1 балл: 1 балл, если указан правильный ответ; 0 баллов, если указан неправильный ответ или указано более одного ответа, или ответы на задание не даны.
Задания на установление соответствия. Задание состоит из основы и двух столбцов информации, обозначенных цифрами (слева) и буквами (справа). Выполнение задания предполагает установление соответствия (образование "логических пар") между информацией, обозначенной цифрами и буквами. Задание считается выполненным, если участник внешней независимой оценки сделал отметки на пересечениях строк (цифры от 1 до 4) и столбцов (буквы от А до Д) в таблице ответов.
Блок по украинскому языку содержит 5 заданий этой формы (№25–30), которые будут оцениваться в 0, 1, 2, 3 или 4 балла: 1 балл - за каждое правильное установление соответствия ("логическую пару"); 0 баллов за любую "логическую пару", если сделано более одной отметки в строке и/или столбце; 0 баллов за задание, если не указано ни одного правильного соответствия ("логической пары"), или ответы на задание не даны.
Максимальное количество баллов, которое сможет набрать участник тестирования, правильно выполнив все задания блока по украинскому языку, - 45.

КАК РАССЧИТАТЬ ТЕСТОВЫЙ БАЛЛ ПО МАТЕМАТИКЕ
Задания с выбором одного правильного ответа. Задание состоит из основы и пяти вариантов ответа, из которых только один правильный. Задание считается выполненным, если участник внешней независимой оценки выбрал и отметил ответ.
Блок мультитеста по математике содержит 15 заданий этой формы (№1–15), которые будут оцениваться в 0 или 1 балл: 1 балл, если указан правильный ответ; 0 баллов, если указан неправильный ответ или указано более одного ответа, или ответы на задание не даны.
Задания на установление соответствия. Задание состоит из основы и двух столбцов информации, обозначенных цифрами (слева) и буквами (справа). Выполнение задания предполагает установление соответствия (образование "логических пар") между информацией, обозначенной цифрами и буквами. Задание считается выполненным, если участник внешней независимой оценки сделал отметки на пересечениях строк (цифры от 1 до 3) и столбцов (буквы от А до Д) в таблице ответов.
Блок заданий по математике содержит 3 задания этой формы (№16–18), которые будут оценены в 0, 1, 2 или 3 балла: 1 балл – за каждое правильно установленное соответствие («логическую пару»); 0 баллов за любую «логическую пару», если сделано более одной отметки в строке и/или столбце; 0 баллов за задание, если не указано ни одного правильного соответствия («логической пары»), или ответы на задание не даны.
Также в этом блоке есть задания открытой формы с коротким ответом. Неструктурированное задание состоит из основы и предполагает решение задачи. Оно считается выполненным, если участник мультитеста, проведя соответствующие числовые расчеты и соблюдая требования и правила, записал окончательный ответ.
Тест содержит 4 задания данной формы (№19–22), которые оцениваются в 0 или 2 балла: 2 балла, если указан правильный ответ; 0 баллов, если указан неправильный ответ или ответы на задание не даны. Максимальное количество баллов, которое участник тестирования может получить, правильно выполнив все задания блока по математике, - 32.

КАК РАССЧИТАТЬ ТЕСТОВЫЙ БАЛЛ ПО ИСТОРИИ УКРАИНЫ
Задания с выбором одного правильного ответа. Задание состоит из основы и четырех вариантов ответа, из которых только один правильный. Задание считается выполненным, если участник внешней независимой оценки выбрал и отметил ответ.
Блок мультитеста по истории Украины содержит 20 заданий этой формы (№1–20), которые будут оцениваться в 0 или 1 балл: 1 балл, если указан правильный ответ; 0 баллов, если указан неправильный ответ или указано более одного ответа, или ответы на задание не даны.
Задания на установление соответствия. Задание состоит из основы и двух столбцов информации, обозначенных цифрами (слева) и буквами (справа). Выполнение задания предполагает установление соответствия (образование "логических пар") между информацией, обозначенной цифрами и буквами. Задание считается выполненным, если участник внешней независимой оценки сделал отметки на пересечениях строк (цифры от 1 до 4) и столбцов (буквы от А до Д) в таблице ответов.
Блок по истории Украины содержит 4 задания этой формы (№21–24), которые будут оцениваться в 0, 1, 2, 3 или 4 бала: 1 балл – за каждое правильно установленное соответствие ("логическую пару"); 0 баллов за любую "логическую пару", если сделано более одной отметки в строке и/или столбце; 0 баллов за задание, если не указано ни одного правильного соответствия ("логической пары"), или ответы на задание не даны.
Задание на установление правильной последовательности. Задание состоит из основы и перечня событий (явлений, фактов, процессов и т. д.), обозначенных буквами, которые нужно расположить в правильной последовательности, где первое событие должно соответствовать цифре 1, второе – цифре 2, третье – цифре 3, четвертое – цифре 4. Задание считается выполненным, если участник НМТ сделал отметки на пересечениях строк (цифры от 1 до 4) и столбцов (буквы от А до Г) в таблице ответов.
Тест содержит 3 задания данной формы (№25–27), каждое из которых оценивается в 0, 1, 2 или 3 балла: 3 балла – если верно указана последовательность всех событий; 2 балла – если указаны первое и последнее события; 1 балл – если указано либо первое, либо последнее событие; 0 баллов – за любое верно указанное событие, если сделано более одной отметки в строке и/или столбце; 0 баллов за задание, если неверно указаны первое и последнее события или ответы на задание не даны.
Задания с выбором трех правильных ответов из семи предложенных вариантов ответов. Задание состоит из основы и семи вариантов ответа, обозначенных цифрами, среди которых только три правильных. Задание считается выполненным, если участник внешней независимой оценки выбрал и записал три ответа (цифры) в таблице ответов.
Экзаменационный тест включает в себя 3 задания данного типа (№28–30). Каждое задание оценивается в 0, 1, 2 или 3 балла: 1 балл – за каждый правильно указанный вариант ответа (цифру) из трех возможных; 0 баллов – если не указан ни один правильный вариант ответа (цифры), или один вариант ответа (цифра) указан трижды, или ответы на задание не предоставлены. Порядок написания цифр значения не имеет.
Максимальное количество баллов, которое участник тестирования сможет набрать, правильно выполнив все задания блока по истории Украины, – 54.

КАК ВЫЧИСЛИТЬ РЕЙТИНГОВЫЙ БАЛЛ
Для получения результатов участника национального мультипредметного теста по 200-балльной шкале используются Таблицы перевода тестовых баллов в рейтинговую шкалу от 100 до 200 баллов. Таблицы перевода тестовых баллов в рейтинговую шкалу от 100 до 200 баллов опубликованы в Приложении 5 к Порядку приема на обучение для получения высшего образования в 2023 году отдельно для каждого предмета.
Указанная шкала является рейтинговой, так как указывает на место результата человека среди результатов других участников национального мультипредметного теста. Для получения результата по шкале 100–200 участнику НМТ достаточно набрать хотя бы один тестовый балл по каждому предмету.
Участники национального мультипредметного теста, набравшие одинаковый тестовый балл, получают одинаковую рейтинговую оценку по шкале 100–200 баллов.
В случае равных баллов важной составляющей конкурса будет мотивационное письмо, которое позволит приемной комиссии образовательного учреждения выбрать среди нескольких абитуриентов с одинаковым конкурсным баллом наиболее мотивированного абитуриента.



Рефакторинг TestSessionPage

✅ файл TestSessionPage.tsx станл короче и более управляемым
✅ логику загрузки легко тестировать в isolation
✅ диалог результатов переиспользуем в других страницах
✅ легко создать альтернативный метод оценки на сервере (просто создаешь другой hook/useServerEvaluation.ts и меняешь вызов calculateTestResults на await fetchResultFromServer())

Недостатки.
При нажатии кнопки вивода тем при переходе с предмета на предмет иногда необходимо двойное нажатие
(при первом нажатии не виводится discipline.id и идет даже другой запрос н API).

Не подгружаются аватарки в профиль.

# 2025.07.24
Результаты тестов грузятся с сервера, но пока без смешивания.

# 2025.08.08  
// Закомментировал в AuthContext выделенные строки кода с вызовом утилиты из сервиса. При первом старте вызывают запрос с ошибками 404

 GET https://localhost:7283/api/useroption/by-user/2 404 (Not Found) 

const fetchUserOption = async (userId?: number) => {
    try {
      const id = userId ?? authUser?.id;
      if (!id) throw new Error("User ID not provided for options fetch");

      const option = await userOptionService.getUserOptionByUserId(id);
      setUserOption(option);
    } catch (error) {
      console.error("Failed to fetch user option:", error);
    }
  };

Разобраться зачем вообще в AuthContext нужны утилиты fetchUserOption и updateUserOption ?




# 2026.08.12   
  Повторение типов  в src/user/types.tsx корректировка
// export const UserRoles = {
const UserRoles = {


Повторение типов  в src/models/Usertypes.tsx
заккоментировал все.
=======
<<<<<<< HEAD

=======
>>>>>>> main


Опции пользователя не подгружаются с первого раза.


# 2026.09.02

Виправлення оцінювання тестів у навчальному режимі по темах
Проблема
При проходженні тестів у режимі "Тестування за темами" (маршрут /test/topic-session/:topicId/:topicName) питання типу Matching (на встановлення відповідності) оцінювалися некоректно — навіть за повністю правильних відповідей користувач отримував 0 балів.

При цьому в стандартному навчальному тесті (маршрут /test/session/:id/:name) оцінювання працювало коректно.

Причина
У тесті по темах не передавався ідентифікатор дисципліни (disciplineId) до модуля оцінювання. Через це:

Не застосовувались правила часткових балів для математики

Для Matching використовувалась логіка, що вимагала всі 5 пар правильними (хоча в питанні лише 4 правильні + 1 зайвий варіант)

Як наслідок — навіть 4 правильні пари давали 0 балів

Що було зроблено
Маршрутизація
Додано параметр :disciplineId до маршруту тесту по темах:

ts
// router.ts
TOPIC_SESSION: "/test/topic-session/:topicId/:topicName/:disciplineId"
Навігація
Оновлено перехід до тесту по темі — тепер disciplineId передається як частина URL:

tsx
navigate(`/test/topic-session/${topic.id}/${encodedName}/${discipline.id}`)
Отримання параметрів
У компоненті TestSessionPage розширено useParams() для отримання disciplineId:

tsx
const { id, name, topicId, topicName, disciplineId } = useParams();
Передача в оцінювання
Виправлено передачу disciplineId у хук useTestAnswersCombined:

tsx
const finalDisciplineId = disciplineId 
  ? parseInt(disciplineId) 
  : (id ? parseInt(id) : undefined);

useTestAnswersCombined(..., finalDisciplineId?.toString())
Результат
До виправлення	Після виправлення
disciplineId = undefined	disciplineId = 2 (для математики)
allowPartialScore = false	allowPartialScore = true
4 правильні пари → 0 балів ❌	4 правильні пари → 3 бали ✅
Matching не працював у тестах по темах	Matching працює однаково в усіх режимах

# 2026.09.05
Коригування maxScore в питаннях типу Matching

# 2026.09.07

Додано підтримку питань відкритої форми (OpenAnswer)
Розширено функціонал платформи для роботи з питаннями, де користувач вводить текстову відповідь (число, формула, короткий текст), а не обирає з варіантів.

- Створено новий компонент QuestionOpenAnswer з підтримкою:
- Текстового поля для введення відповіді
- Математичних формул (LaTeX) у тексті питання
- Зображень у питанні
- Оновлено логіку збереження відповідей (текст замість числового ID)
- Додано обробку OpenAnswer у модулі оцінювання результатів
- Адаптовано перевірку невідповідених питань для текстового типу
- Оцінювання відкритих питань:
- Для математики: 0 або 2 бали (за правилами НМТ)
- Для інших дисциплін: 0 або 1 бал
- Текст порівнюється після нормалізації (видалення зайвих пробілів, приведення до нижнього регістру)

# 2026.09.09

Модернізація компонента відкритих питань (OpenAnswer)
Розширено функціонал питань відкритої форми для підтримки кількох відповідей в одному завданні (наприклад, у фізиці, хімії, старих варіантах ЗНО).

- Адаптивна кількість полів введення — визначається кількістю правильних опцій у питанні
- Збереження відповідей у вигляді масиву рядків (string[]) для коректної роботи з дробовими числами
- Валідація введення: дозволено лише цифри, крапку (.) та знак мінус (-)
- Блокування некоректних символів без втрати вже введених даних
- Перевірка на одну крапку (не більше однієї)
- Візуальний зворотний зв'язок — повідомлення про помилку українською мовою
- Підтримка формул (LaTeX) та зображень у тексті питання

Оцінювання:
- 2 бали за кожну правильну відповідь
- Часткові бали (якщо частина відповідей правильна)
- Загальний бал не перевищує maxScore питання

Корегування відображення результатів (TestResultsDialog)

- Підтримка математичних формул (LaTeX) у спливаючих підказках
- Розділення DEV/PROD режимів: технічна інформація (ID питань, ID опцій) показується лише в DEV
- Коректне відображення правильної відповіді для OpenAnswer (текст замість ID)
- Збереження пробілів та форматування у тексті пояснень

Рефакторинг парсингу математичних формул
Оптимізовано роботу з математичними формулами у тексті питань, опцій та пояснень.

- Функцію parseTextWithMath винесено в окремий файл utils/parseTextWithMath.ts для використання в усіх компонентах
- Додано перевірку на наявність зворотних лапок (`) перед парсингом
- Звичайний текст обгорнуто в <span> для збереження пробілів між частинами тексту та формулами
- Оновлено компоненти QuestionSingleChoice, QuestionMultipleChoice, QuestionMatching, QuestionOpenAnswer, QuestionCorrectSequence,   
  QuestionDoubleChoice для використання єдиної утиліти
- Додано перевірку валідності LaTeX у MathFormula — невалідний код відображається як звичайний текст замість помилки.

# 2026.09.18

Повний список змін для підтримки OpenAnswer на сервері
1️⃣ ENUM QuestionType
Файл: TestMaturalnyApp.Domain/Entities/Enums/QuestionType.cs

csharp
public enum QuestionType
{
    SingleChoice = 0,
    MultipleChoice = 1,
    Matching = 2,
    DoubleChoice = 3,
    CorrectSequence = 4,
    OpenAnswer = 5,  // 🔑 ДОДАНО
}
2️⃣ DTO CreateUserAnswerDto
Файл: TestMaturalnyApp.Domain/Entities/DTOs/Create/CreateUserAnswerDto.cs

csharp
public class CreateUserAnswerDto
{
    public int QuestionId { get; set; }
    public string? Explanation { get; set; }
    public double Score { get; set; } = 0;
    public int AnswerInt { get; set; }
    public List<int> SelectedOptionIds { get; set; } = new();
    public List<string>? GroupeLabel { get; set; }  // 🔑 ДОДАНО для OpenAnswer
    public int? TestSessionId { get; set; }
}
Призначення: Приймає текстові відповіді з UI (groupeLabel).

3️⃣ DTO EvaluateTestRequestDto
Файл: TestMaturalnyApp.Domain/Entities/DTOs/EvaluateTestRequestDto.cs

csharp
public class EvaluateTestRequestDto
{
    public int TestSessionId { get; set; }
    public Dictionary<int, List<int>> Answers { get; set; } = new();
    public Dictionary<int, List<string>>? TextAnswers { get; set; }  // 🔑 ДОДАНО
}
Призначення: Передає текстові відповіді в сервіс оцінювання.

4️⃣ DTO QuestionResultDto
Файл: TestMaturalnyApp.Domain/Entities/DTOs/QuestionResultDto.cs

csharp
public class QuestionResultDto
{
    public int QuestionId { get; set; }
    public List<int> SelectedOptionIds { get; set; } = new();
    public List<int> CorrectOptionIds { get; set; } = new();
    public bool IsCorrect { get; set; }
    public bool IsPartiallyCorrect { get; set; }
    public double Score { get; set; }
    public int QuestionOrder { get; set; }
    public string QuestionText { get; set; } = "";
    public string QuestionType { get; set; } = "";
    public List<string>? SelectedTextAnswers { get; set; }  // 🔑 ДОДАНО
    public List<string>? CorrectTextAnswers { get; set; }   // 🔑 ДОДАНО
}
Призначення: Повертає текстові відповіді для відображення в UI.

 
5️⃣ Мапер CreateUserAnswerDtoMapper
Файл: TestMaturalnyApp.Services/Mapping/Dto/Create/CreateUserAnswerDtoMapper.cs

csharp
using System.Text.Json;
using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;

namespace TestMaturalnyApp.Services.Mapping.Dto.Create
{
    public static class CreateUserAnswerDtoMapper
    {
        public static UserAnswer MapToDomain(CreateUserAnswerDto dto)
        {
            var userAnswer = new UserAnswer
            {
                ..............
            };

            // 🔑 Для OpenAnswer: зберігаємо текстові відповіді як JSON-рядок
            if (dto.GroupeLabel != null && dto.GroupeLabel.Count > 0)
            {
                userAnswer.GroupeLabel = JsonSerializer.Serialize(dto.GroupeLabel);
            }

            return userAnswer;
        }
    }
}
6️⃣ Хелпер QuestionEvaluationHelper
Файл: TestMaturalnyApp.Services/Services/Utils/QuestionEvaluationHelper.cs

csharp
using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Services.Services.Utils
{
    public static class QuestionEvaluationHelper
    {
        // ============================================================
        // 🔑 ІСНУЮЧИЙ МЕТОД (БЕЗ ЗМІН)
        // ============================================================
        public static (bool IsCorrect, double Score) EvaluateQuestion(
            Question question,
            List<int> userAnswerIds,
            List<int> correctAnswerIds,
            List<string>? userTextAnswers = null)  // 🔑 зарезервовано
        {
            bool isCorrect = false;
            double score = 0;

            switch (question.Type)
            {
                case QuestionType.SingleChoice:
                    // ... без змін
                    break;
                ..........
                case QuestionType.CorrectSequence:
                    // ... без змін
                    break;
                
                // ❌ case OpenAnswer — ЗАКОМЕНТОВАНО
                // (винесено в окремий метод EvaluateOpenAnswer)
                
                default:
                    throw new ArgumentOutOfRangeException($"Unsupported question type: {question.Type}");
            }

            return (isCorrect, score);
        }

        // ============================================================
        // 🔑 НОВИЙ МЕТОД ДЛЯ OPENANSWER
        // ============================================================
        public static (bool IsCorrect, double Score) EvaluateOpenAnswer(
            Question question,
            List<string> userTextAnswers)
        {
            if (question.Type != QuestionType.OpenAnswer)
                return (false, 0);

            .................................

            var score = Math.Min(calculatedScore, maxScore);
            var isCorrect = correctCount == correctOptions.Count;

            return (isCorrect, score);
        }

        // ============================================================
        // 🔑 ДОПОМІЖНИЙ МЕТОД
        // ============================================================
        private static string NormalizeText(string text)
        {
            return text.Trim().Replace(',', '.').Replace(" ", "").ToLowerInvariant();
        }
    }
}
Логіка оцінювання:

2 бали за кожну правильну відповідь

Обмеження MaxScore питання

Нормалізація тексту (кома → крапка, пробіли, регістр)

Підтримка чисел і тексту

7️⃣ Сервіс TestEvaluationService
Файл: TestMaturalnyApp.Services/Services/TestEvaluationService.cs

EvaluateAsync — гілка для OpenAnswer
csharp
// 🔑 ГІЛКА ДЛЯ OPENANSWER
if (domainQuestion.Type == QuestionType.OpenAnswer)
{
    // 🔑 Отримуємо текстові відповіді
    var userTextAnswers = request.TextAnswers?
        .GetValueOrDefault(domainQuestion.Id) ?? new List<string>();

    var (isCorrectOA, scoreOA) = QuestionEvaluationHelper.EvaluateOpenAnswer(
        domainQuestion, userTextAnswers);

    maxTotalScore += domainQuestion.MaxScore;
    totalScore += scoreOA;

    var validTexts = userTextAnswers
        .Where(t => !string.IsNullOrWhiteSpace(t))
        .ToList();

    // 🔑 Зберігаємо в БД
    var uaDataOA = new Data.Entities.UserAnswer
    {
        UserId = session.UserId,
        QuestionId = domainQuestion.Id,
        SubmittedAt = DateTime.UtcNow,
        Score = scoreOA,
        TestSessionId = session.Id,
        SelectedOptionJson = "[]",
        GroupeLabel = JsonSerializer.Serialize(validTexts)
    };

    await _answerRepo.CreateAsync(uaDataOA);

    results.Add(new QuestionResultDto
    {
        QuestionId = domainQuestion.Id,
        SelectedTextAnswers = validTexts,
        CorrectTextAnswers = domainQuestion.Options
            .Where(o => o.IsCorrect)
            .Select(o => o.Text)
            .ToList(),
        Score = scoreOA,
        IsCorrect = isCorrectOA
    });

    continue;  // 🔑 Пропускаємо звичайну логіку
}
EvaluateShuffleAsync — аналогічна гілка
Той самий код, що й у EvaluateAsync (з uaDataOA).

8️⃣ Контролер TestSessionController
Файл: TestMaturalnyApp.API/Controllers/TestSessionController.cs

У методі EndSession — передача TextAnswers
csharp
var evaluationResult = await _testEvaluationService.EvaluateShuffleAsync(new EvaluateTestRequestDto
{
    TestSessionId = sessionId,
    Answers = request.Answers
        .GroupBy(a => a.QuestionId)
        .ToDictionary(
            g => g.Key,
            g => g.SelectMany(a => a.SelectedOptionIds).ToList()
        ),
    // 🔑 ДОДАНО: передача текстових відповідей
    TextAnswers = request.Answers
        .Where(a => a.GroupeLabel != null && a.GroupeLabel.Count > 0)
        .ToDictionary(a => a.QuestionId, a => a.GroupeLabel!)
});
CompleteTestSessionRequest
csharp
public class CompleteTestSessionRequest
{
    public SessionEndReason Reason { get; set; }
    public List<CreateUserAnswerDto> Answers { get; set; } = new();
}
Змін не потребує — GroupeLabel вже є в CreateUserAnswerDto.

📊 ЗВЕДЕНА ТАБЛИЦЯ ЗМІН
#	Файл	Тип	Зміна
1	QuestionType.cs	Enum	+OpenAnswer = 5
2	CreateUserAnswerDto.cs	DTO	+GroupeLabel: List<string>?
3	EvaluateTestRequestDto.cs	DTO	+TextAnswers: Dictionary<int, List<string>>?
4	QuestionResultDto.cs	DTO	+SelectedTextAnswers, +CorrectTextAnswers
5	CreateUserAnswerDtoMapper.cs	Mapper	Обробка GroupeLabel → JSON
6	QuestionEvaluationHelper.cs	Helper	+EvaluateOpenAnswer, +NormalizeText
7	TestEvaluationService.cs	Service	+Гілка OpenAnswer (2 методи)
8	TestSessionController.cs	Controller	Передача TextAnswers
9	Міграція	БД	ALTER COLUMN GroupeLabel
🔄 ПОВНИЙ ЛАНЦЮЖОК ДАНИХ
text
┌─────────────────────────────────────────────────────────────────────┐
│ UI (QuestionOpenAnswer)                                            │
│   ↓ groupeLabel: ["4.5"]                                          │
│                                                                     │
│ JSON на сервер                                                      │
│   ↓ { questionId, selectedOptionIds: [], groupeLabel: ["4.5"] }   │
│                                                                     │
│ CreateUserAnswerDto                                                │
│   ↓ GroupeLabel = ["4.5"]                                         │
│                                                                     │
│ CreateUserAnswerDtoMapper.MapToDomain()                            │
│   ↓ userAnswer.GroupeLabel = "[\"4.5\"]"                          │
│                                                                     │
│ Domain.UserAnswer                                                  │
│   ↓ GroupeLabel = "[\"4.5\"]"                                     │
│                                                                     │
│ TestSessionController.EndSession()                                 │
│   ↓ TextAnswers = { 14996: ["4.5"] }                              │
│                                                                     │
│ EvaluateTestRequestDto                                             │
│   ↓ TextAnswers = { 14996: ["4.5"] }                              │
│                                                                     │
│ TestEvaluationService.EvaluateShuffleAsync()                       │
│   ↓ userTextAnswers = ["4.5"]                                     │
│                                                                     │
│ QuestionEvaluationHelper.EvaluateOpenAnswer()                      │
│   ↓ correctCount = 1 → score = 2                                  │
│                                                                     │
│ QuestionResultDto                                                  │
│   ↓ SelectedTextAnswers = ["4.5"], Score = 2                      │
│                                                                     │
│ UI отримує результат                                               │
└─────────────────────────────────────────────────────────────────────┘


# 2026.09.21

Реалізовано можливість видалення завершених сесій тестування з особистого кабінету користувача.
Серверна частина (ASP.NET Core):
Додано метод DeleteAsync у ITestSessionRepository та TestSessionRepository (каскадне видалення сесії разом з відповідями)
Додано метод DeleteAsync у ITestSessionService та TestSessionService
Додано ендпоінт DELETE /api/testsession/{sessionId} у TestSessionController
Реалізовано перевірку прав: користувач може видаляти лише свої сесії
Клієнтська частина (React):
Додано метод deleteSession у testSessionClient та testSessionService
У таблицю сесій (ProfileResultsSession) додано колонку з кнопкою видалення 🗑️
Додано діалог підтвердження видалення (MUI Dialog)
Реалізовано оновлення списку сесій після видалення
Адаптовано відображення для мобільних пристроїв

┌─────────────────────────────────────────────────────────────────┐
│ Користувач клікає 🗑️                                            │
│         ↓                                                       │
│ setDeleteSessionId(8106)                                        │
│         ↓                                                       │
│ deleteSessionId = 8106                                          │
│         ↓                                                       │
│ React перерендерює                                              │
│         ↓                                                       │
│ <Dialog open={8106 !== null}> → open = true                    │
│         ↓                                                       │
│ Діалог відкривається                                            │
│         ↓                                                       │
│ Користувач клікає "Видалити"                                    │
│         ↓                                                       │
│ handleDeleteSession()                                           │
│         ↓                                                       │
│ testSessionService.deleteSession(8106)                          │
│         ↓                                                       │
│ API: DELETE /api/testsession/8106                               │
│         ↓                                                       │
│ Сервер видаляє сесію                                            │
│         ↓                                                       │
│ Оновлення списку                                                │
│         ↓                                                       │
│ setDeleteSessionId(null) → діалог закривається                  │
└─────────────────────────────────────────────────────────────────┘



# 2026.09.21
На данный момент
📚 УЧБОВИЙ ТЕСТ
1. UI → Хук useTestSession
Файл: hooks/useTestSession.ts

typescript
export function useTestSession(disciplineId?: string, topicId?: number) {
  useEffect(() => {
    const fetchQuestions = async () => {
      let data: Question[] = [];
      
      // 🔑 Варіант A: тест по темі
      if (topicId) {
        data = await getQuestionsByTopic(topicId);
      }
      // 🔑 Варіант B: тест по дисципліні
      else if (disciplineId) {
        data = await getRandomQuestionsByDiscipline(
          Number(disciplineId), 
          testSessionParameters.numberOfQuestions
        );
      }
      
      // Перемішування опцій
      const shuffled = data.map(q => ({
        ...q,
        options: shuffleArray(q.options),
      }));
      
      setShuffledQuestions(shuffled);
    };
    
    fetchQuestions();
  }, [disciplineId, topicId]);
}
2. API-клієнт questionClient
Файл: api/questionClient.ts

typescript
const baseURL = configObj.axiosUrl + "Questions";

const httpQuestionClient = axios.create({ baseURL });

// 🔑 Для тесту по дисципліні
export const getRandomQuestionsByDiscipline = async (
  disciplineId: number, 
  totalCount: number
) => {
  const response = await httpQuestionClient.get(
    `/random/by-discipline/${disciplineId}/${totalCount}`
  );
  return response.data;
};

// 🔑 Для тесту по темі
export const getQuestionsByTopic = async (topicId: number) => {
  const response = await httpQuestionClient.get(`/by-topic/${topicId}`);
  return response.data;
};
3. Сервер QuestionsController
Файл: TestMaturalnyApp.API/Controllers/QuestionsController.cs

Для тесту по дисципліні:
csharp
[HttpGet("random/by-discipline/{disciplineId}/{totalCount}")]
public async Task<IActionResult> GetRandomByDiscipline(int disciplineId, int totalCount)
{
    var questions = await _service.GetRandomByDisciplineAsync(disciplineId, totalCount);
    return Ok(questions);
}
Для тесту по темі:
csharp
[HttpGet("by-topic/{topicId}")]
public async Task<IActionResult> GetByTopic(int topicId)
{
    var questions = await _service.GetByTopicIdAsync(topicId);
    return Ok(questions);
}
4. Сервіс QuestionService
csharp
public async Task<IEnumerable<Question>> GetRandomByDisciplineAsync(
    int disciplineId, int totalCount)
{
    var discipline = await _disciplineRepository.GetByIdAsync(disciplineId);
    
    switch (discipline.Name)
    {
        case "Історія України":
            // 🔑 Спеціальна логіка для історії
            var singleChoice = await GetAndLogQuestionsAsync(disciplineId, QuestionType.SingleChoice, 20);
            var matching = await GetAndLogQuestionsAsync(disciplineId, QuestionType.Matching, 4);
            // ...
            return singleChoice.Concat(matching)...
            
        default:
            // 🔑 Стандартна логіка
            var dataEntities = await _questionRepository
                .GetRandomByDisciplineAsync(disciplineId, totalCount);
            return dataEntities.Select(QuestionMapper.MapToDomain).ToList();
    }
}
🎯 РЕАЛЬНИЙ ТЕСТ
1. UI → Хук useTestSessionReal
Файл: hooks/useTestSessionReal.ts

typescript
export function useTestSessionReal(
  userId?: number,
  disciplineId?: number,
  description: string = "",
  timeLimitSeconds: number = testSessionParameters.totalCount
) {
  useEffect(() => {
    const load = async () => {
      // 🔑 Один запит — старт сесії + отримання питань
      const dto: StartExamRequestDto = {
        userId,
        disciplineId,
        description,
        timeLimitSeconds,
      };

      const result: RealTestSessionResult = await testSessionService.startRealTest(dto);
      
      setSessionId(result.sessionId);
      setQuestions(result.questions);
    };
    
    load();
  }, [userId, disciplineId]);
}
2. Сервіс testSessionService
Файл: services/testSessionService.ts

typescript
async startRealTest(data: StartExamRequestDto): Promise<RealTestSessionResult> {
  return await testSessionClient.startRealTest(data);
}
3. API-клієнт testSessionClient
Файл: api/testSessionClient.ts

typescript
async startRealTest(dto: StartExamRequestDto): Promise<RealTestSessionResult> {
  return await post<RealTestSessionResult>("/testsession/exam/start", dto);
}
4. Сервер TestSessionController
Файл: TestMaturalnyApp.API/Controllers/TestSessionController.cs

csharp
[HttpPost("exam/start")]
[Authorize]
public async Task<IActionResult> StartExamSession([FromBody] StartExamRequestDto request)
{
    // 🔑 Перевірка userId
    var userId = _currentUserService.UserId;
    if (request.UserId != userId) return Unauthorized();
    
    // 🔑 Конфіг
    int configTimeLimit = _configuration.GetValue<int>("TestSessionSettings:TimeLimitSeconds", 3600);
    int totalCount = _configuration.GetValue<int>("QuestionSettings:NumberOfTestQuestions", 30);
    
    // 🔑 СТВОРЕННЯ СЕСІЇ + ПИТАНЬ + МАСКИ
    var result = await _testSessionService.CreateRandomRealTestAsync(
        request.DisciplineId,
        totalCount,
        userId.Value,
        configTimeLimit,
        request.Description
    );
    
    return Ok(result);
}
5. Сервіс TestSessionService.CreateRandomRealTestAsync
csharp
public async Task<CreatedTestSessionDto> CreateRandomRealTestAsync(
    int disciplineId, int totalCount, int userId, 
    int? timeLimitSeconds, string? description)
{
    // 🔑 1. Отримуємо питання
    var domainQuestions = await GetQuestionsForRealTestAsync(disciplineId, totalCount);
    
    // 🔑 2. Створюємо ShuffleMask
    var mask = new ShuffleMask
    {
        Questions = new List<int>(),
        Options = new Dictionary<int, List<int>>()
    };
    
    foreach (var question in domainQuestions)
    {
        mask.Questions.Add(question.Id);
        var shuffledOptions = question.Options.OrderBy(_ => rng.Next()).ToList();
        mask.Options[question.Id] = shuffledOptions.Select(o => o.Id).ToList();
        question.Options = shuffledOptions;
    }
    
    // 🔑 3. Створюємо сесію з маскою
    var domainSession = new Domain.Entities.TestSession
    {
        UserId = userId,
        JsonMask = JsonSerializer.Serialize(mask),
        StartedAt = DateTime.UtcNow,
        TimeLimitSeconds = timeLimitSeconds,
        Description = description
    };
    
    // 🔑 4. Зберігаємо в БД
    var dataSession = TestSessionMapper.MapToData(domainSession);
    await _sessionRepository.CreateAsync(dataSession);
    
    // 🔑 5. Повертаємо питання з маскою
    return new CreatedTestSessionDto
    {
        SessionId = dataSession.Id,
        Questions = domainQuestions.Select(QuestionDtoMapper.MapToDto).ToList()
    };
}
📊 ПОРІВНЯННЯ
Аспект	Учбовий тест	Реальний тест
Ендпоінт	GET /api/Questions/...	POST /api/TestSession/exam/start
Хук	useTestSession	useTestSessionReal
Сервіс	questionClient	testSessionService
Клієнт	httpQuestionClient	testSessionClient
Контролер	QuestionsController	TestSessionController
Сервіс (бекенд)	QuestionService	TestSessionService
Створення сесії	❌ Немає	✅ Так
ShuffleMask	❌ Немає	✅ Так
Збереження в БД	❌ Немає	✅ Так (сесія)
Кількість питань	З запиту	З конфігу (30)
Час	data.length * 120	З конфігу (3600)
🎯 ПОВНА СХЕМА
Учбовий тест:
text
UI (useTestSession)
  ↓ getRandomQuestionsByDiscipline(disciplineId, 30)
  ↓ GET /api/Questions/random/by-discipline/2/30

QuestionsController.GetRandomByDiscipline
  ↓ QuestionService.GetRandomByDisciplineAsync
  ↓ QuestionRepository.GetRandomByDisciplineAsync
  ↓ БД → повертає 30 питань

UI → shuffleArray(q.options) → setShuffledQuestions
Реальний тест:
text
UI (useTestSessionReal)
  ↓ testSessionService.startRealTest(dto)
  ↓ POST /api/TestSession/exam/start

TestSessionController.StartExamSession
  ↓ TestSessionService.CreateRandomRealTestAsync
  ↓ GetQuestionsForRealTestAsync (30 питань)
  ↓ Створення ShuffleMask
  ↓ TestSessionRepository.CreateAsync (збереження сесії)
  ↓ Повертає { sessionId, questions }

UI → setSessionId, setQuestions
🔑 КЛЮЧОВІ ВІДМІННОСТІ
Що	Учбовий	Реальний
Сесія в БД	❌ Ні	✅ Так
ShuffleMask	❌ Ні (тільки в UI)	✅ Так (на сервері)
Оцінювання	UI	Сервер
Збереження результатів	❌ Ні	✅ Так
🎯 ПІДСУМОК
Питання	Учбовий	Реальний
Де формуються питання?	useTestSession	useTestSessionReal
Який ендпоінт?	GET /api/Questions/...	POST /api/TestSession/exam/start
Чи створюється сесія?	❌ Ні	✅ Так
Де shuffle?	UI (shuffleArray)	Сервер (ShuffleMask)
Де оцінювання?	UI	Сервер
Учбовий тест — легкий, без сесії. Реальний тест — повний, з сесією, маскою та серверним оцінюванням. 

КОРЕГУЄМО ВИДАЧУ ПИТАННЬ З УРАХУВАННЯМ МАТЕМАТИКИ ТА ФІЗИКИ.

При УЧБОВОМУ ТЕСТІ:

UI (useTestSession)
  ↓ getRandomQuestionsByDiscipline(disciplineId, 30)
  ↓ GET /api/Questions/random/by-discipline/2/30

QuestionsController.GetRandomByDiscipline
  ↓ QuestionService.GetRandomByDisciplineAsync
  ↓ switch (discipline.Name)
  ↓ case "Математика":
       ├─ GetAndLogQuestionsAsync(SingleChoice, 15)
       ├─ GetAndLogQuestionsAsync(Matching, 3)
       └─ GetAndLogQuestionsAsync(OpenAnswer, 4)
  ↓ Повертає 22 питання

UI → shuffleArray(q.options) → setShuffledQuestions

Робим коригування в TestMaturalnyApp.Services/Services/QuestionService.cs

При РЕАЛЬНОМУ ТЕСТІ:

UI (useTestSessionReal)
  ↓ POST /api/TestSession/exam/start
  ↓ { disciplineId: 4 (Фізика), userId, ... }

TestSessionController.StartExamSession
  ↓ int totalCount = config.GetValue<int>("QuestionSettings:NumberOfTestQuestions", 30)
  ↓ TestSessionService.CreateRandomRealTestAsync(disciplineId, 30, ...)
  ↓ GetQuestionsForRealTestAsync(disciplineId, 30)
  ↓ switch (discipline.Name)
  ↓ case "Фізика":
       ├─ GetAndLogQuestionsAsync(SingleChoice, 14)
       ├─ GetAndLogQuestionsAsync(Matching, 2)
       └─ GetAndLogQuestionsAsync(OpenAnswer, 6)
  ↓ Повертає 22 питання
  ↓ Створює ShuffleMask
  ↓ Зберігає сесію в БД
  ↓ Повертає { sessionId, questions }

UI → setSessionId, setQuestions

Робим коригування в TestMaturalnyApp.Services/Services/TestSessionService.cs

# 2026.10.06

Додано обробку порожнього списку питань та уніфіковано маршрути

Додано стан isEmpty у хуки useTestSession та useTestSessionReal для відображення повідомлення "Немає питань" замість нескінченного "Завантаження..."
Додано кнопку повернення до вибору тестів при порожньому списку питань
Уніфіковано константи маршрутів у router.tsx — всі шляхи тепер мають слеш на початку (/test-selection замість test-selection)

Виводим версію в UI за допомогою хука useApkInfo.