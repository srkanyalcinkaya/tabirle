import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modal:false,
    data:null
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modal = true,
            state.data = action.payload
        },
        closeModal:(state)=>{
            state.modal = false,
            state.data = null
        }

    },

})


// Reducer ve actions export ediliyor
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;