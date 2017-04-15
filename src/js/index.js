import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../js/components/common-header.js';
import HeaderVanilla from '../js/vanilla_conmponents/vanilla-header.js';
import Enums from '../js/Enums.js'
import 'core-js';

require("../sass/entry.scss");

document.addEventListener("DOMContentLoaded", function () {
    init();
});

function init() {
// Pure JS renderer.
    let _header = HeaderVanilla.create({ text: "Default headline text" })
    .render(document.querySelector('#content-vanilla'));

// React renderer.
    ReactDOM.render(<Header headline={"Set headline"} subHeadline={'Set subHeadline'} />,
        document.querySelector('#content')
    );
}

