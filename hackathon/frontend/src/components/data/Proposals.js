import React, { Component, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateProposals, addProposal, currentProposal } from '../../features/ProposalReducer';
import { toggleComponent } from '../../features/componentReducer'



function Proposals () {
    console.log(proposals, "LISTTTTTTTTTTTTTTTT")
    const dispatch = useDispatch()
    
    useEffect(() => {
        fetch('http://localhost:8000/api/')
        .then(response => response.json())
        .then(data => data.forEach(P => dispatch(addProposal(P)))
    )}, []);

    const proposals = useSelector((state) => state.proposals.value.proposals);

    function clicked (current) {
        dispatch(toggleComponent({
            listComponent: false, 
            detailComponent: true, 
        }))
        dispatch(currentProposal({'address': current}))
    }

    return (
        <Fragment>
            <h2>Leads</h2>
            <div className="row row-cols-1 row-cols-md-4 g-4">
            {proposals.map((p, i) => (
                <div className="card" style={{width: "18rem;"}}>
                    <img className="card-img-top" width={"125px"} height={"250px"} src={p.image} alt="Card image cap"/>
                    <div className="card-body">
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <ul class="list-group list-group-flush">
                                <li className="list-group-item">{p.name}</li>
                                <li className="list-group-item">{p.price}</li>
                                <li className="list-group-item"></li>
                                <li className="list-group-item">
                                <button
                                        onClick={() => clicked(p.address)} //bind needs to be used
                                        className="btn btn-primary btn-sm"
                                    >
                                    {' '}
                                    Details
                                    </button>
                                </li>
                            </ul>
                    </div>
                </div>
           ))
           };
           </div>
           
            
        </Fragment>
    )
  
}

export default Proposals;
