import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { singleBlog, listRelated, getAllBlogSlugs } from '../actions/blog';
import { DOMAIN, APP_NAME } from "../config";
import styles from "../styles/blogposts.module.css";
// import DisqusThread from '@/components/DisqusThread';
import SmallCard from '../components/blog/SmallCard';
import Layout from '@/components/Layout';
import Search from '@/components/blog/Search'; 
// import { format } from 'date-fns';
import { isAuth } from "../actions/auth";
import { format, utcToZonedTime } from 'date-fns-tz';


const SingleBlog0 = ({ blog, errorCode }) => {

    if (errorCode) {
        return (
            <Layout>
                <div style={{ background: "black" }}>
                    <br /><br /><br />
                    <div className={styles.page404}>404 Error! Page Not Found</div>
                    <section className={styles.item0000}> <br /> <Search /> <br /><br /><br /></section>
                </div>
            </Layout>
        );
    }

    const [related, setrelated] = useState([]);

    const fetchData = async () => {
        try {
            const data = await listRelated(blog.slug); setrelated(data);
        } catch (error) { console.error('Error fetching Blogs:', error); }
    };


    const [user, setUser] = useState(null);

    useEffect(() => { fetchData()}, [blog.slug]);
    useEffect(() => {setUser(isAuth()) }, []);

    const showRelatedBlog = () => {
        return (related && related.map((blog, i) => (
            <article key={i} className={styles.box}><SmallCard blog={blog} /></article>
        )))
    };



    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (<Link key={i} href={`/categories/${c.slug}`} className={styles.blogcat}>{c.name}</Link>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (<Link key={i} href={`/tags/${t.slug}`} className={styles.blogtag}> {t.name}</Link>
        ));


    // const showComments = () => {return (<DisqusThread id={blog._id} title={blog.title} path={`/blog/${blog.slug}`} />);};

    const formattedDate = blog.formattedDate;

    const head = () => (
        <Head>
            <title >{`${blog.title} - ${APP_NAME}`}</title>
            <meta name="description" content={blog.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/${blog.slug}`} />
            <meta property="og:title" content={`${blog.mtitle}| ${APP_NAME}`} />
            <meta property="og:description" content={blog.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta name="robots" content="index, follow" />
            <meta property="og:url" content={`${DOMAIN}/${blog.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={blog.photo} />
            <meta property="og:image:secure_url" content={blog.photo} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="article:published_time" content={blog.date} />
            <meta property="article:modified_time" content={blog.date} />
        </Head>
    );





    return (

        <>
            {head()}
            <Layout >
                {/* <Navbar blog={blog} /> */}
                <main>
                    <article className={styles.backgroundImg}>
                        <br />


                        <section className={styles.mypost}>
                            <section className={styles.topsection}>

                                {user && isAuth().role === 1 && (<div className={styles.editbutton}><a href={`${DOMAIN}/admin/${blog.slug}`}>Edit</a></div>)}

                                <header>
                                    <h1 >{blog.title}</h1>

                                    <section className={styles.dateauth}>
                                        {formattedDate} &nbsp; by &nbsp;
                                        {blog.postedBy && blog.postedBy.name && blog.postedBy.username ? (
                                            <Link href={`/profile/${blog.postedBy.username}`} className={styles.author}>
                                                {blog.postedBy.name}
                                            </Link>
                                        ) : (
                                            <span>User</span>
                                        )}

                                    </section>
                                </header>

                                <br />
                                <section className={styles.imageContainer}>
                                    <div className={styles.aspectRatioContainer}>
                                        <img className={styles.resizeimg} src={blog.photo} alt={blog.title} />
                                    </div>
                                </section>


                                <br /><br />
                            </section>



                            <section className="postcontent">

                                <div dangerouslySetInnerHTML={{ __html: blog.body }} />

                                <div style={{ textAlign: "center" }}>
                                    <br /><br />
                                    {showBlogCategories(blog)}
                                    {showBlogTags(blog)}

                                </div>
                            </section>
                        </section>
                        <br />
                        <br />


                        <section className={styles.mypost2} >
                            <br /> <br /> <br />
                            {/* <section className={styles.comments}> {showComments()} </section>  <br /> */}
                            <section className={styles.item0000}> <br /> <Search /> <br /> </section>
                            <section className={styles.grid}>{showRelatedBlog()}</section>
                            <br /> <br /><br /><br />
                        </section>

                    </article>
                </main>
            </Layout>
        </>
    );

};



export async function getStaticPaths() {
    const slugs = await getAllBlogSlugs();
    const excludedSlugs = ['/admin/edit-blogs', '/admin/blog', '/admin/edit-story', '/admin/web-story'];
    const filteredSlugs = slugs.filter((slugObject) => !excludedSlugs.includes(slugObject.slug));
    const paths = filteredSlugs.map((slugObject) => ({ params: { slug: slugObject.slug } }));
    return { paths, fallback: "blocking" };
}



export async function getStaticProps({ params }) {
    try {
        const data = await singleBlog(params.slug);
        if (data.error) { return { props: { errorCode: 404 } }; }
        //   const formattedDate = format(new Date(data.date), 'dd MMMM, yyyy', { timeZone: 'Asia/Kolkata' });
        const utcDate = new Date(data.date);
        const istDate = utcToZonedTime(utcDate, 'Asia/Kolkata');
        const formattedDate = format(istDate, 'dd MMM, yyyy', { timeZone: 'Asia/Kolkata' });

        return { props: { blog: { ...data, formattedDate } } };
    } catch (error) {
        console.error(error);
        return { props: { errorCode: 500 } };
    }
}

export default SingleBlog0;