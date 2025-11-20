import styles from "../styles/adminDashBoard.module.css"
import { signout, isAuth } from '../actions/auth';
import Router from 'next/router';
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { BACKEND } from "@/config";
import { useState, useEffect } from "react";
import { googleauthenticate } from "../actions/auth";
import fetch from "isomorphic-fetch";

const UserDashLayout = ({ children }) => {

  function darkmode() {
    document.body.classList.toggle("darkmode");
  }

  function sighnoutuser() {
    signout();
    window.open(`${BACKEND}/logout`, "_self")
  }

  function toggledashbar() {
    let x = document.getElementById("mydashbar")
    if (x.style.display === "block") {
      x.style.display = "none";
    }
    else { x.style.display = "block" }
  }

  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await fetch(`${BACKEND}/login/success`, { method: "GET", credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        googleauthenticate(data);
        setUser(isAuth())
      }
    } catch (error) { console.log("User is not logged In"); }
  };

  useEffect(() => {
    getUser();
    setUser(isAuth())
    setTimeout(() => {
      if (!isAuth()) { Router.push(`/signin`); }
      else if (isAuth().role !== 0) { Router.push(`/admin`); }
    }, 400);
  }, []);




  return (
    <>
      {user && (
        <>

          <div className={styles.gridcontainer}>
            <div className={styles.griditem4}><Image className={styles.Myicon0} src="/Admin.png" width={26} height={26} alt="image" /></div>
            <div className={styles.griditem1}>  {isAuth().name}'s Dashboard - User</div>
            <div className={styles.griditem2} onClick={sighnoutuser}><Image className={styles.Myicon0} src="/Logout.png" width={22} height={22} alt="image" />Signout</div>
            <div className={styles.griditem3} onClick={darkmode}>
              <Image src="/WhiteMoon.png" id="moon" width={21} height={21} alt="image" />
            </div>
            <div className={styles.griditemtoggle} onClick={toggledashbar} >☰</div>
          </div>

          {/* SideDashbar */}
          <div className={styles.row}>
            <div className={styles.dashbar} id="mydashbar">
              <ul className={styles.dashbarul}>
                <Link className={styles.Link} href="/"><li className={styles.list}><Image className={styles.Myicon} src="/HomeIcon.png" width={22} height={22} alt="image" />Home</li></Link>
                <Link target="_blank" className={styles.Link} href="/user/blog"><li className={styles.list}><Image className={styles.Myicon} src="/Plus.png" width={20} height={20} alt="image" />Add Post</li></Link>
                <Link target="_blank" className={styles.Link} href="/blogs"><li className={styles.list}><Image className={styles.Myicon} src="/books.png" width={24} height={24} alt="image" />Blogs</li></Link>
                <Link className={styles.Link} href="/user/update/"><li className={styles.list}><Image className={styles.Myicon} src="/profile.png" width={22} height={22} alt="image" />Profile</li></Link>
                <a className={styles.Link} href="/user/edit-blogs"><li className={styles.list}><Image className={styles.Myicon} src="/create.png" width={23} height={22} alt="image" />Edit Blogs</li></a>

              </ul>
            </div>

            {/* Component  */}
            <div className={styles.column2}>
              {children}
            </div>
          </div>

        </>
      )}
    </>

  )
}


// export default UserDashLayout
export default dynamic(() => Promise.resolve(UserDashLayout), { ssr: false })