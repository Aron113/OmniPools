import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {
    proposals: [], 
    current: {
        name: '', 
        description: '', 
        address: '', 
        image: '', 
        created_at: '', 
        price: '', 

    }
}

export const ProposalSlice = createSlice({
    name:"proposals", 
    initialState: {value: initialStateValue}, 
    reducers: {
        addProposal: (state, action) => {
            state.value.proposals = [...state.value.proposals, action.payload]
        }, 
        
        updateProposals: (state, action) => {
            state.value.proposals = [...state.value.proposals, action.payload]
        }, 

        currentProposal: (state, action) => {
            state.value.current = Object.assign({}, state.value.current, action.payload)
        }
        // addLead: (state, action) => {
        //     state.value.lead = [...state.value.lead, action.payload]
        // }, 

        // removeLead: (state, action) => {
        //     state.value.lead = [state.value.lead.filter((ld) => ld.name !== action.payload)]
        }
    }, 
);

export const { addProposal, updateProposals, currentProposal }  = ProposalSlice.actions;

export default ProposalSlice.reducer;