// rcfc
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class index2 extends Component {
    constructor(props: any) {
        super(props);
        console.log(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps: any) {
        console.log(nextProps)
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        console.log(nextProps)
        console.log(nextState)
        return true;
    }

    componentWillUpdate(nextProps: any, nextState: any) {
        console.log(nextProps)
        console.log(nextState)
    }

    componentDidUpdate(nextProps: any, nextState: any) {
        console.log(nextProps)
        console.log(nextState)
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default index2;