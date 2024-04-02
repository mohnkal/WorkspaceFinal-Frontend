import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userFetched:0
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser(state, action) {
            state.user = action.payload;
            state.user.email = action.payload.email;
            state.profilePicture = action.payload.phototURL;
        },
        clearUser(state, action){
            state.user = false
        },
        
    },
});

export const {addUser, clearUser} = userSlice.actions;
export default userSlice.reducer;