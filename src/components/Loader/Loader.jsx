import SyncLoader from "react-spinners/SyncLoader";
import css from "./Loader.module.css";
export default function Loader() {
  return (
    <div className={css.loader}>
      <SyncLoader color="orangered" />
    </div>
  );
}