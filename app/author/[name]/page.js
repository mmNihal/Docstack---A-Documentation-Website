import ContentDisplay from "@/componant/ContentDisplay";
import { getDocuments } from "@/lib/docs";
import { getDocumentsByAuthor } from "@/utils/utils";

export default async function authorPage({ params }) {
  const { name } = await params;

  const docs = getDocuments();
  const matchDocs = getDocumentsByAuthor(docs, name);

  return <ContentDisplay id={matchDocs[0].id} />;
}
