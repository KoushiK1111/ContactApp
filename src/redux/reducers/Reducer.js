const initialState = {},

    Reducer = (state = initialState, action) => {
        switch (action.type) {
            case 'ADD_CONTACT':
                return action.payload;
            case 'UPDATE_CONTACT':
                return action.payload;
            default:
                return state
        }
    }

export default Reducer