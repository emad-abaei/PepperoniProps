import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import { RootState } from "../store";
import Button from "./Button";

function Home() {
  const username = useSelector((state: RootState) => state.user.username);

  return (
    <div className='my-10 text-center sm:my-16'>
      <h1 className='mb-8 text-xl font-semibold md:text-3xl'>
        The Best Pizza Experience Awaits!
        <br />
        <span className='text-amber-400 md:text-2xl' aria-hidden='true'>
          Fresh Ingredients, Fast Delivery!!
        </span>
      </h1>
      {!username && <CreateUser />}
      {username && (
        <Button to='/menu' ariaLabel={`Continue ordering, ${username}`}>
          Continue ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
