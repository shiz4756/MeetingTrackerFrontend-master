import { Action } from "./actions";


const initialState = {
    positions: [],
    candidates: [],
    departments: [],
    locations: [],
    currentSchedule: {},
    currentCandidacy: {},
    participants: [],
    users: [],
    currentUser: null,
    messages: [],
    isViewingMessages: false,
    showUnseenMessagesNotifier: false,
    possibleRecipients: []
};

function reducer(state = initialState, action){
    switch (action.type) {
        case Action.LogIn:
            console.log(action.payload);
            return{
                ...state,
                currentUser: {id: action.payload.id, role: action.payload.role, email: action.payload.email}
            }
        case Action.LogOut:
            return initialState;

        default:
            return {...state}
    }
}

export default reducer;