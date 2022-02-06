
import "regenerator-runtime/runtime.js";
import {ethers} from 'ethers'
import getCookie from './csrf'
import { useState } from 'react'


export const projectAddress = async (factory, abi, signer, state) => {
    const adrs = await factory.startProject(100, '500000000000000000', {value: 1250000000000000})
    const res = await bar(factory, state, abi, signer) //to resolve event listener, use Promise, Resolve
    
    console.log(res, 'returning X')
    return res
    // console.log(adrs.events.ProjectStarted., 'EVENTEE')
};


    

function bar(factory, state, abi, signer) {
    return new Promise(function (resolve) {
        factory.on('ProjectStarted', (address, proposer, deadline, price, events) => {
            // console.log(address, 'async works')
            const proj = new ethers.Contract(address, abi, signer)
            // console.log(proj, 'PROJ INIT')
            console.log(state.image, 'image before sending  ')
            let form_data = new FormData();
            form_data.append('image', state.image, state.image.name)
            form_data.append('name', state.name)
            form_data.append('price', state.price)
            form_data.append('description', state.description)
            form_data.append('address', state.address)
        
            const db = fetch('/api/', {
                method: 'POST', 
                headers: {
                    // 'Accept': 'application/json', 
                    // 'Content-Type': 'application/json', 
                    'X-CSRFToken': getCookie('csrftoken')
                }, 
                body: form_data
                
            }).then(data => console.log(data), 'post req')
            console.log('finish paying')
            resolve(address)
        });
    });
};