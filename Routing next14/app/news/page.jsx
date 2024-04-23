//news page
import { DUMMY_NEWS } from "@/dummy-news";
import Link from "next/link";
import React from "react";

function NewsPage() {
  return (
    <>
      <h1>News Page</h1>
      <ul className="news-list">
        {DUMMY_NEWS.map((newsItem) => (
          <li key={newsItem.id}>
            <Link href={`/news/${newsItem.slug}`}> <img src={`/images/news/${newsItem.image}`} alt={newsItem.title}/> </Link>
            <span>{newsItem.title}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default NewsPage;
