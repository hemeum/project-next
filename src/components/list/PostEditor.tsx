import { useEffect, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import { useRouter } from "next/router";

import "@toast-ui/editor/dist/toastui-editor.css";
//toast-ui 3.0이 출시되면서 codemirror 의존성 제거됌.

function PostEditor({
  setContent,
  content,
}: {
  setContent: (value: string) => void;
  content: string;
}) {
  const editorRef: any = useRef();

  const handleEdit = () => {
    setContent(editorRef.current.getInstance().getMarkdown());
  };

  useEffect(() => {
    setContent(String(value));
  }, []);

  const router = useRouter();
  const value = router.query.value ? router.query.value : "";
  return (
    <Editor
      previewStyle="vertical"
      height="500px"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      placeholder="내용을 입력해주세요."
      onChange={handleEdit}
      ref={editorRef}
      initialValue={String(value)}
    ></Editor>
  );
}
export default PostEditor;
