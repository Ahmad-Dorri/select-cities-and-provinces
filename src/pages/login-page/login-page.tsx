import { Alert, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import styles from './login-page.module.css';

const LOGIN_URL = 'http://rezayari.ir:5050/Auth/Login';

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          username: user,
          password: pwd,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response) {
        window.sessionStorage.setItem('accessToken', response.data.token);
        setSuccess(true);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      setErrMsg('نام کاربری یا رمز عبور اشتباه');
    }
  };
  if (success) {
    navigate('/');
  }

  return (
    <form className={styles['login-form']} onSubmit={submitHandler}>
      <TextField
        id="username"
        label="نام کاربری"
        variant="outlined"
        autoFocus
        onChange={(e) => setUser(e.target.value)}
        value={user}
        required
        className={styles['text-field']}
      />
      <div className={styles['password-input']}>
        <TextField
          required
          id="password"
          label="رمز عبور"
          variant="outlined"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          type={showPassword ? 'text' : 'password'}
          className={styles['text-field']}
        />
        {showPassword ? (
          <Visibility
            onClick={() => setShowPassword((prev) => !prev)}
            className={styles['password-icon']}
          />
        ) : (
          <VisibilityOff
            onClick={() => setShowPassword((prev) => !prev)}
            className={styles['password-icon']}
          />
        )}
      </div>
      <Button type="submit" variant="contained">
        ثبت
      </Button>
      {errMsg && (
        <Alert style={{ textAlign: 'center' }} severity="error" color="error">
          {errMsg}
        </Alert>
      )}
    </form>
  );
}

export default LoginPage;
