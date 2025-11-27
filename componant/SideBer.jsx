"use client";

import {
  getDocumentsByAuthor,
  getDocumentsByCategory,
  getDocumentsByTag,
} from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SideBer({ docs }) {
  const pathName = usePathname();

  const [rootNodes, setRootNodes] = useState([]);
  const [noneRootNodes, setNoneRootsNodes] = useState({});

  useEffect(() => {
    let matchDocs = docs;

    if (pathName.includes("tags")) {
      const tags = pathName.split("/")[2];

      matchDocs = getDocumentsByTag(docs, tags);
    } else if (pathName.includes("author")) {
      const author = pathName.split("/")[2];

      matchDocs = getDocumentsByAuthor(docs, author);
    } else if (pathName.includes("category")) {
      const categroy = pathName.split("/")[2];
      matchDocs = getDocumentsByCategory(docs, categroy);
    }

    const roots = matchDocs.filter((doc) => !doc.parent);

    const parent = matchDocs.filter((doc) => doc.parent);

    const groupByRoot = Object.groupBy(parent, ({ parent }) => parent);

    const noneRootKeys = Reflect.ownKeys(groupByRoot);

    noneRootKeys.forEach((key) => {
      const founRoots = roots.find((root) => root.id === key);
      if (!founRoots) {
        const findDocs = docs.find((doc) => doc.id === key);
        roots.push(findDocs);
      }
    });

    roots.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    setRootNodes([...roots]);
    setNoneRootsNodes({ ...groupByRoot });
  }, [pathName]);

  return (
    <nav className="hidden lg:mt-10 lg:block">
      <ul role="list" className="border-l border-transparent">
        {rootNodes.map((root) => (
          <li key={root.id} className="relative">
            <Link
              aria-current="page"
              className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
              href={`/docs/${root.id}`}
            >
              <span className="truncate">{root.title}</span>
            </Link>
            {noneRootNodes[root.id] && (
              <>
                <ul role="list" className="border-l border-transparent">
                  {noneRootNodes[root.id].map((subRoot) => (
                    <li key={subRoot.id} className="relative">
                      <Link
                        aria-current="page"
                        className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-900 transition dark:text-white"
                        href={`/docs/${root.id}/${subRoot.id}`}
                      >
                        <span className="truncate">{subRoot.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
