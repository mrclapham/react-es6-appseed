import React from 'react';
import Header from '../header/common-header';
import Footer from '../footer/footer';
import { connect } from "react-redux";
import { updateHeader } from "../../redux/actions/update-header-actions"
import { bindActionCreators } from "redux";

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
    // shouldComponentUpdate() {
    //     //console.log("shouldComponentUpdate");
    // };
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
    onButtonClick() {
        this.props.updateHeader("new header " + String(Math.ceil(Math.random() * 100)));
    }

    //=== Render
    render() {
        return (
            <div className="app">
                <div className="container bs-docs-container">
                    <h3>Main App: {this.props.header}</h3>
                    <button className="btn btn-default" onClick={this.onButtonClick.bind(this)}>Update header</button>
                    <Header headline={this.props.header} />
                    <Footer />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { header: state.header }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateHeader: updateHeader }, dispatch);
}

// Default state and props
App.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);