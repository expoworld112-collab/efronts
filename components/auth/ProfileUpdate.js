import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import { API } from '../../config';
import styles from "../../styles/updateprofile.module.css"
import dynamic from 'next/dynamic';
  
const ProfileUpdate = () => {
    const [values, setValues] = useState({
        username: '',
        usernameforphoto: '',
        name: '',
        email: '',
        about: '',
        password: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: process.browser && new FormData()
    });

    const token = getCookie('token');
    const { username, name, email, usernameforphoto, about, password, error, success, loading, photo, userData } = values;

    const init = () => {
        getProfile(token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    username: data.username,
                    usernameforphoto: data.username,
                    name: data.name,
                    email: data.email,
                    about: data.about,

                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);


    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        let userFormData = new FormData();
        userFormData.set(name, value);
        setValues({ ...values, [name]: value, userData: userFormData, error: false, success: false });
    };





    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true });
        update(token, userData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false, loading: false });
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        username: data.username,
                        usernameforphoto: data.username,
                        name: data.name,
                        email: data.email,
                        about: data.about,
                        password: '',
                        success: true,
                        loading: false
                    });
                });


                function myfunc() {
                    window.location.reload();
                }

                setTimeout(myfunc, 200)
            }
        });
    };

    const profileUpdateForm = () => (
        <form onSubmit={handleSubmit} className={styles.container}>

            <div className={styles.givespace}>

                <div className={styles.centerbtn}>
                    <label className={styles.uploadbtn}>
                        Upload Photo
                        <input className={styles.inputs} onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                    </label>
                </div>
            </div>


            <div className={styles.containerspace}>

                <label className={styles.text}>Username</label>
                <div>  <input className={styles.inputs} onChange={handleChange('username')} type="text" value={username} />  </div>


                <label className={styles.text}>Name</label>
                <div > <input className={styles.inputs} onChange={handleChange('name')} type="text" value={name} /> </div>


                {/* <label className={styles.text}>Password</label> */}
                {/* <div> <input className={styles.inputs} onChange={handleChange('password')} type="password" value={password} /> </div> */}


                <label className={styles.text}>About You</label>
                <div> <textarea style={{ background: "rgb(222, 233, 233)", border: "none", borderRadius:"7px" }} rows={8} cols={47} onChange={handleChange('about')} type="text" value={about} /> </div>





                <div style={{marginTop:"5px", textAlign:"center"}}>
                    
                    {showError()}
                   
                </div>

            </div>


            <div className={styles.centerbtn}>
                <button type="submit" className={styles.uploadbtn}> Update </button>
            </div>

        </form>
    );


     const showError = () => (
            <div style={{color:"red"}}> {error}  </div >
     );

    //  const showSuccess = () => (
    //      <div>  Profile updated </div >
    //  );

    //  const showLoading = () => (
    //      <div >    Loading... </div >
    //  );


    return (
        <>
            <div className={styles.row}>

                <div className={styles.column}>
                    <img src={`${API}/user/photo/${usernameforphoto}`} alt="user profile" className={styles.alignImg} />

                    <div className={styles.info}>
                        <div className={styles.addpad}> {username}</div>
                        <div className={styles.addpad}> {name}</div>
                        <div className={styles.addpad}> {password}</div>
                        <div className={styles.addpad}> {about}</div>
                    </div>

                </div>

                <div className={styles.column2}>
                    <div className={styles.givepad}>{profileUpdateForm()}</div>
                </div>

            </div>

        </>
    );
};

// export default ProfileUpdate;

export default dynamic(() => Promise.resolve(ProfileUpdate), { ssr: false })