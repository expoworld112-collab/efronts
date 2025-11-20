import Layout from '../components/Layout';
import Head from 'next/head';
import { APP_NAME, DOMAIN } from '@/config';
import styles from "../styles/blogposts.module.css"

const Contact = () => {

    const head = () => (
        <Head>
            <title >{` Privacy Policy -  ${APP_NAME}`}</title>
            <meta name="description" content={"We'd love to hear from you! If you have any questions, feedback, or suggestions, please feel free to reach out to us using the contact information below:"} />
            <link rel="canonical" href={`${DOMAIN}/privacy-policy`} />
            <meta property="og:title" content={` Privacy Policy -  ${APP_NAME}`} />
            <meta property="og:description" content={"We'd love to hear from you! If you have any questions, feedback, or suggestions, please feel free to reach out to us using the contact information below:"} />
            <meta property="og:type" content="webiste" />
            <meta name="robots" content="index, follow" />
            <meta property="og:url" content={`${DOMAIN}/privacy-policy}`} />
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
                                    <h1 >Privacy Policy</h1>
                                    <br />
                                    <br />
                                </header>

                            </section>




                            <section class="mypost">
                                <p>Your privacy is important to us. It is Coding4u's policy to respect your privacy regarding any information we may collect from you across our website and other sites we own and operate.</p>

                                <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.</p>

                                <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.</p>

                                <p>We don't share any personally identifying information publicly or with third-parties, except when required to by law.</p>

                                <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites and cannot accept responsibility or liability for their respective privacy policies.</p>

                                <p>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>

                                <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
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