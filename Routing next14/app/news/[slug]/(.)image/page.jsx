//elfogo utvonal, a () elérési utvonala van jelenleg a képnek zárójel után maga a mappa név

import { DUMMY_NEWS } from "@/Dummy-news";

export default function InterCeptedImagePage({ params }) {
  const newsItemSlug = params.slug;
  const newsItem = DUMMY_NEWS.find(
    (newsItem) => newsItem.slug === newsItemSlug
  );

  if (!newsItem) {
    notFound();
  }
  return (
    <>
    <h2>Intercepted</h2>
      <div className="fullscreen-image">
        <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
      </div>
    </>
  );
}
