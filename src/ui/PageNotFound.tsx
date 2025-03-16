import Button from "./Button";
import PizzaImage from "./PizzaImage";

function PageNotFound() {
  return (
    <div className='flex flex-col items-center'>
      <div className='mt-2 flex items-center space-x-1 px-4 py-6 sm:mt-6'>
        <span className='text-8xl text-amber-400'>4</span>
        <PizzaImage className='max-w-[90px]' color='amber' aria-hidden='true' />
        <span className='text-8xl text-amber-400'>4</span>
      </div>
      <h1 className='mb-10 text-center text-4xl text-stone-500'>
        Page Not Found
      </h1>
      <Button to='/' ariaLabel='Go to home page'>
        go to home
      </Button>
    </div>
  );
}

export default PageNotFound;
