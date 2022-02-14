/* auth 관련 action type */
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

interface stateType {
  isLogin: boolean;
  nickname: string;
}

const initialState = {
  // 초기 state 기본 값
  isLogin: false,
  nickname: "",
  errInfo: "",
};

const authReducer = (
  // reducer로 액션이 디스패치될 때 실행됨.
  state: stateType = initialState,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isLogin: true, nickname: action.payload };
    case LOGIN_FAILURE:
      return { ...state, isLogin: false, nickname: "" };
    case LOGOUT_SUCCESS:
      return { ...state, isLogin: false, nickname: "" };
    default:
      return state;
  }
};

export default authReducer; // reducer인 auth를 default로 export
