//news page

import { DUMMY_NEWS } from "@/Dummy-news";

function NewsPage() {
  return (
    <>
      <h1>News Page</h1>
        <NewsList news={DUMMY_NEWS}/>
    </>
  );
}

export default NewsPage;
