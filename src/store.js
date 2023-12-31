import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import productReducer from "./reducers/productReducer.js";
import { composeWithDevTools } from "redux-devtools-extension";


const store = createStore(productReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

