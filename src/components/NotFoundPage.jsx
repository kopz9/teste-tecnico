import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <>
      <div>404 Not Found</div>
      <Link
        to="/"
        className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Home
      </Link>
    </>
  );
};
