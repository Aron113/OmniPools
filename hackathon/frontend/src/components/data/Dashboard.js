import React, { Fragment } from 'react';
import Form from './Form'
import Proposals from './Proposals'
import Details from './Detail'
import { useSelector } from 'react-redux'

export default function Dashboard () {
    const componentState = useSelector((state) => state.component.value)
    return (
        <Fragment>
            <Form/>
            {componentState.detailComponent && <Details/>}
            {componentState.listComponent && <Proposals/>}
        </Fragment>
    );
};