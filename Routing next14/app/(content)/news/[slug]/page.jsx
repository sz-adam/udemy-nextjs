//... id page
import { DUMMY_NEWS } from "@/Dummy-news";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

function NewsDetailPage({ params }) {
  const newsSlug = params.slug;
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsSlug);

  if (!newsItem) {
    notFound();
  }
  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${newsItem.slug}/image`}>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </Link>
        <h1>{newsItem?.title}</h1>
        <time dateTime={newsItem?.data}>{newsItem?.date}</time>
      </header>
      <p>{newsItem?.content}</p>
    </article>
  );
}

export default NewsDetailPage;
