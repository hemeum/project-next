import axios from "axios";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import moment from "moment";
import { useSelector } from "react-redux";
import { debounce } from "lodash";

export default function Reply({
  postId,
  replyLength,
  setReplyLength,
  height,
  setHeight,
}: any) {
  const nickname = useSelector((state: any) => {
    return state.authReducer.nickname;
  });

  const [replys, setReplys] = useState([]);
  const [isEdit, setIsEdit] = useState<boolean[]>([]); // 수정 클릭하면 true
  const [editedReply, setEditedReply] = useState("");
  const [editToggle, setEditToggle] = useState(false); // toggle

  useEffect(() => {
    axios.post("/api/post/reply", { postId: postId }).then((res) => {
      setReplys(res.data);
      setReplyLength(res.data.length);
      const isEditArr = res.data.map(() => {
        return false;
      });
      setIsEdit(isEditArr);
    });
  }, [replyLength, postId, height, editToggle]);

  const handleEdit = (reply: string, index: number) => {
    const newIsEdit = isEdit.map(() => {
      return false;
    });
    newIsEdit.splice(index, 1, true);
    setIsEdit(newIsEdit);
    setEditedReply(reply);
  };

  const cancelEdit = () => {
    const newIsEdit = isEdit.map(() => {
      return false;
    });
    setIsEdit(newIsEdit);
  };

  const submitEdit = debounce((replyId) => {
    axios
      .post("/api/post/reply/edit", { replyId: replyId, reply: editedReply })
      .then(() => {
        const newIsEdit = isEdit.map(() => {
          return false;
        });
        setIsEdit(newIsEdit);
        setEditToggle(!editToggle);
      });
  }, 500);

  const handleDelete = (replyId: number) => {
    const yesDelete = confirm("정말 삭제하시겠습니까?");
    if (yesDelete) {
      axios.post("/api/post/reply/delete", {
        replyId: replyId,
        postId: postId,
      });
      setReplyLength(replyLength - 1);
      setHeight(height - 63); // 이 부분 다시 체크 필요
    }
  };

  const replyList = replys.map((reply: any, index: number) => {
    const date = moment(reply.date).format("YYYY년 M월 D일 HH:mm");
    return (
      <Chat key={reply.id}>
        <div>
          <img src="/img/logo-loa.png"></img>
        </div>
        <div>
          <div>
            <p>{reply.nickname}</p>
            <div>
              <p>{date}</p>
              {reply.nickname === nickname ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleEdit(reply.reply, index)}
                  >
                    수정
                  </button>
                  <button type="button" onClick={() => handleDelete(reply.id)}>
                    삭제
                  </button>
                </>
              ) : undefined}
            </div>
          </div>
          {isEdit[index] ? (
            <EditTextBox>
              <textarea
                placeholder="저작권 침해는 제한됩니다."
                value={editedReply}
                onChange={(e) => {
                  if (e.target.value.length > 200) {
                    return;
                  } else {
                    setEditedReply(e.target.value);
                  }
                }}
              ></textarea>
              <div>
                <p>{editedReply.length === 0 ? 0 : editedReply.length} / 200</p>
                <div>
                  <button type="button" onClick={cancelEdit}>
                    취소
                  </button>
                  <button type="button" onClick={() => submitEdit(reply.id)}>
                    등록
                  </button>
                </div>
              </div>
            </EditTextBox>
          ) : (
            <>
              <p>{reply.reply}</p>
            </>
          )}
        </div>
      </Chat>
    );
  });

  return <>{replyList}</>;
}

const Chat = styled.li`
  display: flex;
  align-items: flex-start;
  width: 980px;
  margin-top: 30px;
  padding-bottom: 15px;
  border-bottom: 0.5px solid lightgray;
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  > div {
    :nth-of-type(2) {
      width: 100%;
      > div:nth-of-type(1) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          button {
            font-weight: bold;
            color: gray;
            transition: all 0.5s;
            cursor: pointer;
            :hover {
              color: black;
            }
          }
          button:nth-of-type(1) {
            margin: 0 20px;
          }
        }
      }
      > p {
        margin-top: 5px;
      }
    }
  }
`;

const EditTextBox = styled.div`
  textarea {
    width: 930px;
    height: 100px;
    margin-top: 10px;
    padding: 15px;
    font-size: 16px;
    background-color: #f5f5f5;
    border: 1px solid lightgray;
    overflow-y: scroll;
    :focus {
      outline: none;
    }
  }
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 930px;
    height: 50px;
    padding: 20px;
    padding-right: 0;
    background-color: #f5f5f5;
    border: 1px solid lightgray;

    p {
      width: 730px;
    }

    div {
      display: flex;
      align-items: center;

      button {
        width: 150px;
        height: 50px;
        font-size: 17px;
        color: #333;
        border: 1px solid lightgray;
        background-color: #fff;
        :hover {
          color: #fff;
          background-color: black;
        }
        transition: all 0.2s;
        cursor: pointer;
        :last-child {
          border-left: none;
        }
      }
    }
  }
`;
