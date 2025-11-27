import ContentDisplay from "@/componant/ContentDisplay";

export default async function contentPage({ params }) {
  const { contentId } = await params;

  return <ContentDisplay id={contentId} />;
}
