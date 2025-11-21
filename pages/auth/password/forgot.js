import { useState } from 'react';
import Layout from '../../../components/Layout';
import styles from '../../../styles/signup.module.css';
import { forgotPassword } from '../../../actions/auth'; // Make sure this points to the updated function

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: '',
    message: '',
    error: '',
    showForm: true,
    loading: false,
  });

  const { email, message, error, showForm, loading } = values;

  // Handle input changes
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value, message: '', error: '' });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, message: '', error: '' });

    const data = await forgotPassword(email);

    if (data.error) {
      setValues({ ...values, error: data.error, loading: false });
    } else {
      setValues({
        ...values,
        message: data.message || 'Check your email for reset instructions!',
        email: '',
        showForm: false,
        loading: false,
      });
    }
  };

  // Show error
  const showError = () => error && <div className={styles.showError}>{error}</div>;

  // Show success message
  const showMessage = () => message && <div className={styles.showMessage}>{message}</div>;

  // Form JSX
  const passwordForgotForm = () => (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <h2>Forgot Password</h2>
      <br />
      <div>
        <input
          className={styles.inputs}
          type="email"
          onChange={handleChange('email')}
          value={email}
          placeholder="Enter your email"
          required
          autoComplete="email"
        />
      </div>
      <br />
      <div>
        <button className={styles.forgotpassbtn0022} disabled={loading}>
          {loading ? 'Sending...' : 'Send Password Reset Link'}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className={styles.backImg}>
        <br /><br /><br /><br />
        {showError()}
        {showMessage()}
        {showForm && passwordForgotForm()}
        <br /><br /><br /><br />
      </div>
    </Layout>
  );
};

export default ForgotPassword;
