import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { singleBlog, listRelated } from '../actions/blog';
import { DOMAIN, APP_NAME, API } from "../config";
import styles from "../styles/blogposts.module.css";
import SmallCard from '../components/blog/SmallCard';
import Layout from '@/components/Layout';
import Search from '@/components/blog/Search';
import { isAuth } from "../actions/auth";
import { format, utcToZonedTime } from 'date-fns-tz';

const SingleBlog = ({ blog, errorCode }) => {
  const [related, setRelated] = useState([]);
  const [user, setUser] = useState(null);

  // Set authenticated user
  useEffect(() => { setUser(isAuth()); }, []);

  // Fetch related blogs
  useEffect(() => {
    const fetchRelated = async () => {
      if (!blog?.slug) return;
      try {
        const data = await listRelated(blog.slug);
        setRelated(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching related blogs:", err);
      }
    };
    fetchRelated();
  }, [blog?.slug]);

  // Show 404 page if error
  if (errorCode) {
    return (
      <Layout>
        <div style={{ background: "black" }}>
          <br /><br /><br />
          <div className={styles.page404}>404 Error! Page Not Found</div>
          <section className={styles.item0000}>
            <br /><Search /><br /><br /><br />
          </section>
        </div>
      </Layout>
    );
  }

  // SEO metadata
  const head = () => (
    <Head>
      <title>{`${blog.title} - ${APP_NAME}`}</title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/${blog.slug}`} />
      <meta property="og:title" content={`${blog.mtitle} | ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="website" />
      <meta name="robots" content="index, follow" />
      <meta property="og:url" content={`${DOMAIN}/${blog.slug}`} />
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:image" content={blog.photo} />
      <meta property="og:image:secure_url" content={blog.photo} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="article:published_time" content={blog.date} />
      <meta property="article:modified_time" content={blog.date} />
    </Head>
  );

  const showRelatedBlog = () => related.map((b, i) => (
    <article key={i} className={styles.box}>
      <SmallCard blog={b} />
    </article>
  ));

  const showBlogCategories = blog.categories?.map((c, i) => (
    <Link key={i} href={`/categories/${c.slug}`} className={styles.blogcat}>
      {c.name}
    </Link>
  ));

  const showBlogTags = blog.tags?.map((t, i) => (
    <Link key={i} href={`/tags/${t.slug}`} className={styles.blogtag}>
      {t.name}
    </Link>
  ));

  return (
    <>
      {head()}
      <Layout>
        <main>
          <article className={styles.backgroundImg}>
            <section className={styles.mypost}>
              <section className={styles.topsection}>
                {user?.role === 1 && (
                  <div className={styles.editbutton}>
                    <a href={`${DOMAIN}/admin/${blog.slug}`}>Edit</a>
                  </div>
                )}
                <header>
                  <h1>{blog.title}</h1>
                  <section className={styles.dateauth}>
                    {blog.formattedDate} &nbsp; by &nbsp;
                    {blog.postedBy?.name && blog.postedBy?.username ? (
                      <Link href={`/profile/${blog.postedBy.username}`} className={styles.author}>
                        {blog.postedBy.name}
                      </Link>
                    ) : <span>User</span>}
                  </section>
                </header>

                <section className={styles.imageContainer}>
                  <div className={styles.aspectRatioContainer}>
                    <img className={styles.resizeimg} src={blog.photo} alt={blog.title} />
                  </div>
                </section>
              </section>

              <section className="postcontent">
                <div dangerouslySetInnerHTML={{ __html: blog.body }} />
                <div style={{ textAlign: "center" }}>
                  {showBlogCategories}
                  {showBlogTags}
                </div>
              </section>
            </section>

            <section className={styles.mypost2}>
              <section className={styles.item0000}>
                <Search />
              </section>
              <section className={styles.grid}>{showRelatedBlog()}</section>
            </section>
          </article>
        </main>
      </Layout>
    </>
  );
};

// ---------------------------------------------
// Safe fetch all slugs
// ---------------------------------------------
export const allSlugs = async () => {
  try {
    const res = await fetch(`${API}/stories/slugs`);
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      return Array.isArray(json) ? json : [];
    } catch {
      console.error("Invalid JSON from slug API:", text);
      return [];
    }
  } catch (err) {
    console.error("Slug API exception:", err);
    return [];
  }
};

// ---------------------------------------------
// Generate static paths
// ---------------------------------------------
export async function getStaticPaths() {
  const slugs = await allSlugs();
  const paths = slugs.map(slug => ({ params: { slug: slug.slug || slug } })) || [];
  return { paths, fallback: "blocking" };
}

// ---------------------------------------------
// Fetch blog data
// ---------------------------------------------
export async function getStaticProps({ params }) {
  try {
    const data = await singleBlog(params.slug);
    if (!data || data.error) return { props: { errorCode: 404 } };

    const utcDate = new Date(data.date);
    const istDate = utcToZonedTime(utcDate, 'Asia/Kolkata');
    const formattedDate = format(istDate, 'dd MMM, yyyy', { timeZone: 'Asia/Kolkata' });

    return { props: { blog: { ...data, formattedDate } } };
  } catch (err) {
    console.error(err);
    return { props: { errorCode: 500 } };
  }
}

export default SingleBlog;
