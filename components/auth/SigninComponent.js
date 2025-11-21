import styles from "../../styles/signup.module.css";
import { useState, useEffect } from 'react';
import { signin, isAuth, authenticate } from '../../actions/auth';
import Router from 'next/router';
import Link from "next/link";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const { email, password, error, loading, message, showForm } = values;

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuth()) {
      Router.push(isAuth().role === 1 ? '/admin' : '/user');
    }
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });

    try {
      const user = { email, password };
      const data = await signin(user);

      if (data && data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          Router.push(isAuth().role === 1 ? '/admin' : '/user');
        });
      }
    } catch (err) {
      setValues({ ...values, error: 'Signin failed. Try again.', loading: false });
    }
  };

  const showLoading = () => (loading ? <div className={styles.showLoading}>Loading...</div> : null);
  const showError = () => (error ? <div className={styles.showError}>{error}</div> : null);
  const showMessage = () => (message ? <div className={styles.showMessage}>{message}</div> : null);

  const signinForm = () => (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Hello Again!</h1>
      <p className={styles.paragraph}>Welcome back, you've <br /> been missed!</p>

      <form onSubmit={handleSubmit}>
        <input
          className={styles.inputs}
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange('email')}
          autoComplete="email"
          required
        />
        <input
          className={styles.inputs}
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange('password')}
          autoComplete="current-password"
          required
        />
        <button className={styles.button}>Sign In</button>
      </form>

      <div className={styles.notmember}>
        Not a member? &nbsp;<Link href="/signup">Register Now</Link>
      </div>

      <Link className={styles.forgotpassbtn00} href="/auth/password/forgot">
        Forgot Password
      </Link>

      <div style={{ marginTop: '20px' }}>
        <a
          href="https://ebacks-tau.vercel.app/auth/google"
          className={styles.googleSigninBtn}
        >
          Sign in with Google
        </a>
      </div>
    </div>
  );

  return (
    <div className={styles.backImg}>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </div>
  );
};

export default SigninComponent;
