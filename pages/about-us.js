import Layout from '../components/Layout';
import Head from 'next/head';
import { APP_NAME, DOMAIN } from '@/config';
import styles from "../styles/blogposts.module.css"

const About = () => {

    const head = () => (
        <Head>
            <title >{` About Us -  ${APP_NAME}`}</title>
            <meta name="description" content={"We are a team of dedicated writers, researchers, and enthusiasts who are committed to sharing valuable insights and experiences with our readers. Our diverse backgrounds and areas of expertise allow us to cover a wide range of topics, ensuring that there's something for everyone. From technology to travel, health to home improvement, lifestyle to literature, we strive to offer content that is both informative and enjoyable."} />
            <link rel="canonical" href={`${DOMAIN}/about-us`} />
            <meta property="og:title" content={` About Us -  ${APP_NAME}`}/>
            <meta property="og:description" content={"We are a team of dedicated writers, researchers, and enthusiasts who are committed to sharing valuable insights and experiences with our readers. Our diverse backgrounds and areas of expertise allow us to cover a wide range of topics, ensuring that there's something for everyone. From technology to travel, health to home improvement, lifestyle to literature, we strive to offer content that is both informative and enjoyable."} />
            <meta property="og:type" content="webiste" />
            <meta name="robots" content="index, follow" />
            <meta property="og:url" content={`${DOMAIN}/about-us}`} />
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
                                    <h1 >About Us</h1>
                                    <br />
                                    <br/>

                                </header>

                            </section>



                            <section class="mypost">
                              <p>At Expoworld, we are passionate about creating an online space where ideas, knowledge, and inspiration converge. Our mission is to provide engaging and thought-provoking content that caters to diverse interests, all in one place. Whether you're seeking practical tips, insightful perspectives, or simply a moment of entertainment, we've got you covered.</p>


                              <p><b>Who We Are</b> - We are a team of dedicated writers, researchers, and enthusiasts who are committed to sharing valuable insights and experiences with our readers. Our diverse backgrounds and areas of expertise allow us to cover a wide range of topics, ensuring that there's something for everyone. From technology to travel, health to home improvement, lifestyle to literature, we strive to offer content that is both informative and enjoyable.</p>

                              <p><b>What We Believe</b> - We believe in the power of knowledge and its ability to transform lives. Our aim is to inspire and empower our readers to pursue their passions, make informed decisions, and lead fulfilling lives. We value authenticity, integrity, and open-mindedness, and we approach every topic with curiosity and respect. We encourage our readers to join us on this journey of exploration and growth.</p>

                              <p><b>Our Content</b> - With a commitment to quality and relevance, we curate and create content that resonates with our readers. Our articles, guides, and opinion pieces are meticulously researched and written with the utmost care. We strive to provide accurate information, actionable advice, and unique perspectives that challenge the status quo. We also embrace the evolving nature of the digital landscape, regularly adapting our content to meet the changing needs and interests of our audience. </p>

                              <p><b>Community Engagement </b>- At Coding4u, we believe in the power of community. We value the feedback and contributions of our readers, and we encourage active participation through comments, discussions, and social media channels. We view our readers as partners on this journey, and we welcome diverse viewpoints and constructive conversations. Together, we can create a vibrant and inclusive community where ideas can flourish. </p>
 
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

export default About;