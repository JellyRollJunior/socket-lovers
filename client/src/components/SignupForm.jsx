import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { signup } from '../services/authApi.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const SignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toastTemp } = useContext(ToastContext);

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password != confirmPassword) return toastTemp('Passwords must match', true);
    try {
      await signup(username, password);
      navigate('/login');
    } catch(error) {
      toastTemp(error.message);
      console.log(error);
    }
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
        minLength={6}
        maxLength={24}
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
        minLength={6}
        maxLength={24}
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
        minLength={6}
        maxLength={24}
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
