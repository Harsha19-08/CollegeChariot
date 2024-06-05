

import React, { useState } from 'react';
import './Login.css'; 

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {

    if (username === 'demo' && password === 'demo') {
      onLogin(); // Notify the parent component about successful login
    } else {
      setError('Invalid credentials. Try again.');
    }
  };

  return (
    <div className="container1" id="container1">
      <div className="form-container1 sign-in1">
        <form>
          <h1>Sign In</h1>
          
          
          {/* <span>or use your email password</span> */}
          <input
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#">Forget Your Password?</a>
          <button onClick={handleLogin}>Sign In</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
      {}
      <div className="toggle-container1">
        <div className="toggle1">
          <div className="toggle-panel1 toggle-left1">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site features</p>
            {/* ... */}
          </div>
          <div class="toggle-panel1 toggle-right1">
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button class="hidden1" id="register1">Sign Up</button>
                </div>
          {}
        </div>
      </div>
    </div>
  );
};

export default Login;