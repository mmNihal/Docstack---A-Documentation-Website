import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const pathDeractor = path.join(process.cwd(), "docs");

export function getDocuments() {
  const fileNames = fs.readdirSync(pathDeractor);

  const allDocuments = fileNames.map((fileName) => {
    const id = fileName.replace(".md", "");

    const fullPath = path.join(pathDeractor, fileName);

    const fileContent = fs.readFileSync(fullPath, "utf-8");

    const matterData = matter(fileContent);
    return {
      id,
      ...matterData.data,
    };
  });

  return allDocuments.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  });
}

export const getDocumentHtml = async (id) => {
  const fullPath = path.join(pathDeractor, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const matterData = matter(fileContent);

  const prossesResults = await remark().use(html).process(matterData.content);
  const porsesedHtml = prossesResults.toString();
  return {
    id,
    porsesedHtml,
    ...matterData.data,
  };
};
