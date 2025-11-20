import { useState } from 'react';
// import Link from 'next/link';
import { emailContactForm } from '../../actions/form';
import styles from "../../styles/profile.module.css"
import { isAuth } from '@/actions/auth';
import dynamic from 'next/dynamic';



const ContactForm = ({ authorEmail }) => {
    const [values, setValues] = useState({
        message: '',
        name: '',
        email: '',
        sent: false, 
        buttonText: 'Send Message',
        success: false,
        error: false
    });

    const { message, name, email, sent, buttonText, success, error } = values;

    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Sending...' });
        emailContactForm({ authorEmail, name, email, message }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    sent: true,
                    name: '',
                    email: '',
                    message: '',
                    buttonText: 'Sent',
                    success: data.success
                });
            }
        });
    };
 
    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value, error: false, success: false, buttonText: 'Send Message' });
    };

    const showSuccessMessage = () => success && <div style={{color:"#2cf12c", marginLeft:"30px", fontSize:"20px", fontWeight:"700"}}>Email Has Been sent</div>;

    const showErrorMessage = () => (
        <div style={{ display: error ? '' : 'none', color:"red", marginLeft:"30px", fontSize:"20px", fontWeight:"700" }}>
            {error}
        </div>
    );

    const contactForms = () => {
        return (
            <form onSubmit={clickSubmit} className={styles.container}>
                
                    <label className={styles.text}>Message</label>

                    <div className={styles.txtarea}>
                        <textarea
                            onChange={handleChange('message')} type="text" value={message} required style={{ background: "rgb(222, 233, 233)", border: "none", borderRadius:"7px", marginBottom:"7px" }} rows={7} cols={43}  >
                        </textarea>
                    </div>
               

                <label className={styles.text}>Name</label>
                <div>   <input className={styles.inputs} type="text" onChange={handleChange('name')} value={name} required /></div>


                <label className={styles.text}>Email</label>
                <div>  <input className={styles.inputs} type="email" onChange={handleChange('email')} value={email} required /> </div>


                {isAuth() && isAuth().role === 1 && (<button className={styles.uploadbtn} >{buttonText}</button>)}
                {isAuth() && isAuth().role !==1 && (<button className={styles.uploadbtn} disabled>{buttonText}</button>)}
                    {/* <button className={styles.uploadbtn}>{buttonText}</button> */}
                
            </form>
        );
    };

    return (
        <>
            {showSuccessMessage()}
            {showErrorMessage()}
            {contactForms()}
            <br/>
        </>
    );
};

// export default ContactForm;
export default dynamic(() => Promise.resolve(ContactForm), { ssr: false })