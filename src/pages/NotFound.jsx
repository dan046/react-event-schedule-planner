import { useNavigate, useRouteError } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  let error = useRouteError();
  console.error(error);
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <h1
        className={`text-4xl font-bold ${
          error.status === 404 ? "text-red-500" : "text-yellow-500"
        }`}
      >
        {error.status === 404 ? "404" : "Error"}
      </h1>
      <p className="text-2xl">
        {error.status === 404 ? "Page not found" : "An error occurred"}
      </p>
      <button
        onClick={() => navigate("/")}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
