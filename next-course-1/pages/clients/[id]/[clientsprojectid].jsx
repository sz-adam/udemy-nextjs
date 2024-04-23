import { useRouter } from "next/router";

function SelectedClientProjectPage() {
  const router = useRouter();
  console.log(router.query);
  return <div>the projected page</div>;
}

export default SelectedClientProjectPage;
