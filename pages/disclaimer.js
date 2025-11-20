import Layout from '../components/Layout';
import Head from 'next/head';
import { APP_NAME, DOMAIN } from '@/config';
import styles from "../styles/blogposts.module.css"

const Contact = () => {

    const head = () => (
        <Head>
            <title >{` Disclaimer -  ${APP_NAME}`}</title>
            <meta name="description" content={"We'd love to hear from you! If you have any questions, feedback, or suggestions, please feel free to reach out to us using the contact information below:"} />
            <link rel="canonical" href={`${DOMAIN}/disclaimer`} />
            <meta property="og:title" content={` Disclaimer -  ${APP_NAME}`} />
            <meta property="og:description" content={"We'd love to hear from you! If you have any questions, feedback, or suggestions, please feel free to reach out to us using the contact information below:"} />
            <meta property="og:type" content="webiste" />
            <meta name="robots" content="index, follow" />
            <meta property="og:url" content={`${DOMAIN}/disclaimer}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

        </Head>
    );

    return (
        <Layout>

            <>
                {head()}

                <main>
                    <article className={styles.backgroundImg}>
                        <br />

                        <section className={styles.mypost}>
                            <section className={styles.topsection}>

                                <header>
                                    <h1 >Disclaimer</h1>
                                    <br />
                                    <br />
                                </header>

                            </section>

                            <section class="mypost">
                                <p>The information provided on this website is for general informational purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>

                                <p>In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.</p>

                                <p>Through this website, you may be able to link to other websites that are not under our control. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</p>

                                <p>Every effort is made to keep the website up and running smoothly. However, we take no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.</p>

                                <p>Please note that the information provided on this website is not legal or professional advice. It is solely for general informational purposes. If you require specific advice, please consult a qualified professional in the relevant field.</p>
                            </section>
                        </section>
                        <br />
                        <br />


                    </article>
                </main>


            </>
        </Layout>
    );
};

export default Contact;