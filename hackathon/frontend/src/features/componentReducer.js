import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {
    listComponent: true, 
    detailComponent: false
}

export const componentSlice = createSlice({
    name:"component", 
    initialState: {value: initialStateValue}, 
    reducers: {
        toggleComponent: (state, action) => {
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

export const { toggleComponent }  = componentSlice.actions;

export default componentSlice.reducer;