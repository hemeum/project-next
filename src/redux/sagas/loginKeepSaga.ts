import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

function login() {
  const res: any = axios.get("/api/auth/keep_login", { withCredentials: true });
  return res;
}

function* loginSaga() {
  try {
    const res: { data: string } = yield call(login);
    yield put({ type: "auth/LOGIN_SUCCESS", payload: res.data });
  } catch (err: any) {
    console.log(err);
    yield put({ type: "auth/LOGIN_FAILURE" });
  }
}

export function* authLoginKeepSaga() {
  yield takeEvery("LOGIN_KEEP_REQUEST", loginSaga);
}
