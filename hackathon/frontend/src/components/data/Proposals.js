import React, { Component, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateProposals, addProposal } from '../../features/ProposalReducer';



function Proposals () {
    console.log(proposals, "LISTTTTTTTTTTTTTTTT")
    const dispatch = useDispatch()
    
    useEffect(() => {
        fetch('http://localhost:8000/api/')
        .then(response => response.json())
        .then(data => data.forEach(P => dispatch(addProposal(P)))
    )}, []);

    const proposals = useSelector((state) => state.proposals.value.proposals);

    return (
        <Fragment>
            <h2>Leads</h2>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Contract Address</th>

                    </tr>
                </thead>
            <tbody>
            {proposals.map((p, i) => (
                <tr key={i}>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.description}</td>
                    <td>{p.address}</td>
                    <td>
                        <button
                            onClick={() => {}}
                            className="btn btn-primary btn-sm"
                        >
                        {' '}
                        Details
                        </button>
                    </td>
                </tr>
            ))};
            
                
            </tbody>
            </table>
        </Fragment>
    )
  
}

export default Proposals;
