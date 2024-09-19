import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <>
      <h1>404 Not found page</h1>
      <p>
        Please use this link to go <Link to="/">back home</Link>
      </p>
    </>
  );
}
