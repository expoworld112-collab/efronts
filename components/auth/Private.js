import { useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../../actions/auth';
import dynamic from 'next/dynamic';

const Private = ({ children }) => {

    useEffect(() => {
        if (!isAuth()) {
            Router.push(`/signin`);
        } else if (isAuth().role !== 0) {
            Router.push(`/admin`);
        }
    }, []);

    return ( 
    <>
    {children}
    </>
    );
};

// export default Private;

export default dynamic(() => Promise.resolve(Private), { ssr: false })