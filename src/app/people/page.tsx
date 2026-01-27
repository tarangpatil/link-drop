"use client";
import { User } from "@/generated/client";
import { FormEvent, useState } from "react";
import SearchResult from "./SearchResult";

export default function People() {
  const [results, setResults] = useState<User[]>([]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`/api/query/user?q=${e.currentTarget["query"].value}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch(console.error);
  }

  return (
    <main className="container my-4">
      <h3 className="mb-4">
        Find your drop-buddy <i className="bi bi-eyedropper"></i>
      </h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            name="query"
            placeholder="Find your buddy"
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-search-heart"></i>
            <span className="mx-1">Search</span>
          </button>
        </div>
      </form>
      {results.length ? (
        <ul className="list-group">
          {results.map((user, idx) => (
            <SearchResult user={user} key={idx} />
          ))}
        </ul>
      ) : (
        <></>
      )}
    </main>
  );
}
