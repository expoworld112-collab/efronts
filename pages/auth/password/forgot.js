import { useState } from 'react';
import Layout from '../../../components/Layout';
import { forgotPassword } from "../../../actions/auth";
import styles from "../../../styles/signup.module.css";

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        showForm: true
    });

    const { email, message, error, showForm } = values;

    const handleChange = name => e => {
        setValues({ ...values, message: '', error: '', [name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, message: '', error: '' });
        forgotPassword({ email }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, message: data.message, email: '', showForm: false });
                
            }
        });
    };

    const showError = () => (error ? <div className={styles.showError}>{error}</div> : '');
    const showMessage = () => (message ? <div className={styles.showMessage}>{message}</div> : '');

    const passwordForgotForm = () => (
        <form onSubmit={handleSubmit} className={styles.wrapper}>
            <h2>Forgot Password</h2>
            <br />
            <div >
                <input className={styles.inputs} type="email" onChange={handleChange('email')} value={email} placeholder="Type your email" required />
            </div>
            <br />
            <div>
                <button className={styles.forgotpassbtn0022}>Send Password Reset Link</button>
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