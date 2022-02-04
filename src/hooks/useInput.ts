import { SetStateAction, useState } from "react";

export default function useInput() {
  // input처럼 똑같은 기능이 여러번 필요하다면 커스텀 hooks로 만들자!
  const [inputValue, setInputValue] = useState("");
  const handleInputValue = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };
  return {
    inputValue: inputValue,
    setInputValue: setInputValue,
    handleInputValue: handleInputValue,
  };
}
