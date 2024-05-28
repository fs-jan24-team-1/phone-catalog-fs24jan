import React, { useState, useRef } from 'react';
import styles from './authorizationPage.module.scss';
import eyeIcon from './lock.png';
import eyeSlashIcon from './onLock.jpg';

interface PasswordInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthorizationPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <div className={styles.switchButton} onClick={switchMode}>
          {isLogin ? 'No account? Sign up here' : 'Login here'}
        </div>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const [password, setPassword] = useState('');
  return (
    <form action='/#'>
      <h2>Login</h2>
      <div className={styles.inputWithIcon}>
        <input type="email" placeholder="Email" required />
      </div>
      <div className={styles.inputWithIcon}>
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      <hr className={styles.separator} />
    </form>
  );
};

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} action='/#'>
      <h2>Sign up</h2>
      <div className={styles.nameFields}>
        <div className={styles.inputWithIcon}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputWithIcon}>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className={styles.inputWithIcon}>
        <input type="email" placeholder="Email" required />
      </div>
      <div className={styles.inputWithIcon}>
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.inputWithIcon}>
        <PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <button type="submit">Sign up</button>
      <hr className={styles.separator} />
    </form>
  );
};

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (inputRef.current) {
      inputRef.current.type = showPassword ? 'password' : 'text';
    }
  };

  return (
    <div className={styles.inputWithIcon}>
      <input
        ref={inputRef}
        type="password"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <div className={styles.passwordToggle} onClick={togglePasswordVisibility}>
        <img src={showPassword ? eyeSlashIcon : eyeIcon} alt={showPassword ? "Hide Password" : "Show Password"} width="20" height="20" />
      </div>
    </div>
  );
};
