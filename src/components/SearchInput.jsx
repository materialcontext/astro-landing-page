import { useState, useEffect } from "react";

export default function SearchInput() {
  const [value, setValue] = useState("");

  useEffect(() => {
    let searchTerm =
      new URLSearchParams(window.location.search).get("q");
    setValue(searchTerm);
  }, []);

  return (
    <form className="neueHaas" action="/search/" method="get">
      <input
        className="searchField"
        type="text"
        name="q"
        value={value}
        placeholder="Search..."
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={(e) => {
          setValue("Search...");
        }}
      />
      <button className="searchButton" type="submit">
        Search
      </button>
    </form>
  );
}
