/*
A pure, vanilla,  JS  module
*/

import Enums from '../Enums.js';

let Header = {
    config:{},
    render:function(target = null){
        if ( !target && !this.getTarget() ){
         return;
        };

        this.config.target = target;

        let template = `<div class="header-vanilla">
        <div><p>This is a plain, vanilla, JS component - no libraries.</p>
            <p></p>
        </div>
            <div class="header-text">${this.getText()}</div>
            <div class="header-sub-text">${this.getSubText()}</div>
            <hr />
            <p>Input header text here:</p>
            <p>
            <input id="header-input" class="no-drag header-textbox form-control"  type="text" value=${'"'+this.getText()+'"'} />
            </p>
        </div>`
        this.getTarget().innerHTML = template;
        let _input = document.querySelector('#header-input');

        if(_input) {
            _input.addEventListener('input', (e)=>{
                this.setText(e.target.value);
            });

            _input.focus();
            var length = _input.value.length;
            _input.setSelectionRange(length, length);
        }
    },
    getTarget:function(){
        return this.config.target || null;
    },
    getText:function(){
        return this.config.text;
    },
    setText:function(value){
        if(typeof value !== 'string'){
            throw new Error('setText requires a String');
        }
        this.config.text = value;
        this.render(this.getTarget());
    },
    setSubText:function(value){
        if(typeof value !== 'string'){
            throw new Error('setSubText requires a String');
        }
        this.config.subText = value;
        this.render();
    },
    getSubText:function(){
        return this.config.subText;
    }
};

export default {create:(config)=>{
    let _config = {
        target: null,
        text: "Default headline text",
        subText:"Default subtext"
    };

    //If there are any config objects -
    let _combinedConfig = Object.assign(_config, config);
    let h = Object.create(Header);
    h.config = _combinedConfig;
    return h;
} }
