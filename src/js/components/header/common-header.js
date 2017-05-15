import React from 'react';
import Enums from '../../Enums.js';
import SubHeader from './sub-module.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openFinHeadline: "React component headline here"
        };
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
    //=== Render
    render() {
        return (<div className="common-header">
            <SubHeader />
            <h3>React header</h3>
            <div className="main-header">
                {this.props.headline}
            </div>
            <div className='sub-header'>
                {this.props.subHeadline}
            </div>
        </div>);
    }
}
// Default state and props
Header.defaultProps = {
    headline: "This is the default headline",
    subHeadline: "The subHeadline"
};



export default Header;
