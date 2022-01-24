import React, { Component } from 'react';
import {ethers} from 'ethers'
import { connect } from 'react-redux';
import { addFactory } from '../features/ContractReducer'
import factory_abi from './factory_abi.json'         /////Import contract ABI
import project_abi from './project_abi.json'




const contractAddress="0x9D28CeDc95Fcab8C818D3D6017356BA3b2c7Aa76";

// ////////State commands/////////
//   	const [defaultAccount, setDefaultAccount] = useState(null);
//   	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
//   	const [provider, setProvider] = useState(null);
//   	const [signer, setSigner] = useState(null);
//   	const [contract, setContract] = useState(null);





// ////////////Connecting to User's account/////////////
// const connectWalletHandler = () => {
//   if (window.ethereum) {
//     window.ethereum.request({method: 'eth_requestAccounts'})
//     .then(result => {accountChangedHandler(result[0]);
//     setConnButtonText('Wallet Connected');
//   })

//   ;
//   console.log(defaultAccount)
// }
//   else {setErrorMessage('Install MetaMask');}


// }

// const accountChangedHandler = (newAccount) => {
//   setDefaultAccount(newAccount);
//   updateEthers();
// }
// /////////Getting an instance of the contract////////////
// const updateEthers = () => {
//   let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
//   setProvider(tempProvider);

//   let tempSigner = tempProvider.getSigner();
//   setSigner(tempSigner);

//   let tempContract = new ethers.Contract(contractAddress, SimpleStore_abi, tempSigner);
//   setContract(tempContract);
// }

// //////////Function Mapping//////////////////////
// // const heyo = async () => {
// //   try{ let vale = await contract.get();
// //     console.log(vale.toString());
// //   setCurrentContractVal(vale.toString());
// //  }

// //   catch (error) { alert(
// //         `Failed to load web3, accounts, or contract. Check console for details.`,); }

// }


// // const setHandler = (event) => {
// // 		event.preventDefault();
// // 		console.log('sending ' + event.target.setText.value + ' to the contract');
// // 		contract.set(event.target.setText.value);
// // 	}

// ////////////////Front End///////////////////////
//   return (
//     <div>
//       <h1>First ever dApp</h1>
//       <button onClick={connectWalletHandler}>{connButtonText} </button>

//     </div>
//   );
// }

// export default Contract;

export class Contract extends Component {

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
              <h1>First ever dApp</h1>
              <button id='wallet-btn' onClick={this.connectWalletHandler}>unconnected</button>
            </div>
          );
      }
}

export default connect(null, { addFactory })(Contract);