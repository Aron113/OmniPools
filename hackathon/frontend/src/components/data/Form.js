import React, { Component, useState } from 'react';
import { addProposal } from '../../features/ProposalReducer';
import { connect, useSelector } from 'react-redux';
import { ethers } from 'ethers'
import project_abi from '../project_abi.json'
import getCookie from '../csrf'
import { projectAddress  } from '../factoryMethods';
import "regenerator-runtime/runtime.js";


export class Form extends Component {
    csrf = getCookie('csrftoken')
    
    state = {
        name:'', 
        image:'', 
        price:'', 
        address:'', 
        tokenId:'', 
        description:'', 
        duration:'',
      };

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = async (e) => {
        e.preventDefault();
        const Address = await this.getContractInformation(this.state.duration, this.state.price).then(data => console.log("form address" + data))
        this.setState({['address']: Address})
        const { name, image, price, address, tokenId, description, duration } = this.state;
        const proposal  = { name, price, address, description, image }
        // this.updateDatabase(name , price, address, description, image) //Address remains undefined until trans approved undefined address updated in DB
        this.props.addProposal(proposal)
        this.setState({
            name:'', 
            image:'', 
            price:'', 
            address:'', 
            tokenId:'', 
            description:'', 
            duration:'',
        });
    };

    getContractInformation = async (Duration, Price) => {

            var time = 100;

            const initFields = this.props.data
            const factory = initFields.factory
            let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
            let tempSigner = tempProvider.getSigner()
            const Address = projectAddress(factory, initFields.project_abi, initFields.signer, this.state)
            console.log("getcontract info " + Address)
            return Address

    };
    

    updateDatabase = (name, price, address, description, image) => {
        fetch('/api/', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json', 
                'X-CSRFToken': this.csrf
            }, 
            body: JSON.stringify({
                "name": name, 
                "price": price, 
                "contractAddress": address, 
                "description": description,

            })
        }).then(data => console.log(data))
    }
    
    render() {
    return (
        <div>
            <h2>Add Lead</h2>
            <form>
                <div>
                    <label>Name</label>
                    <input type="text" name='name' placeholder="Enter Name" onChange={this.onChange}/>
                </div>
                <div>
                    <label>Image</label>
                    <input type="url" name='image' placeholder="Enter Link to Image" onChange={this.onChange}/>
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" name='price' placeholder="Enter Price" onChange={this.onChange}/> 
                </div>
                <div>
                    <label>Token ID</label>
                    <input type="number" name='tokenId' placeholder="Enter Token ID" onChange={this.onChange}/>
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" size="100px" height="100px" name='description' placeholder="Enter Description" onChange={this.onChange}/>
                </div>
                <div>
                    <label>Duration in hours</label>
                    <input type="numbers" size="100px" height="100px" name='duration' placeholder="Enter Description" onChange={this.onChange}/>
                </div>
                <div>
                    <button type='submit' className='btn btn-primary' onClick={this.onSubmit}>
                        Submit
                    </button>
                </div>
                <br/>
                <br/>
            </form>
        </div>
    )
                    }                 
}

const mapStateToProps = state => {
    return {
        data: state.factory.value
    }
}

export default connect(mapStateToProps, { addProposal })(Form);    


