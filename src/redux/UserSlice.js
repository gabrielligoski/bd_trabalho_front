import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: '',
        idItemCompra: ''
    },
    reducers: {
        getUserCpf: (state, action) => {
            state.userId = action.payload
        },
        getIdItemCompra: (state, action) => {
            state.idItemCompra = action.payload
        },
    },
})


// Action creators are generated for each case reducer function
export const {getUserCpf, getIdItemCompra} = userSlice.actions

export default userSlice.reducer
