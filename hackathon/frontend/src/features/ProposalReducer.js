import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {
    proposals: []
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
        }
        // addLead: (state, action) => {
        //     state.value.lead = [...state.value.lead, action.payload]
        // }, 

        // removeLead: (state, action) => {
        //     state.value.lead = [state.value.lead.filter((ld) => ld.name !== action.payload)]
        }
    }, 
);

export const { addProposal, updateProposals }  = ProposalSlice.actions;

export default ProposalSlice.reducer;