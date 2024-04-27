"use client";

import { useOptimistic } from 'react';

import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { togglePostLikeStatus } from '@/actions/posts';

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? 'liked' : ''}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts, updatedPostId) => {
  // Megkeressük a frissített bejegyzés indexét az előző bejegyzéseket tartalmazó tömbben a megadott updatedPostId alapján.
  const updatedPostIndex = prevPosts.findIndex(post => post.id === updatedPostId);

  // Ha nem találjuk meg a frissített bejegyzést, visszatérünk az előző bejegyzéseket tartalmazó tömbbel.
  if (updatedPostIndex === -1) {
    return prevPosts;
  }

  // Létrehozunk egy másolatot a frissített bejegyzés objektumáról.
  const updatedPost = { ...prevPosts[updatedPostIndex] };
  // Frissítjük a 'likes' számlálót attól függően, hogy korábban kedvelték-e a bejegyzést vagy sem.
  updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
  // Kicseréljük a bejegyzés 'isLiked' állapotát.
  updatedPost.isLiked = !updatedPost.isLiked;
  // Létrehozunk egy új tömböt az előző bejegyzéseket tartalmazó tömb alapján.
  const newPosts = [...prevPosts];
  // Kicseréljük az új tömbben az előző bejegyzést az aktualizált bejegyzésre.
  newPosts[updatedPostIndex] = updatedPost;
  return newPosts;
})

// Ha nincsenek bejegyzések, vagy üres a tömb, megjelenítünk egy üzenetet.
if (!optimisticPosts || optimisticPosts.length === 0) {
  return <p>There are no posts yet. Maybe start sharing some?</p>;
}

async function updatePost(postId) {
  // Frissítjük az 'optimisticPosts' állapotot 
  updateOptimisticPosts(postId);
  await togglePostLikeStatus(postId);
}

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}