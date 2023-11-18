import { createStore } from 'redux';
const initialState = {
    selectedVariation: null,
  };
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_INDEX':
            return { ...state, selectedVariation: action.payload };
        default:
            return state;
    }
}
const store = createStore(rootReducer);
export default store;