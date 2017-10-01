import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';
import Header from './components/header/common-header.js';
import Footer from './components/footer/footer.js';
import HeaderVanilla from './vanilla_conmponents/vanilla-header.js';
import Enums from './Enums.js';
import { Provider } from 'react-redux'; 
import { store } from './redux/store';

import { getBikeData } from './redux/actions/actions'
require("../sass/entry.scss");

document.addEventListener("DOMContentLoaded", function () {
    init();
});

function init() {
    getBikeData()
// Pure JS renderer.
    const _header = HeaderVanilla.create({ text: "Default headline text" })
    .render(document.querySelector('#content-vanilla'));

// React renderer.
    ReactDOM.render(<Provider store ={store}><App /></Provider>,
        document.querySelector('#content')
    );
}

