import React from 'react';
import Header from '../header/common-header';
import Footer from '../footer/footer';
import { connect } from "react-redux"

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

    //=== Render
    render() {
        return (
        <div className="app">
            <h3>Main App {this.props.header}</h3>
            <Header />
            <Footer />
        </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {header: state.header}
}

// Default state and props
App.defaultProps = {};

export default connect( mapStateToProps )( App );