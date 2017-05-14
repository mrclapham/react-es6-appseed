import React from 'react';
import Header from '../header/common-header';
import Footer from '../footer/footer';
import store from '../../redux/store';
import { updateHeader } from '../../redux/actions/update-header-actions';
import { Provider, connect } from 'react-redux';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    };
    //=== Mounting lifecycle
    componentWillMount() {
        //console.log("componentWillMount")
    };
    componentDidMount() {
        //console.log("componentDidMount");
    };

    //=== Update lifecycle 
    componentWillReceiveProps(nextProps) {
        // console.log("componentWillReceiveProps: nextProps ",nextProps)
    };
    shouldComponentUpdate() {
        //console.log("shouldComponentUpdate");
    };
    componentWillUpdate() {
        //console.log("componentWillUpdate");
    };
    //=== Unmount lifecycle
    componentWillUnmount() {
        //console.log("componentWillUnmount");
    };
    componentDidUpdate() {
        //console.log("componentDidUpdate");
    };
    //---- 
    randomHeaderUpdate() {
        console.log("The props === ", this.props)
        //props.updateHeader( Math.random() * 100 )
        updateHeader(Math.random() * 100);
    };
    //=== Render
    render() {
        return (<div className="app">
            <h3>Main App</h3>
            <button onClick={this.randomHeaderUpdate.bind(this)}>change header</button>
            <Header />
            <Footer />
        </div>);
    }
}





// Default state and props
App.defaultProps = {};

export default App;