// import { useSearchParams } from "react-router-dom";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const query = e.target.elements.query.value;
    onSearch(query.trim());

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input type="text" name="query" className={css.search} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
