import React, { Component, Fragment } from 'react';
import { useSelector } from 'react-redux'


export function getContractInformation() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          //Create instance of the prop
        })
      }, 1500)
    })
  }


function getContractInformation() {
    const initFields = useSelector((state) => state.factory.values)
    const factory = initFields.factory
    console.log(factory)
    factory.startProject()
}



