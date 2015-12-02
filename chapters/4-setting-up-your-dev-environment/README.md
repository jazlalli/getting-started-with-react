# Setting up your dev environment

We want all the good things...

- React (obviously)
- ES2015 (via Babel)
- Module Bundling (Webpack)
- Hot/live reloading (HMR)

Let's go through setting up an example project. First, navigate to the `code` folder...

1. Interactively create package.json file: `npm init`

2. Install dependencies: `npm install react react-dom --save`

3. Install dev-dependencies:

    ```sh
    npm install babel-core@5.8.34 babel-loader@5.4.0 babel-eslint babel-plugin-react-transform eslint eslint-plugin-react express react-transform-catch-errors react-transform-hmr redbox-react webpack webpack-dev-middleware webpack-hot-middleware --save-dev
    ```

4. In the code directory you will find `server.js` - it is just a simple node express server which we will use for development. And also `webpack.config.js` - where you define the webpack setup.

5. Create `index.html` and add:

    ```html
    <div id="root"></div>
    <script src="/static/bundle.js"></script>
    ```

    to the `<body>`

6. Create `.eslintrc` file (where we will define config for eslint), you can paste the example config:

    ```json
    {
      "ecmaFeatures": {
        "jsx": true,
        "modules": true
      },
      "env": {
        "browser": true,
        "node": true
      },
      "parser": "babel-eslint",
      "rules": {
        "quotes": [2, "single"],
        "strict": [2, "never"],
        "react/jsx-uses-react": 2,
        "react/jsx-uses-vars": 2,
        "react/react-in-jsx-scope": 2
      },
      "plugins": [
        "react"
      ]
    }
    ```

7. **Optional** you can also create `.eslintignore` where you can define files/folders which ESLint should ignore.

8. Create `.babelrc` file where we define Babel's stage:

    ```json
    {
      "stage": 0
    }
    ```

    **Note:** we are still using Babel 5.x as the hot reloading does not support Babel 6 yet. With Babel 6 you would need to install `npm install babel-preset-stage-0` and add:

    ```json
    {
      "presets": ["stage-0"]
    }
    ```

    to the `.babelrc` file.

9. Create `src` folder. That's where our React app is going to live.

10. Navigate to `src` and create `app.js` file and create a simple *Hello world* app in React:

    ```js
    import React, { Component } from 'react';
    import { render } from 'react-dom';

    class App extends Component {
      render() {
        return (
          <h1>Hello from your new dev environment!</h1>
        );
      }
    }

    render(<App />, document.getElementById('root'));
    ```

12. Add lint script to the `package.json`: `"lint": "eslint src"` and make sure that the start script looks like: `"start": "node server.js"`

13. That's it!
`npm start` and navigate to http://127.0.0.1:3000 in your browser.
