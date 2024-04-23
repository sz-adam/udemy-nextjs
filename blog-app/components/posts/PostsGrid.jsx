import React from "react";
import classes from "./PostsGrid.module.css";
import PostItem from "./PostItem";

function PostsGrid(props) {
  const { posts } = props;
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post}/>
      ))}
    </ul>
  );
}

export default PostsGrid;
