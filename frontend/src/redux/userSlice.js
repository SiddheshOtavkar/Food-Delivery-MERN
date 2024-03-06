import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    firstName: "",
    image: "",
    lastName: "",
    _id: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            // const { _id, firstName, lastName, email, image } = action.payload.user;
            // return {
            //     ...state,
            //     _id,
            //     firstName,
            //     lastName,
            //     email,
            //     image
            // };
            state._id = action.payload.user._id;
            state.firstName = action.payload.user.firstName;
            state.lastName = action.payload.user.lastName;
            state.email = action.payload.user.email;
            state.image = action.payload.user.image;
        },
        logoutRedux: (state, action) => {
            state._id = "";
            state.firstName = "";
            state.lastName = "";
            state.email = "";
            state.image = "";
        },
    }
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;