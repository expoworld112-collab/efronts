import { useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../../actions/auth';
import dynamic from 'next/dynamic';

const Admin = ({ children }) => {
    useEffect(() => {
        if (!isAuth()) {
            Router.push(`/signin`);
        } else if (isAuth().role !== 1) {
            Router.push(`/user`);
        }
    }, []);

      return ( 
    <>
    {children}
    </>
    );
};


export default dynamic(() => Promise.resolve(Admin), { ssr: false })


//   export default Admin;