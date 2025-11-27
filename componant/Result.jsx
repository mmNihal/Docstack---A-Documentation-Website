import Link from "next/link";

export default function Results({ value, searchInput, closeResults }) {
  return (
    <div
      className="absolute left-0 top-12 z-[999] w-full
     rounded-md bg-white p-4 shadow"
    >
      <p className="!text-lg">
        Showing results for
        <span className="font-semibold">&quot;{searchInput}&quot;</span>
      </p>
      <ul role="list" className="divide-y divide-gray-100 [&>*]:py-2">
        {value.map((value) => (
          <li className="" key={value.title}>
            <Link
              className="transition-all hover:text-emerald-600"
              href={`/docs/${value.title}`}
              onClick={(e) => closeResults(e)}
            >
              {value.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
