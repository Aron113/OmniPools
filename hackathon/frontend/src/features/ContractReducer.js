import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {
    defaultAccount: null, 
    provider: null, 
    signer: null, 
    factory: null, 
    contract_abi: null, 
    project_abi: null

}

export const FactorySlice = createSlice({
    name:"factory", 
    initialState: {value: initialStateValue}, 
    reducers: {
        addFactory: (state, action) => {
            state.value = action.payload
        }, 

        // addLead: (state, action) => {
        //     state.value.lead = [...state.value.lead, action.payload]
        // }, 

        // removeLead: (state, action) => {
        //     state.value.lead = [state.value.lead.filter((ld) => ld.name !== action.payload)]
        }
    }, 
);

export const { addFactory }  = FactorySlice.actions;

export default FactorySlice.reducer;