import ContentDisplay from "@/componant/ContentDisplay";
import { getDocuments } from "@/lib/docs";
import { getDocumentsByTag } from "@/utils/utils";

export default async function tagsPage({ params }) {
  const { name } = await params;

  const docs = getDocuments();
  const matchDocs = getDocumentsByTag(docs, name);

  return <ContentDisplay id={matchDocs[0].id} />;
}
