import { useEffect, useState } from "react";
import lunr from "lunr";
const { Index } = lunr;

import Tags from "./Tags.astro";

import docs from "../data/search-results.json";
import index from "../data/search-index.json";

const ResultCards = (props) => {
  if (props.results === "no results") {
    return (
      <div className="no-results">
        <h2>No results found</h2>
        <p>Try searching for something else.</p>
      </div>
    );
  }
  return (
    <div>
      {props.results.map((result, idx) => {
        return (
          <div key={idx} className="result-card">
            <h3>
              <a className="hover:underline" href={"/posts/" + result.slug}>
                {result.title}
              </a>
            </h3>
            <p>{result.content}</p>
            <div className="mt-6">
              {result.tags.map((tag, index) => (
                <a key={index} href={`/search/?q=${tag}`} className="tag">
                  {" "}
                  {tag}{" "}
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function SearchBar() {
  const [lunrIndex, setLunrIndex] = useState(Index.load(index));
  const [results, setResults] = useState([]);

  useEffect(() => {
    let searchTerm =
      new URLSearchParams(window.location.search).get("q") || "err";
    let searchResults = lunrIndex.search(searchTerm);
    if (searchResults.length > 0) {
      setResults(
        searchResults.map(({ ref }) => {
          return { slug: ref, ...docs[ref] };
        })
      );
    } else {setResults("no results")}
  }, []);

  return <ResultCards results={results} />;
}
