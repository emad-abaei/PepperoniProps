import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import Button from "../../ui/Button";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!username) return;

    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='mb-4 text-sm text-stone-600 md:text-base'>
        Hello! We’d love to know your name to get started
      </p>

      <label htmlFor='username' className='sr-only'>
        Enter your full name
      </label>
      <input
        id='username'
        type='text'
        placeholder='Your full name'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='input mb-8 w-72'
        required
        autoFocus
      />

      {username !== "" && (
        <div>
          <Button>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
