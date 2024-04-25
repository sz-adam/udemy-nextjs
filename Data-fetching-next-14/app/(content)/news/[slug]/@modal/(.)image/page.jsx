//elfogo utvonal, a () elérési utvonala van jelenleg a képnek zárójel után maga a mappa név

import ModalBackdrop from "@/components/Modalbackdrop";
import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

export default async function InterceptedImagePage({ params }) {
  const newsItemSlug = params.slug;
  const newsItem = await getNewsItem(newsItemSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal">
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
