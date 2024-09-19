import { useSearchParams } from "react-router-dom";
import css from "./SearchForm.module.css";

export default function SearchForm() {
  const [params, setParams] = useSearchParams();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    params.set("query", evt.target.elements.query.value);
    setParams(params);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={css.form}>
        <input className={css.input} type="text" name="query" />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </>
  );
}
