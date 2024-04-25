//news page
import NewList from "@/components/NewList";
import { getAllNews } from "@/lib/news";

async function NewsPage() {
const news = awaitgetAllNews()

  return (
    <>
      <h1>News Page</h1>
      <NewList news={news} />
    </>
  );
}

export default NewsPage;
