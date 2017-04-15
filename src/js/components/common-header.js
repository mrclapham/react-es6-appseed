import React from 'react';
import Enums from '../Enums.js';
import SubHeader from './sub-module.js'

export default class Header extends React.Component {

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
            <h1>Module loading </h1>
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

Header.propTypes = {
    headline: React.PropTypes.string,
    subHeadline: React.PropTypes.string
};