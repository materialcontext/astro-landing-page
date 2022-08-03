import { useEffect, useState } from "react";
import { Index } from "lunr";

import docs from "../data/search-results.json";
import index from "../data/search-index.json";

const ResultCards = (props) => {
  return (
  <div>
    {props.results.map((result, idx) => {
      return <div key={idx} className="result-card" onClick="">
        <h3><a href={'/posts/' + result.slug}>{result.title}</a></h3>
        <p>{result.content}</p>
      </div>
    })}
  </div>);
};

export default function SearchBar() {
  const [lunrIndex, setLunrIndex] = useState(Index.load(index));
  const [results, setResults] = useState([]);

  useEffect(() => {
    let searchTerm =
      new URLSearchParams(window.location.search).get("q") || "err";
      setResults(lunrIndex.search(searchTerm).map(({ ref }) => {
        return { slug: ref, ...docs[ref] };
      })
    );
  }, []);

  return (
    <ResultCards results={results} />
  );
}
