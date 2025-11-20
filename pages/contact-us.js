import Layout from '../components/Layout';
import Head from 'next/head';
import { APP_NAME, DOMAIN } from '@/config';
import styles from "../styles/blogposts.module.css"

const Contact = () => {

    const head = () => (
        <Head>
            <title >{` Contact Us -  ${APP_NAME}`}</title>
            <meta name="description" content={"We'd love to hear from you! If you have any questions, feedback, or suggestions, please feel free to reach out to us using the contact information below:"} />
            <link rel="canonical" href={`${DOMAIN}/contact-us`} />
            <meta property="og:title" content={` Contact Us -  ${APP_NAME}`} />
            <meta property="og:description" content={"We'd love to hear from you! If you have any questions, feedback, or suggestions, please feel free to reach out to us using the contact information below:"} />
            <meta property="og:type" content="webiste" />
            <meta name="robots" content="index, follow" />
            <meta property="og:url" content={`${DOMAIN}/contact-us}`} />
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
                                    <h1 >Contact Us</h1>
                                    <br/>
                                    <br />
                                </header>

                            </section>



                            <section class="mypost">
                                <p>We'd love to hear from you! If you have any questions, feedback, or suggestions, please feel free to reach out to us using the contact information below:</p>


                                <ul>
                                    <li><strong>Email:</strong> expoworld112@gmail.com</li>
                                    <li><strong>Phone:</strong>+91 998</li>
                                    <li><strong>Address:</strong> Amritsar, Punjab</li>
                                </ul>
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