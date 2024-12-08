import { createSlice } from '@reduxjs/toolkit'

interface AppState {
    interpretation: any[];
    name?: string;
    surname?: string;
    credit?: number;
    email?: string;
    token?: string;
    user_id?: string;
    language: string;
    isLogged: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    isCompletedWelcome: boolean;
    date_of_birth: string;
    birth_of_time: string;
    gender: "male" | "female" | "other";
    relationship_status: "in-relationship" | 'single' | 'married' | 'engaged';
    zodiacSign: string | undefined;
    ascendantSign: string | undefined;
    zodiac_features: any;
}

const initialState: AppState = {
    interpretation: [],
    name: undefined,
    surname: undefined,
    credit: undefined,
    email: undefined,
    token: undefined,
    user_id: undefined,
    language: "tr-TR",
    isLogged: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    isCompletedWelcome: false,
    date_of_birth: new Date().toISOString(),
    birth_of_time: new Date().toISOString(),
    gender: 'male',
    relationship_status: 'in-relationship',
    zodiacSign: undefined,
    ascendantSign: undefined,
    zodiac_features: null,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setState: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
        setAdd: (state, action) => {
            state.interpretation.push(action.payload);
        },
        logout: () => initialState,

    },

})

export const { setState, setAdd, logout } = appSlice.actions;
export default appSlice.reducer;