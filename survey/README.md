Программируемый опросник, в котором порядок и список вопросов зависят от переданной конфигурации в JSON формате. Опросник поддерживает только вопросы с вариантами ответов, например:

{"What is your marital status?": ["Single", "Married"]}

{"Are you planning on getting married next year?": ["Yes", "No"]}

{"How long have you been married?": ["Less than a year", "More than a year"]}

{"Have you celebrated your one-year anniversary?": ["Yes", "No"]}

Вопросы в опроснике динамически определяются на основании ответов пользователя - следующий вопрос зависит от ответа на предыдущий. Разработан формат JSON конфигурации, который позволяет задавать правила, связывающие вопросы с конкретными ответами.

Для тестирования работы опросника создан скрипт, работающий с кодом логики опросника и проходящий по всем возможным путям опросов.

Входящие параметры:

JSON конфигурация в выбранном формате с вопросами и допустимыми ответами, задающая связь между ответами пользователя и последующими вопросами.

Выходные данные:

JSON объект, являющийся результатом работы скрипта тестирования, с информацией о количестве всех возможных путей опросов (paths.number), и всеми возможными последовательностями вопросов с ответами (paths.list):

{paths: {number: 3, list: [
[{"What is your marital status?": "Single"},
{"Are you planning on getting married next year?": "Yes/No"}],
[{"What is your marital status?": "Married"},
{"How long have you been married?": "Less than a year"}],
[{"What is your marital status?": "Married"},
{"How long have you been married?": "More than a year"},
{"Have you celebrated your one year anniversary?": "Yes/No"}],
]}}