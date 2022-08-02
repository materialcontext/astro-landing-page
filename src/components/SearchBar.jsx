import {useEffect, useState} from 'react';

export default function SearchBar() {
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('search', search);
  }, [search]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
}