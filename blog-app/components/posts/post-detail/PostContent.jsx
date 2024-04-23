import ReactMarkdown from "react-markdown";
import PostHeader from "./PostHeader";
import classes from "./PostContent.module.css";
import Image from "next/image";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"

function PostContent(props) {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    img: (image) => {
      return (
        <Image
          src={`/images/posts/${post.slug}/${image.src}`}
          alt={image.alt}
          width={600}
          height={300}
        />
      );
    },
    p: (paragraph) => {
      const { node } = paragraph;
      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
    code(code) {
      const _array = code.className.split("-");
      const _language = _array[1];
 
      return (
        <SyntaxHighlighter language={_language} style={atomDark}>
          {code.children[0]}
        </SyntaxHighlighter>
      );
},
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
