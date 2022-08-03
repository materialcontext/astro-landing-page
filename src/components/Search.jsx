import { useEffect, useState } from "react";
import lunr from "lunr";
const { Index } = lunr;

import docs from "../data/search-results.json";
import index from "../data/search-index.json";

const ResultCards = (props) => {
  return (
    <div>
      {props.results.map((result, idx) => {
        return (
          <div key={idx} className="result-card" onClick="">
            <h3>
              <a className="hover:underline" href={"/posts/" + result.slug}>{result.title}</a>
            </h3>
            <p>{result.content}</p>
            <div className="mt-6">
              {result.tags.map((tag, index) => {
                return (
                  <a
                    key={index}
                    href={`/search?q=${tag}`}
                    className="neueHaas rounded-md text-[#3864c5] border-[1px] border-[#3864c5] px-1 mr-3 hover:bg-[#3864c5] hover:text-[#f4f4f4]"
                  >
                    {tag}
                  </a>
                );
              })}
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
    setResults(
      lunrIndex.search(searchTerm).map(({ ref }) => {
        return { slug: ref, ...docs[ref] };
      })
    );
  }, []);

  return <ResultCards results={results} />;
}
