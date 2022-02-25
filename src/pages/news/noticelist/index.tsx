import List from "src/components/list/List";
import { useRouter } from "next/router";

export default function PageFreeList() {
  const router = useRouter();

  return <List ctg={router.query.ctg}></List>;
}
