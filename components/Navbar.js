import Link from 'next/link';
import { APP_NAME, BACKEND } from "../config";
import { isAuth } from '../actions/auth';
import styles from "../styles/NavbarFooter.module.css";
import { useState, useEffect } from 'react';

const Navbar = () => {

  const [user, setUser] = useState(null);

  const getUser = async () => {
    setUser(isAuth());
  };

  useEffect(() => { getUser(); }, []);

  function disablenavbar2() {
    let x = document.getElementById("disable")
    if (x.style.display === "block") { x.style.display = "none"; }
    else { x.style.display = "block" }
  }

  function disablenavbar() { document.getElementById("disable").style.display = "none"; }

  return (
    <>
      <nav className={styles.nav}>

        <div className={styles.span} onClick={disablenavbar2}>☰</div>

        <Link href="/"><div className={styles.logo}> 📚 {APP_NAME}</div></Link>

        <ul id="disable" onClick={disablenavbar}>
          <li><Link href="/categories/react" >HOTELS</Link></li>
          <li><Link href="/categories/javascript">HISTORICAL</Link></li>
          <li><Link href="/categories/django">PLACES</Link></li>
          <li><Link href="/categories/python">Python</Link></li>
          <li><Link href="/categories/seo">TOURIST</Link></li>
          <li><Link href="/categories/wordpress">RESTURANTS</Link></li>


          {!user && (<><li><Link href="/signin">Signin </Link></li><li><Link href="/signup">Signup</Link></li></>)}

          {user && isAuth().role === 1 && (<li><a className={styles.userdash} href="/admin"> {`${isAuth().name} ‒ Admin`}</a></li>)}
          {user && isAuth().role === 0 && (<li><a className={styles.userdash} href="/admin"> {`${isAuth().name} ‒ User`}</a></li>)}


        </ul>
      </nav>

    </>

  )
}


export default Navbar