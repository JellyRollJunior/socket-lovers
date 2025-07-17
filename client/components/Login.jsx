import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error('response not ok!');
      }
      localStorage.setItem('token', json.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          minLength={1}
          maxLength={36}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={1}
          maxLength={36}
          required
        />
        <button>Login</button>
      </form>
    </>
  );
};

export { Login };
