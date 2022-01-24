import React, { Fragment } from 'react';
import Form from './Form'
import Proposals from './Proposals'

export default function Dashboard () {
    return (
        <Fragment>
            <Form/>
            <Proposals/>
        </Fragment>
    );
};