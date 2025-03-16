import { useRouteError } from "react-router";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError() as Response | Error;

  // Narrow down the error type
  if (error instanceof Response) {
    const status = error.status;
    const statusText = error.statusText;

    return (
      <div role='alert'>
        <h1>Something went wrong.</h1>
        <p>
          <strong>Status:</strong> {status} {statusText && `(${statusText})`}
        </p>
        <p>
          {status === 500
            ? "Internal Server Error. Please try again later."
            : "An error occurred. Check your internet connection or refresh the page."}
        </p>
        <LinkButton to='-1'>&larr; Go back</LinkButton>
      </div>
    );
  }

  // Handle generic Error objects
  if (error instanceof Error) {
    return (
      <div role='alert'>
        <h1>Something went wrong.</h1>
        <p>{error.message}</p>
        <LinkButton to='-1'>&larr; Go back</LinkButton>
      </div>
    );
  }

  // Handle unknown error types (fallback)
  return (
    <div role='alert'>
      <h1>Something went wrong.</h1>
      <p>An unknown error occurred.</p>
      <LinkButton to='-1'>&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
