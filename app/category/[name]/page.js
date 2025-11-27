import ContentDisplay from "@/componant/ContentDisplay";
import { getDocuments } from "@/lib/docs";
import { getDocumentsByCategory } from "@/utils/utils";

export default async function catagroyPage({ params }) {
  const { name } = await params;
  const docs = getDocuments();
  const matchDocs = getDocumentsByCategory(docs, name);

  return <ContentDisplay id={matchDocs[0].id} />;
}
