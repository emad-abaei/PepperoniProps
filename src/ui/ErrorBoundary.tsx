import { FallbackProps } from "react-error-boundary";
import Button from "./Button";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      className='flex flex-col items-center justify-center px-4 py-6 sm:mt-6'
      role='alert'
      aria-live='assertive'>
      <h2 className='text-xl font-semibold text-red-500'>
        Something went wrong!
      </h2>
      <p className='mb-10 text-gray-600'>{error.message}</p>
      <Button onClick={resetErrorBoundary} ariaLabel='Try again'>
        Try Again
      </Button>
    </div>
  );
}

export default ErrorFallback;
