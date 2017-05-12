import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../js/components/App/App.js';
import Header from '../js/components/header/common-header.js';
import Footer from '../js/components/footer/footer.js';
import HeaderVanilla from '../js/vanilla_conmponents/vanilla-header.js';
import Enums from '../js/Enums.js';
import { Provider } from 'react-redux'; 
import store from './redux/store'
require("../sass/entry.scss");

document.addEventListener("DOMContentLoaded", function () {
    init();
});

function init() {
// Pure JS renderer.
    let _header = HeaderVanilla.create({ text: "Default headline text" })
    .render(document.querySelector('#content-vanilla'));

// React renderer.
    ReactDOM.render(<Provider store ={store}><App /></Provider>,
        document.querySelector('#content')
    );
}

