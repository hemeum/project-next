import { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor.css";
//toast-ui 3.0이 출시되면서 codemirror 의존성 제거됌.

function PostEditor({
  setContent,
  content,
}: {
  setContent: any;
  content: string;
}) {
  const editorRef: any = useRef();

  const handleEdit = () => {
    setContent(editorRef.current.getInstance().getMarkdown());
  };
  return (
    <Editor
      previewStyle="vertical"
      height="500px"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      placeholder="내용을 입력해주세요."
      onChange={handleEdit}
      ref={editorRef}
      initialValue={content}
    ></Editor>
  );
}
export default PostEditor;
