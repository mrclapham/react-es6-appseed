import React from 'react';
import Header from '../header/common-header';
import Footer from '../footer/footer';
import { connect } from "react-redux";
import { updateHeader, getBikeData, filterBikeDataRoot } from "../../redux/actions/actions"
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

    filterBikeData() {
        this.props.filterBikeDataRoot("description", "")
    }

    //=== Render
    render() {
        return (
            <div className="app">
                <div className="container bs-docs-container">
                    <Header headline={this.props.state.header} />
                    <button className="btn btn-default" onClick={this.onButtonClick.bind(this)}>Update header</button>
                    <button className="btn btn-default" onClick={this.props.getBikeData}>Get bike crime stats</button>
                    <button className="btn btn-default" style={{"display": this.props.state.bikeCrimeRetreivalStatus === "data received" ? "inline" : "none"}} onClick={this.filterBikeData.bind(this)}>filter bike crime stats</button>
                    <h3>Data loading status: {this.props.state.bikeCrimeRetreivalStatus}</h3>
                    {this.props.state.bikeCrimeFiltered.map((d, i) => {
                        return (<div key={i}><p className="filtered-bikecrime">{d.title}</p></div>)
                    })}

                    <hr />
                    {this.props.state.bikeCrime.map((d, i) => {
                        return (<div key={i}><p>{d.title}</p></div>)
                    })}
                    <Footer />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { state: state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateHeader,
        getBikeData,
        filterBikeDataRoot
    }, dispatch);
}

// Default state and props
App.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);