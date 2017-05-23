# HTML5/React/Redux/ES6 modular development

### A bare bones starter-pack for building HTML5 webb apps using ES6, SASS, WebPack and React (optional)

It ustalises ES6 syntax, post-processed through [WebPack 2](https://webpack.github.io/), to make it possible to write in modules, which may then be imported and incorporated, as required, and therefore shared beween windows and apps.

The project requires some setting up and configuring and the steps are explained below and further annotated within the source code itself. The project is, however, set up and ready to run and may be used and modified as an 'app seed' without delving into the minutiae of the setup (although it recommend you do delve and learn). 

React and Redux are included in the project but it may also be used as a starting point for 'vanilla' js apps. 

To build the project, clone the GitHub repo and, in a command line terminal (preferably GitBash on a Windows machine), navigate to the root directory and run:

```
$ npm install
```

It is important to add 'core.js' to any 'entry' file(s) - files which will be processed though WebPack - this will allow ES6 features like Object.assign, to be used via polyfills. [https://github.com/zloirock/core-js](https://github.com/zloirock/core-js) .

Add the following code at the head of any 'entry' files. Included sub-modules imported into the entry file do not require the polyfill adding, it is only required to be included once for the polyfills to work.

```
import 'core-js';
```

The app runs on a simple Node/Express server. To start it, navigate to the root of the project in a terminal (again, Gitbash for Windows is best) and run:

```
$ node server
```
This will start a webserver at [http://localhost:9075/](http://localhost:9075/).

For development you may also use the Webpack server (see the Webpack section below).


##Project organisation

WebPack takes care of JavaScript and Sass postprocessing, the HTML build and a live-reloading development server.

###JavaScript
The raw, source files, are in 'src' and are output to 'build' after post-processing through WebPack. JavaScript may be written in ES6 as it will be transpiled to ES5.

###HTML
The HTML files live in the build folder too. Edit index.ejs to edit the built html file. Variables may be passed to the built HTML file from the webpack.config.js  

###CSS/SASS
The base for the css is Bootstrap-sass. It is installed via npm and then required into the 'sass/entry.scss' file, directly from the 'node_modules' folder and then compiled, via WebPack, for output. The BootStrap base may them be extended by app-specific or module-specific 'partials' - as below.

```
@import "../../node_modules/bootstrap-sass/assets/stylesheets/bootstrap-sprockets";
@import "../../node_modules/bootstrap-sass/assets/stylesheets/bootstrap";
@import "partials/header";
@import "partials/app"; 
```

The file named for the partials require and underscore preceeding them - so '@import "partials/header";' imports a file named '_header.scss'.

If preferred, the partiials may sit inside the individual component folders and be included in the entry file via their relative path.

The 'webpack.config.js' requires the following configuration setting. 

```
rules: [{
        {
            test: /\.scss/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },
        { test: /\.png$/, loader: "url-loader?limit=100000" }
        ]
    }
```

Sass is not directly output to css, instead you require the root .scss file into the project's javaScript entry file, using CommonJs syntax, like so: 

```
require  ("../sass/entry.scss");
```
It is then compiled into the project.

###Unit testing
Unit testing in this project uses Jasmine as the testing framework and Karma as the test runner. To run the tests, in the terminal window, navigate to the root of the project and run:

```
$ karma start
```
As we are testing ES6/React, the code needs running through WebPack and this requires the 'karma-webpack' module to be npm installed and some configuring in the 'karma.conf.js' file.

we need to add the following to the 'karma.conf.js':

```
var webpackConfig = require('./webpack.config'); //Path to your webpack config file.
```

```
preprocessors: {
  'test/*-test.js': [ 'webpack' ],
  'build/bundle.js': [ 'webpack' ]
},
webpack: webpackConfig,
webpackMiddleware: {
   noInfo: true
}
```

More information on setting up Karma may be found [here](https://karma-runner.github.io/1.0/index.html) 


When testing React components 'Enzyme' is required.

At the head of the test case for your React Component add:

```
import React from 'react';
import { shallow } from 'enzyme';
import ThingToTest from '../src/js/components/thing-to-test.js';
```
Then you are able to write your tests against your React components. See the full API documentation on the [Enzyme](https://github.com/airbnb/enzyme) site. 

## Webpack 2 setup
Webpack packages up all your JavaScript/React components into one bundle. It also builds out your HTML file using the 'HTMLWebpackPlugin' plugin.
### Html
In the 'webpack.config.js' file the section which deals with HTML is:

```
    plugins: [new HTMLWebpackPlugin({
        title: "App seed",
        minify: { collapseWhitespace: true },
        hash: true,
        template: "./src/html/index.ejs"
    })],
```
If you wish to edit the basic template edit the ejs file in 'src/html/index.ejs'.

### JavaScript/React
The settings to compile JavaScript/React/es2015 and produce source maps is: 

```
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader', "source-map-loader"]
        }
```
In addition the '.babelrc' also needs to be set as follows: 

```
{
  "presets": ["react-es2015"]
}
```
### Dev Server 
Install the dev server globally with:

```
npm install webpack-dev-server -g
```

Then simply run the script in the package.json:

```
npm run serve
```

or to run a watch on any changes in your code and live-reload run:

```
npm run dev
```


## the Redux checklist

Redux checklist:

Redux has a load of moving parts - it makes the plumbing of your app simpler but you have a few steps to remember. To help with this here is a checklist. I'd highly reccommend Atul Gawande's excellent [The Checklist Maifesto](http://atulgawande.com/book/the-checklist-manifesto/)

So here we go - you want to do something in your app the makes a th

## 1. create an action 
1.1: write test - you only need to test the ‘action.type’ and ‘action.payload’

1.2 write the action, like this: 

```
export const updateStuff = (value) => {
    return {type: UPDATE_STUFF_CONSTANT, payload: value }
}

```

2. write the reducer
2.1 write the reducer test


describe(“stuff-reducer", ()=>{
    it("Handles an unknown type.", ()=>{
        expect( StuffReducer() ).toEqual("Default value from stuff reducer");
    });

    it("Handles action of type UPDATE_STUFF_CONSTANT.", ()=>{
        const action = {type: UPDATE_STUFF_CONSTANT,  payload: "Revised stuff”}
        expect(HeaderReducer("",action)).toEqual("Revised header");
    });
});


3. combine your reducers into one big object

import { combineReducers } from 'redux'
import thing1 from ‘./thing1-reducer'
import thing2 from ‘./thing2-reducer'

export default combineReducers({
  thing1: thing1,
  thing2: thing2
});

//——————

4. If there is no store, make a store and pull in the combined reducers from step 3 - else go to 5.

import reducersIndex from './reducers/reducers-index'
import { createStore } from 'redux'

/* eslint-disable no-underscore-dangle */

  export const store = createStore(
   reducersIndex, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

/* eslint-enable */

5. If there is no connected component, make one else move to 5.b
5.a import connect, bindActionCreators into the component you want to connect

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

5.b if you made a new action (step 1 ) import it into the component you want to connect.

import { updateStuff, updateMoreStuff } from ../redux/action

class App extends React.Component {
  //—-
}

// — 
const mapStateToProps = (state) => {
    return { thing1: state.thing1 }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateHeader: updateHeader }, dispatch);
}

// Default state and props
App.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);









