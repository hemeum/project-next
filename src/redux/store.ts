import { createStore, combineReducers, applyMiddleware } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";

import authReducer from "./modules/auth"; // sub reducer인 authReducer
import { authLoginSaga } from "./sagas/loginSaga";
import { all, fork } from "redux-saga/effects";
import { authLoginKeepSaga } from "./sagas/loginKeepSaga";
import { authLogoutSaga } from "./sagas/logoutSaga";

const rootReducer = (state: any, action: any) => {
  // state는 현재 state, action으로 바뀔 data가 전달 됌
  switch (action.type) {
    case HYDRATE:
      // action.type인 HYDRATE일 때
      // 클라이언트 Side의 Redux Store와 서버 Side의 Redux Store를 합쳐줌
      // 왜냐? SSR인 경우 요청이 들어올 때마다 매번 html과 html에 입힐 data를 새로 렌더링하여 보내줌
      // 이때 Redux Store도 다시 생성이 되어, 서버가 클라이언트에게 보내고 Hydrate과정에서 서버 쪽 Store로 클라이언트 쪽 Store를 덮어 씀.
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({ authReducer });
      return combineReducer(state, action);
    }
  }
};
// sub reducer들을 combine한 rootReducer 생성

function* rootSaga() {
  yield all([
    fork(authLoginSaga),
    fork(authLoginKeepSaga),
    fork(authLogoutSaga),
  ]);
}

const store = (initState: any) => {
  const sagaMiddleware = createSagaMiddleware();

  const configStore = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return configStore;
}; // store 생성, rootReducer 인자로 주입.
// store 관련 설정을 해준 configureStore()를 withRedux에 넣어줘야 함. 그리고 configureStore()가 관련 설정을 가진 store를 return하면 my app에 store가 주입된다.

module.exports = store;
