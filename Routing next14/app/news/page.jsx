//news page

import { DUMMY_NEWS } from "@/Dummy-news";
import NewList from "@/components/NewList";

function NewsPage() {
  return (
    <>
      <h1>News Page</h1>
        <NewList news={DUMMY_NEWS}/>
    </>
  );
}

export default NewsPage;
