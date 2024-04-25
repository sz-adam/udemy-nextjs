//news page
"use client";
import NewList from "@/components/NewList";
import { useEffect, useState } from "react";

function NewsPage() {
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState();
  const [news, setNews] = useState();

  useEffect(() => {
    async function fetchNews() {
      setIsloading(true);
      const response = await fetch('http://localhost:8080/news');

      if (!response.ok) {
        setError("Error fetching news");
        setIsloading(false);
      }

      const news = await response.json();
      setIsloading(false);
      setNews(news);
    }
    fetchNews();
  }, []);

  if (isloading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  let newsContent;
  if (news) {
    newsContent = <NewList news={news} />;
  }

  return (
    <>
      <h1>News Page</h1>
      {newsContent}
    </>
  );
}

export default NewsPage;
