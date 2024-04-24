//default elnevezéssel a párhuzamos utvonalaknál a tartalék tartalom megjelenítését 

import NewList from "@/components/NewList";
import { getLatestNews } from "@/lib/news";

export default function LatestNewpage() {
    const latestNews=getLatestNews()
  return (
    <>
      <h2>Latest News</h2>
      <NewList news={latestNews} />
    </>
  );
}
