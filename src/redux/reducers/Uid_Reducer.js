const initialState = {
    uid: ''
},

    Uid_Reducer = (state = initialState, action) => {
        switch (action.type) {
            case 'UID':
                return { ...state, uid: action.payload }
            default:
                return state
        }
    }

export default Uid_Reducer