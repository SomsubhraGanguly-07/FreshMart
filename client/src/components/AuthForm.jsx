import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setUser, setshowUserLogin } = useAppContext();

  // Dummy user state for demonstration
  const [dummyUser, setDummyUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Dummy login logic
      if (
        dummyUser &&
        email === dummyUser.email &&
        password === dummyUser.password
      ) {
        setUser({ name: dummyUser.name, email: dummyUser.email });
        setshowUserLogin(false);
        alert("Logged in as " + dummyUser.name);
      } else {
        alert("Invalid credentials or no user registered.");
      }
    } else {
      // Dummy register logic
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      setDummyUser({ name, email, password });
      alert("Registration successful! Now login with your credentials.");
      setIsLogin(true);
    }
  };

    return (
    <form
      onSubmit={handleSubmit}
      className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
    >
      <h1 className="text-gray-900 text-3xl mt-10 font-medium">
        {isLogin ? 'Login' : 'Register'}
      </h1>
      <p className="text-gray-500 text-sm mt-2">
        {isLogin ? 'Please sign in to continue' : 'Create your account'}
      </p>

      {/* Name Field (Register only) */}
      {!isLogin && (
        <div className={`flex items-center w-full ${isLogin ? 'mt-10' : 'mt-4'} bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2`}>
          <input
            type="text"
            placeholder="Full Name"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
      )}
      
      {/* Email Field */}
      <div className={`flex items-center w-full ${isLogin ? 'mt-10' : 'mt-4'} bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2`}>
        <svg
          width="16"
          height="11"
          viewBox="0 0 16 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
            fill="#6B7280"
          />
        </svg>
        <input
          type="email"
          placeholder="Email id"
          className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password Field */}
      <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <svg
          width="13"
          height="17"
          viewBox="0 0 13 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
            fill="#6B7280"
          />
        </svg>
        <input
          type="password"
          placeholder="Password"
          className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Confirm Password Field (Register only) */}
      {!isLogin && (
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              fill="#6B7280"
            />
          </svg>
          <input
            type="password"
            placeholder="Confirm Password"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      )}

      {/* Forgot password (Login only) */}
      {isLogin && (
        <div className="mt-5 text-left text-primary">
          <a className="text-sm" href="#">
            Forgot password?
          </a>
        </div>
      )}

      <button
        type="submit"
        className="mt-4 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity"
      >
        {isLogin ? 'Login' : 'Register'}
      </button>

      <p className="text-gray-500 text-sm mt-3 mb-11">
        {isLogin ? (
          <>
            Don’t have an account?{' '}
            <button
              type="button"
              className="text-primary"
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              type="button"
              className="text-primary"
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </>
        )}
      </p>
    </form>
  );

};

export default AuthForm;
