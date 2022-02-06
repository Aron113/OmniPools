import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Contract, ethers } from 'ethers'
import { render } from 'react-dom'
import { currentProposal } from '../../features/ProposalReducer' 
import { FcApproval, FcHighPriority } from "react-icons/fc";


export default function Details () {
    const dispatch = useDispatch()
    const [refundable, setRefundable] = useState(true)
    const [warn, setWarn] = useState(false)
    const [contrib_amt, changeContrib] = useState(0)
    const currProposal = useSelector((state) => state.proposals.value.current)
    const currentAddr = currProposal.address
    console.log('THIS IS DETAIL', currProposal)
    const factory = useSelector((state) => state.factory.value)

    const projInstance = new ethers.Contract(currentAddr, factory.project_abi, factory.signer)
 

    useEffect(() => {
        fields(projInstance)
        db_data(currentAddr)
     }, [])

    

    const fields = async (pi) => {
        console.log('logger')
        const details = await Promise.resolve(pi.getDetails())
        var currentAmount = ethers.BigNumber.from(details.currentAmount._hex).toString()
        var currentState = details.currentState
        var deadline = ethers.BigNumber.from(details.deadline._hex).toString()
        var goalAmount = ethers.BigNumber.from(details.goalAmount._hex).toString()
        var nftPrice = ethers.BigNumber.from(details.nftPrice._hex).toString()
        var projectStarter = details.projectStarter
        dispatch(currentProposal({
            'currentAmount': currentAmount, 
            'currentState': currentState, 
            'deadline': deadline, 
            'goalAmount': goalAmount, 
            'price': nftPrice, 
            'projectStarter': projectStarter, 
        }))
    }

    const db_data = () => {
        fetch(`http://localhost:8000/api/${currentAddr}`)
        .then(response => response.json())
        .then(data => dispatch(currentProposal({
            'address': data.address, 
            'created_at': data.created_at, 
            'image': data.image, 
            'name': data.name, 
            'price': data.price
        })))
    }   

    const contrib = async (e) => {
        e.preventDefault()
        var amt = ethers.BigNumber.from(contrib_amt)
        try {
            const transaction = await Promise.resolve(projInstance.contribute({value: amt}))
            console.log('hello')
            const { sender, value, currBalance } = await Promise.resolve(confirmContrib(projInstance))
            console.log('why fail')
             dispatch(currentProposal({
                 'currentAmount': currBalance
            }))
            setWarn(false)
            console.log('trasnsaction suceceeded')
        } catch {
            setWarn(true)
            console.log('transaction failed')
        }

    }

    const confirmContrib = async (proj) => {
        console.log('confirming...')
        return new Promise(function (resolve) {
            proj.on('FundingReceived', (sender, value, currBalance) => {
                console.log(sender, 'sender')
                resolve({ sender, value, currBalance })
            })
        })
    }

    const getRefund = async (e) => {
        try{
            const refunded = await Promise.resolve(projInstance.getRefund())
            console.log(refunded, 'refunded?')
            setRefundable(true)
        } catch {
            console.log('refund fail')
            setRefundable(false)
        }
        
    }

    const buttonState = currProposal.currentState == 1
    console.log(buttonState)


    return (
        <Fragment>
            <h1>Detail page</h1>
            <div>
                <form>
                    <input type='text' name='contribution' placeholder='Enter amount' onChange={(e) => changeContrib(e.target.value)}/>
                    {warn && <p style={{color:"red"}}>exceeded max amount! <FcHighPriority/></p>}
                    {!buttonState && <button className='btn btn-success' onClick={(e) => contrib(e)}>
                        contribute
                    </button>}
                    {buttonState && <button className='btn btn-warning' onClick={(e) => getRefund(e)}>
                        get Refund
                    </button>}
                    {!refundable && <p style={{color:"black"}}>Refund successful <FcApproval/></p>}
                </form>
            </div>
        </Fragment>
    )
}
