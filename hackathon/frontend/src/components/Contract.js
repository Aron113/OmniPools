import React, { Component } from 'react';
import {ethers} from 'ethers'
import { connect } from 'react-redux';
import { addFactory } from '../features/ContractReducer'
import factory_abi from './factory_abi.json'         /////Import contract ABI
import project_abi from './project_abi.json'
import { FcApproval } from "react-icons/fc";



const contractAddress="0x9D28CeDc95Fcab8C818D3D6017356BA3b2c7Aa76";

export class Contract extends Component {
  constructor (props) {
    super(props)
    this.connectWalletHandler()
    console.log('connected')
  }

  state = {
    defaultAccount: null, 
    provider: null, 
    signer: null, 
    factory: null, 
    factory_abi: null, 
    project_abi: null, 
}

    connectWalletHandler = () => {
        if (window.ethereum) {
          console.log('uhh')
          console.log(window.ethereum)
          window.ethereum.request({method: 'eth_requestAccounts'})
          .then(result => {this.accountChangedHandler(result[0]);
          () => {document.getElementById('wallet-btn').innerHTML('wallet connected!')};
        })
      
        ;
      }
        else {setErrorMessage('Install MetaMask');}
      
      
      }

          accountChangedHandler = (newAccount) => {
      this.setState({['defaultAccount']: newAccount});
      this.updateEthers();
    }
      

      /////////Getting an instance of the contract////////////
    updateEthers = () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        this.setState({['provider']: tempProvider});
      
        let tempSigner = tempProvider.getSigner();
        this.setState({['signer']: tempSigner});
        this.setState({['factory_abi']: factory_abi});
        this.setState({['project_abi']: project_abi});
        console.log((factory_abi))
        let tempContract = new ethers.Contract(contractAddress, factory_abi, tempSigner);
        this.setState({['factory']: tempContract});
        this.props.addFactory(this.state)
      }

      render() {
        return (
            <div>
              {this.state.factory && <h2>Wallet connected!<FcApproval/></h2>}
            </div>
          );
      }
}

export default connect(null, { addFactory })(Contract);