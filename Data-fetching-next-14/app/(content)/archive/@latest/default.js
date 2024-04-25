//default elnevezéssel a párhuzamos utvonalaknál a tartalék tartalom megjelenítését

import NewList from "@/components/NewList";
import { getLatestNews } from "@/lib/news";

export default async function LatestNewpage() {
  const latestNews = await getLatestNews();
  return (
    <>
      <h2>Latest News</h2>
      <NewList news={latestNews} />
    </>
  );
}
