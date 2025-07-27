import { useState } from 'react';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (event) => {
    event.preventDefault();
    console.log('you signed up!');
  };

  return (
    <form
      className="max-w-2xs mt-5 flex w-full flex-col"
      onSubmit={handleSignup}
    >
      <h2 className="text-center font-bold text-gray-500">
        Sign up to chat with all your fellow chiikawa lovers
      </h2>
      <input
        className="border-1 mt-4 h-11 w-full rounded-md border-gray-400 bg-gray-200 pl-1.5"
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        minLength={1}
        maxLength={36}
        placeholder="Username"
        required
      />
      <input
        className="border-1 mt-3 h-11 w-full rounded-md border-gray-400 bg-gray-200 pl-1.5"
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        minLength={1}
        maxLength={36}
        placeholder="Password"
        required
      />
      <input
        className="border-1 mt-3 h-11 w-full rounded-md border-gray-400 bg-gray-200 pl-1.5"
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        minLength={1}
        maxLength={36}
        placeholder="Confirm password"
        required
      />
      <div className="mt-8">
        <button className="w-full rounded-xl bg-blue-400 px-5 py-2 text-white hover:bg-blue-500">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export { SignupForm };
