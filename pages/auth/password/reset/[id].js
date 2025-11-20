import { useState } from 'react';
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router';
import { resetPassword } from '../../../../actions/auth';
import styles from "../../../../styles/signup.module.css";
import Router from 'next/router';

const ResetPassword = ({ router }) => {
    const [values, setValues] = useState({
        name: '',
        newPassword: '',
        error: '',
        message: '',
        showForm: true
    });

    const { showForm, name, newPassword, error, message } = values;

    const handleSubmit = e => {
        e.preventDefault();
        resetPassword({
            newPassword,
            resetPasswordLink: router.query.id
        }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, showForm: false, newPassword: '' });
            } else {
                setValues({ ...values, message: data.message, showForm: false, newPassword: '', error: false });


                function redirect() {
                    // Router.replace(`/${postslug}`);
                    Router.push(`/signin`);
                }
                setTimeout(redirect, 400)
            }
        });
    };

    const passwordResetForm = () => (
        <form onSubmit={handleSubmit} className={styles.wrapper}>
            <h2>Reset password</h2>
            <br/>

            <div >
                <input className={styles.inputs} type="password" value={newPassword} placeholder="Type new password" required
                    
                    onChange={e => setValues({ ...values, newPassword: e.target.value })}   
                />
            </div>
            <br/>
            <div>
                <button className={styles.forgotpassbtn0022}>Change Password</button>
            </div>
        </form>
    );

    const showError = () => (error ? <div className={styles.showError}>{error}</div> : '');
    const showMessage = () => (message ? <div className={styles.showMessage}>{message}</div> : '');

    return (
        <Layout>
            <div className={styles.backImg}>
            <br /><br /><br /><br />
                
                {showError()}
                {showMessage()}
                {passwordResetForm()}
                <br /><br /><br /><br />
            </div>
        </Layout>
    );
};

export default withRouter(ResetPassword);