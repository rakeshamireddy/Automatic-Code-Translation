import { UPDATE_USER, UPDATE_USER_ERROR} from '../actions/types';

const initialState = {
    content: null,
    content_loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        // case GET_REST_PROFILE:
        case UPDATE_USER:
            return {
                ...state,
                content: payload,
                content_loading: false
            }
        case UPDATE_USER_ERROR:
            return {
                ...state,
                error: payload,
                content_loading: false
            };

        // case CLEAR_PROFILE:
        //     return {
        //         ...state,
        //         restprofile: null,
        //         loading: false
        //     }
        default:
            return state;
    }
}