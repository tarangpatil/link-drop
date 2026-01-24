"use client";
import { User } from "@/generated/client";
import { FormEvent, useState } from "react";

export default function People() {
  const [results, setResults] = useState<User[]>([]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`/api/user/query?q=${e.currentTarget["query"].value}`)
      .then((res) => res.json())
      .then((data) => setResults(data));
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
          {results.map((result, idx) => (
            <li className="list-group-item" key={idx}>
              <p className="my-0 d-flex justify-content-between align-items-center">
                {result.name}
                <span>
                  <button className="mx-1 btn btn-outline-secondary">
                    <i className="bi bi-send"></i> Invite
                  </button>
                </span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </main>
  );
}
