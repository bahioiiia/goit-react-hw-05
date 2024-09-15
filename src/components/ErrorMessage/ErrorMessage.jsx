import css from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <p className={css.errorText}>
      Whoops, something went wrong! Try again later!
    </p>
  );
};

export default ErrorMessage;
