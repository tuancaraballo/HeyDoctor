import {combineReducers} from 'redux'


const doctorsReducer = (state=[], action) => {
    switch (action.type){
        case 'FETCH_DOCTORS':
            return action.payload;
        default:
            return state;
    }
};

const fetchAppsReducers = (state={}, action) => {
    switch (action.type){
        case 'FETCH_APPOINTMENTS':
            let {doctorId, appointments} = action.payload;
            return Object.assign({}, state, {[doctorId]:appointments});
        default:
            return state;
    } ;
}



const rootReducer = combineReducers({
    doctorsReducer,
    fetchAppsReducers
});

export default rootReducer;
