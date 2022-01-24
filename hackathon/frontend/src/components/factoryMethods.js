
import "regenerator-runtime/runtime.js";
import {ethers} from 'ethers'
import getCookie from './csrf'
import { useState } from 'react'


export const projectAddress = async (factory, abi, signer, state) => {
    const adrs = await factory.startProject(100, '500000000000000000', {value: 1250000000000000})
    const x = await factory.on('ProjectStarted', (address, proposer, deadline, price, events) => {
        // console.log(address, 'async works')
        const proj = new ethers.Contract(address, abi, signer)
        // console.log(proj, 'PROJ INIT')

        const db = fetch('/api/', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json', 
                'X-CSRFToken': getCookie('csrftoken')
            }, 
            body: JSON.stringify({
                "name": state.name, 
                "price": state.price, 
                "address": address,
                "description": state.description,

            })
            
        })
    });
    return address
    // console.log(adrs.events.ProjectStarted., 'EVENTEE')
    
};