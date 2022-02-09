import { createStore, combineReducers } from "redux";
const auth = require("./modules/auth"); // auth라는 sub reducer

const rootReducer = combineReducers({ auth }); // sub reducer들을 combine한 rootReducer 생성

const store = createStore(rootReducer); // store 생성, rootReducer 인자로 주입.

console.log(store, rootReducer, store.getState());
