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



## Project organisation

WebPack takes care of JavaScript and Sass postprocessing, the HTML build and a live-reloading development server.

### JavaScript
The raw, source files, are in 'src' and are output to 'build' after post-processing through WebPack. JavaScript may be written in ES6 as it will be transpiled to ES5.

### HTML
The HTML files live in the build folder too. Edit index.ejs to edit the built html file. Variables may be passed to the built HTML file from the webpack.config.js  

### CSS/SASS
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

### Unit testing
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


Redux has a load of moving parts - it makes the plumbing of your app simpler but you have a few steps to remember. To help with this here is a checklist. I'd highly reccommend Atul Gawande's excellent [The Checklist Maifesto](http://atulgawande.com/book/the-checklist-manifesto/)

So here we go – you want to do something in your app to change the state of a reducer and, therefore, the state of the App.

### 1: create an action 
**1.1** write test - you only need to test the ‘action.type’ and ‘action.payload’

```
describe('actions', ()=>{
    describe('Update stuff action', ()=>{
        it("Has the correct type", ()=>{
            const action = updateStuff()
            expect(action.type).toEqual(UPDATE_STUFF);
        });
        it("Has the correct payload", ()=>{
            const action = updateStuff('New stuff');
            expect(action.payload).toEqual('New stuff');
        })
    });
});

```

**1.2** write the action, like this: 

```
export const updateStuff = (value) => {
    return {type: UPDATE_STUFF_CONSTANT, payload: value }
}

```

### 2: write the reducer

**2.1** write the reducer test

```
describe(“stuff-reducer", ()=>{
    it("Handles an unknown type.", ()=>{
        expect( StuffReducer() ).toEqual("Default value from stuff reducer");
    });

    it("Handles action of type UPDATE_STUFF_CONSTANT.", ()=>{
        const action = {type: UPDATE_STUFF_CONSTANT,  payload: "Revised stuff”}
        expect(HeaderReducer("",action)).toEqual("Revised stuff");
    });
});
```
**2.2** write the reducer

```
export default (state = "Default value from stuff reducer", action = {type:null, payload:null} ) => {

    switch (action.type) {
        case UPDATE_STUFF_CONSTANT :
            return action.payload
            break;
        default:
            return state;
    }
};
```

### 3: combine your reducers into one big object

```
import { combineReducers } from 'redux'
import thing1 from ‘./thing1-reducer'
import thing2 from ‘./thing2-reducer'

export default combineReducers({
  thing1: thing1,
  thing2: thing2
});
```


### 4: If there is no store, make a store and pull in the combined reducers from step 3 – else go to step 5.
```
import reducersIndex from './reducers/reducers-index'
import { createStore } from 'redux'

/* eslint-disable no-underscore-dangle */

  export const store = createStore(
   reducersIndex, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

/* eslint-enable */
```

### 5: If there is no connected component, make one else move to step 5.2

**5.1** import connect, bindActionCreators into the component you want to connect

```
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
```

**5.2** if you made a new action (step 1) import it into the component you want to connect.

**5.3** add you Action to your 'mapDispatchToProps' function

**5.4** invoke your action with:

```
this.props.updateStuff("your payload data here");
```
See it in context below:

```
import { updateStuff, updateMoreStuff } from ../redux/action

class App extends React.Component {
     onButtonClick() {
        this.props.updateStuff("new header " + String(Math.ceil(Math.random() * 100)));
    }
    render() {
        return (
            <div className="app">
                    <button onClick={this.onButtonClick.bind(this)}>Update thing</button>
            </div>
        );
    }
}

// — 
const mapStateToProps = (state) => {
    return { thing1: state.thing1 }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ 
    		updateStuff: updateStuff, 
    		updateMoreStuff: updateMoreStuff 
    		}, 
    		dispatch);
}	

// Default state and props
App.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);

```

### 6: display the data from the reducer to your app

The data from the reducers is now available from Provider, mapped to props within the App. Add it to the connected commponent like this:

```
    render() {
        return (
            <div className="app">
            			<div> {this.props.thing1} </div>
                    <button onClick={this.onButtonClick.bind(this)}>Update thing</button>
            </div>
        );
    }

```

## Middleware
The above example is extremely bare-bones. 
#### Most apps need to:
* Asynchrounously get some data from a web-service (probably getting it back as JSON)
* filter, reorder and generally slice and dice that data for display

For this we need to add some middleware. The middleware is needed as the returned value from the action is not the {type: BLAH, payload: 'blah'} shape Redux is expecting - it is function. The middleware will deal with this. For more about middleware see: [http://redux.js.org/docs/advanced/Middleware.html](http://redux.js.org/docs/advanced/Middleware.html). 

Refering back to stage 4, we need to add the lines:

```
import thunk from 'redux-thunk'

applyMiddleware(thunk)

```
as below...

```
import reducersIndex from './reducers/reducers-index'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

/* eslint-disable no-underscore-dangle */
  export const store = createStore(
   reducersIndex, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
   applyMiddleware(thunk)
  );

/* eslint-enable */

```

## Where do I put my business logic?

There is no single answer to this, opinions vary. 

For this example, to keep it simple, put your business logic in an Action. You may put some business logic in components, as connected components may access the app's 'state' via passed down props from the 'Provider'. Don't put your business logic in the 'render' method of a component. 

We are going to keep things clean, stateless and testable in this example by putting any business logic in an 'action', reflecting the new state in a reducer listening for that action and keeping the 'Provider's' 'state' as the single source of truth abouth the state of the entire App.

We are going to avoid setting state in our components as other components are not able to easily access it. Setting state within a component is not totally taboo as it may be appropriate for, say, a toggle button where the on/off state is only of interest to the component itself.

The above example is very, very bare bones - we are going to have to get a bit more complicated and add 'middleware' to invoke a returned function which in turn returns the { type: TYPE_OF_ACTION, payload: value_of_payload } object the Reducers expect.

Write your Action like this...

```
import { FILTER_STUFF } from './constants';

export const doSomeBusinessLogic = (property, value) => {
    return (dispatch, getState) => {

        // grab the var you need from the existing state
        const { existingState } = getState();

        // do your slicing, dicing and general business logic here
        const filteredData = existingState.filter((d)=>{
            return String(d[property]) === String(value)
        })

        // then dispatch the function to be heard by the reducers
        dispatch(dispatchDoSomeBusinessLogic(filteredData))
    }
}
```
This invokes a simple Action 'dispatchDoSomeBusinessLogic' (see below)

```
export const dispatchDoSomeBusinessLogic = (value) => {
    return { type: FILTER_STUFF, payload: value }
}
```

...and you test it like this.

You need to create a mock store - in order to pass it an initial value and to have access to the 'dispatch' and 'getState' methods of the store. The store also needs the 'thunk' middleware injected.

```
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { doSomeBusinessLogic } from './doSomeBusinessLogic'

..............

const testData = [{id:123}, {id:345}];

    describe("Actions containing business logic - return an item with a specific ID.", () => {
        const revisedData = Object.assign({}, { header: "header value", data: testData })
        const store = configureStore([thunk])(revisedData);
        store.dispatch(doSomeBusinessLogic("id", 123));
        const action = store.getActions().find(a => a.type === FILTER_STUFF);

        it('Should only return the item with an id of 123', () => {
            expect(action.payload.length).toEqual(1);
            expect(action.payload[0].id).toEqual(123);
        })
    });

```

You also need to jump another hoop when Enzyme testing connected components. They need to have a 'context' object passed 


```
import { state } from '../defaultState';
const mockStore = configureStore([thunk])(Object.assign({}, state)) ;
const context = { store: mockStore };

describe('my connected component', () => {
    it('Will render', () => {
        wrapper = shallow(
            <MyConnectedComponent
                name        = {"My name"}
                onChange   	= {()=>{})
                otherStuff 	= { otherStuff }
                />,
                { context }
        );
        expect(wrapper.find('some_dom_element')).not.toBeNull();
        expect(wrapper.props().name).toEqual("My name");
    });

```

















