import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { userPublicProfile } from '../../actions/user';
import { DOMAIN, APP_NAME} from '../../config';
import styles from "../../styles/profile.module.css"
import ContactForm from '../../components/form/ContactForm';
import Search from '@/components/blog/Search';


const UserProfile = ({ user, blogs, query, errorCode }) => {

    if (errorCode) {
        return (
            <Layout>
                <div style={{ background: "black" }}>
                    <br /><br /><br />
                    <div className={styles.page404}>404 Error! User Not Found</div>
                    <section className={styles.item0000}> <br /> <Search /> <br /><br /><br /></section>
                </div>
            </Layout>
        );
    }





    const head = () => (
        <Head>
            <title>
                {`${user.username} - ${APP_NAME}`}
            </title>
            <meta name="description" content={`Blogs by ${user.username}`} />
            <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:title" content={`${user.username}| ${APP_NAME}`} />
            <meta property="og:description" content={`Blogs by ${user.username}`} />
            <meta name="robots" content="noindex, nofollow" />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
        </Head>
    );

    const showUserBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div key={i} className={styles.gap}>
                    <Link href={`/${blog.slug}`} className={styles.postlink}>
                        {blog.title}
                    </Link>
                </div>
            );
        });
    };

    return (
        <>
            {head()}
            <Layout>
                <div className={styles.BackgroundImage}>
                    <br />

                    <div className={styles.box}>

                        <div className={styles.heading}>{user.name}</div>

                        <div>{user.email}</div>
                        {/* <div className={styles.joining}>Joined {user.createdAt} </div> */}
                    </div>


                    <br />
                    <br />



                    <div className={styles.row}>


                        <div className={styles.column}>
                            <div className={styles.heading0}>
                                Blogs by {user.name}
                            </div>

                            {showUserBlogs()}
                        </div>



                        <div className={styles.column2}>
                            <div className={styles.heading0}>Message {user.name} </div>
                            <br />
                            <ContactForm authorEmail={user.email} />
                        </div>


                    </div>
                    <br /><br />
                </div>

            </Layout>
        </>
    );
};




export async function getServerSideProps({ query }) {
    try {
        const data = await userPublicProfile(query.username);
        if (data.error) {
            console.log(data.error);
            return { props: { errorCode: 404 } };
        } else {
            return { props: { user: data.user, blogs: data.blogs, query } };
        }
    } catch (error) {
        console.error(error);
        return { props: { errorCode: 500 } };
    }
}


export default UserProfile;