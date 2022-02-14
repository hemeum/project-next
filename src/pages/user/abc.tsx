import Abc from "src/components/login/Abc";
import { wrapper } from "../_app";

function abcLogin(props: any) {
  console.log(props);
  return (
    <>
      <Abc></Abc>
      <div></div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store: any): any =>
    async () => {
      console.log(store.getState());
      return { props: { a: 1 } };
    },
);

export default abcLogin;
