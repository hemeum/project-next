/* auth 관련 action type */
const LOGIN = "auth/LOGIN";
const LOGOUT = "auth/LOGOUT";

interface stateType {
  isLogin: boolean;
  nickname: string;
}

const initialState = {
  // 초기 state 기본 값
  isLogin: false,
  nickname: "",
};

const auth = (
  // reducer로 액션이 디스패치될 때 실행됨.
  state: stateType = initialState,
  action: { type: string; data: any },
) => {
  switch (action.type) {
    case LOGIN:
      return { ...state };
    case LOGOUT:
      return { ...state };
    default:
      return state;
  }
};

export default auth; // reducer인 auth를 default로 export
