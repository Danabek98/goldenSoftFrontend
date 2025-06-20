# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

src/
│
├── assets/ # Статические файлы
│ ├── fonts/ # Шрифты
│ ├── images/ # Изображения
│ └── svg/ # SVG иконки/изображения
│
├── components/ # Переиспользуемые UI-компоненты
│ ├── common/ # Очень простые компоненты (кнопки, инпуты)
│ ├── ui/ # Более сложные UI компоненты
│ └── ... # Можно группировать по domain/feature при необходимости
│
├── containers/ # Компоненты-контейнеры (подключенные к стору/имеющие логику)
│
├── pages/ # Компоненты страниц
│ ├── Home/
│ │ ├── components/ # Компоненты используемые только на этой странице
│ │ ├── Home.tsx
│ │ └── Home.module.css
│ └── .../
│
├── hooks/ # Кастомные хуки
│
├── store/ # State management (Redux/MobX/Zustand и т.д.)
│ ├── slices/ # Redux Toolkit slices
│ ├── actions/ # Redux actions (если не используем RTK)
│ └── reducers/ # Redux reducers (если не используем RTK)
│
├── services/ # API слои и сервисы
│ ├── api/ # Базовые API конфиги (axios/RTK Query instances)
│ └── userService.ts # Пример сервиса
│
├── utils/ # Вспомогательные функции/утилиты
│
├── constants/ # Константы приложения
│
├── types/ # Глобальные типы (если используем TypeScript)
│
├── styles/ # Глобальные стили, темы
│ ├── base.css # Сброс стилей, базовые стили
│ ├── theme.css # Переменные тем
│ └── .../
│
├── App.tsx # Главный компонент приложения
├── main.tsx # Точка входа
└── index.css # Глобальные стили
assets/ - Только статические файлы, которые не обрабатываются кодом (кроме импорта)

    components/ - "Тупые" компоненты (presentational):

        Получают данные только через props

        Не содержат бизнес-логики

        Максимально переиспользуемые

    containers/ - "Умные" компоненты:

        Подключены к стору

        Содержат бизнес-логику

        Управляют состоянием дочерних компонентов

    pages/ - Компоненты страниц:

        Каждая страница в своей папке

        Могут иметь локальные компоненты в подпапке

        Часто являются контейнерами

    hooks/ - Кастомные хуки для переиспользуемой логики

    store/ - Для больших проектов с состоянием:

        Лучше использовать Redux Toolkit (RTK)

        Для маленьких проектов - Context API + useReducer

    services/ - Слой для работы с API:

        Абстракция над HTTP-клиентом

        Группировка запросов по доменам
