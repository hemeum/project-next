import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

function logout() {
  const res: any = axios.get("/auth/logout");
  return res;
}

function* logoutSaga() {
  try {
    const res: { data: string } = yield call(logout);
    yield put({ type: "auth/LOGOUT_SUCCESS" });
  } catch (err: any) {
    window.alert(err.response.data);
  }
}

export function* authLogoutSaga() {
  yield takeEvery("LOGOUT_REQUEST", logoutSaga);
}
