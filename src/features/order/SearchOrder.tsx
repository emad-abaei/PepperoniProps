import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

function SearchOrder() {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!query) return;

    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='search-order' className='sr-only'>
        Search for an order
      </label>
      <input
        id='search-order'
        type='text'
        placeholder='Search order #'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='focus:ring-opacity-50 w-30 rounded-full bg-amber-200 px-4 py-2 text-sm transition-all duration-100 placeholder:text-stone-400 focus:ring focus:ring-amber-500 focus:outline-none sm:w-64 sm:focus:w-72'
      />
    </form>
  );
}

export default SearchOrder;
