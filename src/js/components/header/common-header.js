import React from 'react';
import Enums from '../../Enums.js';
import SubHeader from './sub-module.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenStateProperty: "React component headline here"
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
            <h2 className="main-header">
                {this.props.headline}
            </h2>
            <h3 className='sub-header'>
                {this.props.subHeadline}
            </h3>
            <SubHeader />
            <p>This is a React component.</p>
            <p>To update the header to dispay a random number click the 'Update header' button below. </p>
        </div>);
    }
}
// Default state and props
Header.defaultProps = {
    headline: "The default headline.",
    subHeadline: "The default subheadline."
};

export default Header;
