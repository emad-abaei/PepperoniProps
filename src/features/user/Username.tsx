import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Username() {
  const username = useSelector((state: RootState) => state.user.username);

  if (!username) return null;

  return (
    <div className='hidden text-sm font-semibold text-stone-100 md:block'>
      Welcome, {username}
    </div>
  );
}

export default Username;
