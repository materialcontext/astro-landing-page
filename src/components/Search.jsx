import {useEffect, useState} from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    let searchTerm = new URLSearchParams(window.location.search).get('q') || 'err';
    console.log(searchTerm);
    setQuery(searchTerm);
  }, []);

  return (
    <div>
      {query}
    </div>
  );
}