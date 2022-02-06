import React, { Component, useState } from 'react';
import { addProposal } from '../../features/ProposalReducer';
import { connect, useSelector } from 'react-redux';
import { ethers } from 'ethers'
import project_abi from '../project_abi.json'
import getCookie from '../csrf'
import { projectAddress } from '../factoryMethods';
import "regenerator-runtime/runtime.js";
import { useDispatch } from 'react-redux';


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
        const Address = await this.getContractInformation(this.state.duration, this.state.price)
        this.setState({['address']: Address})
        this.setState({['image']: URL.createObjectURL(this.state.image)})
        const { name, image, price, address, tokenId, description, duration } = this.state;
        const proposal  = { name, price, address, description, image }
        // this.updateDatabase(name , price, address, description, image) //Address remains undefined until trans approved undefined address updated in DB
        console.log(address, 'THIS IS CURRENT ADDRESS')
        this.props.addProposal(proposal)
        console.log('proposal added')
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
            const Address = await Promise.resolve(projectAddress(factory, initFields.project_abi, initFields.signer, this.state)) // need to resolve promise as async function returns Promise
            console.log("getcontract info " + Address)
            return Address

    };

    onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files, 'this is image')
            let img = e.target.files[0]
            this.setState({
                ['image']: img
            });
        } else {
            console.log('no image')
        }
    };
    

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
                    <input type="file" name='image' accept="image/*" placeholder="Please input image" width={"250px"} onChange={this.onImageChange}/>
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


