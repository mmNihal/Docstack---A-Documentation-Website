import { getDocumentHtml } from "@/lib/docs";
import Link from "next/link";
import Tag from "./Tags";

export default async function ContentDisplay({ id }) {
  const getContent = await getDocumentHtml(id);
  console.log(getContent.author);

  return (
    <article className="prose dark:prose-invert">
      <h1>{getContent.title}</h1>
      <span>publis on: {getContent.date}</span>{" "}
      <Link className="text-green-500" href={`/author/${getContent.author}`}>
        {getContent.author}
      </Link>
      {""} uder the{" "}
      <Link
        className="text-green-500"
        href={`/category/${getContent.category}`}
      >
        {getContent.category}
      </Link>
      <div>
        {getContent.tags &&
          getContent.tags.map((tag) => <Tag key={tag} tag={tag} />)}
      </div>
      <div
        className="lead"
        dangerouslySetInnerHTML={{ __html: getContent.porsesedHtml }}
      />
    </article>
  );
}
