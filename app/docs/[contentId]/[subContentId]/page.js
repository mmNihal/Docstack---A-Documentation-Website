import ContentDisplay from "@/componant/ContentDisplay";

export default async function subContentPage({ params }) {
  const { subContentId } = await params;
  return <ContentDisplay id={subContentId} />;
}
