import '../styles/globals.css';
import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
NProgress.configure({ showSpinner: false })



function App({ Component, pageProps }) {

  return (
    <>

      <Head>
      
      {/* <meta
  httpEquiv="Content-Security-Policy"
  content="
    default-src 'self' localhost:3000 localhost:8000 https://disqus.com/ ;
    script-src 'self' 'unsafe-inline' 'unsafe-eval' localhost:3000 localhost:8000 my-cms-7.disqus.com https://c.disquscdn.com/ 
    https://launchpad-wrapper.privacymanager.io/ https://launchpad.privacymanager.io/;


    connect-src 'self' localhost:8000 https://links.services.disqus.com/;
    img-src 'self' data: localhost:3000 localhost:8000 https://c.disquscdn.com/ http://cdn.viglink.com/;
    style-src 'self' 'unsafe-inline' localhost:3000 localhost:8000 https://c.disquscdn.com/;
    font-src 'self' localhost:3000 localhost:8000;
    object-src 'none';
  "
/> */}

        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json"/>
        <meta name="theme-color" content="#000000" />
      </Head>
      

      <Component {...pageProps} />
     

    </>

  )
}
export default App
