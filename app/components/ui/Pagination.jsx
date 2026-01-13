"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";



export default function Pagination({ totalPages, currentPage }) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="flex items-center gap-2 mt-6 mx-auto w-fit pb-20">
      
      <Link
        href={createPageUrl(currentPage - 1)}
        aria-disabled={currentPage === 1}
        className={`px-3 py-1 border rounded ${
          currentPage === 1 ? "pointer-events-none opacity-50" : "border border-blue-400 rounded-xl"
        }`}
      >
        Prev
      </Link>

      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={`px-3 py-1 border rounded ${
            page === currentPage ? "bg-blue-400 text-white" : "border border-blue-500 text-gray-600"
          }`}
        >
          {page}
        </Link>
      ))}

      
      <Link
        href={createPageUrl(currentPage + 1)}
        aria-disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded-xl border-blue-500 text-gray-600 ${
          currentPage === totalPages ? "pointer-events-none opacity-50" : ""
        }`}
      >
        Next
      </Link>
    </div>
  );
}
