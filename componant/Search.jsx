"use client";

import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Results from "./Result";

export default function Search({ docs }) {
  const [searchValue, setSearchValue] = useState([]);
  const [serchInput, setSearchInput] = useState("");
  const router = useRouter();

  function handleChange(e) {
    setSearchInput(e.target.value);
    doSearch(e.target.value);
  }

  const doSearch = useDebounce((serchInput) => {
    const found = docs.filter((docs) => {
      return docs.title.toLowerCase().includes(serchInput.toLowerCase());
    });
    console.log(found);

    setSearchValue(found);
  }, 300);

  const closeResults = (e) => {
    e.preventdefault();
    router.push(e.target.href);
    serchInput("");
  };

  return (
    <>
      <div className="lg:block lg:max-w-md lg:flex-auto">
        <button
          type="button"
          className="focus:[&amp;:not(:focus-visible)]:outline-none hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex"
        >
          <Image
            src="/search.svg"
            alt="Search"
            className="h-5 w-5"
            width={50}
            height={50}
          />
          <input
            type="text"
            value={serchInput}
            placeholder="Search..."
            onChange={handleChange}
            className="flex-1 focus:border-none focus:outline-none"
          />
        </button>
        {serchInput && serchInput.trim().length > 0 && (
          <Results
            value={searchValue}
            searchInput={serchInput}
            closeResults={closeResults}
          />
        )}
      </div>
    </>
  );
}
