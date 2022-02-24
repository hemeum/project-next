import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import Router from "next/router";
import { useRouter } from "next/router";

function login(action: any) {
  const res: any = axios.post("/auth/login", {
    username: action.payload.username,
    password: action.payload.password,
  });
  return res;
}

function* loginSaga(action: any) {
  try {
    const res: { data: string } = yield call(login, action);
    yield put({ type: "auth/LOGIN_SUCCESS", payload: res.data });
    yield call(Router.back);
  } catch (err: any) {
    window.alert(err.response.data);
  }
}

export function* authLoginSaga() {
  yield takeEvery("LOGIN_REQUEST", loginSaga);
}
