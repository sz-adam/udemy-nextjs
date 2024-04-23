import { useRouter } from "next/router";

function BlogpostPage() {
    const router = useRouter();
    console.log(router.query);

  return (
    <div>BlogpostPage</div>
  )
}

export default BlogpostPage