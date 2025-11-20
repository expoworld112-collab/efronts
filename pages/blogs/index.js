import Head from 'next/head';
import { withRouter } from 'next/router';
import Layout from '@/components/Layout';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import Card from '../../components/blog/Card';
import { DOMAIN, APP_NAME} from '../../config';
import styles from "../../styles/blogs.module.css";
import { useState } from 'react';
import { format } from 'date-fns';

const Blogs = ({ blogs, router }) => {
  
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 6;

    const head = () => (
      <Head>
          <title>{`Blogs - ${APP_NAME}`}</title>

          <meta
              name="description"
              content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
          />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
          <meta property="og:title" content={`Latest web developoment tutorials | ${APP_NAME}`} />
          <meta
              property="og:description"
              content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
          />
          <meta property="og:type" content="webiste" />
          <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
          <meta property="og:site_name" content={`${APP_NAME}`} />

          <meta property="og:image" />
          <meta property="og:image:secure_url" />
          <meta property="og:image:type" content="image/jpg" />
      </Head>
  );


    const showAllBlogs = () => {
        const startIndex = (currentPage - 1) * blogsPerPage;
        const endIndex = startIndex + blogsPerPage;
        return blogs.slice(startIndex, endIndex).map((blog, i) => (
            <article key={i} className={styles.box}>
                <Card blog={blog} />
            </article>
        ));
    };

    const renderPagination = () => {
        const pageLinks = [];
        const totalPages = Math.ceil(blogs.length / blogsPerPage);
    
        // show page numbers with format 1, 2, 3, 4 ... 50, 51
        if (totalPages <= 10) {
          for (let i = 1; i <= totalPages; i++) {
              pageLinks.push(
                  <li key={i} className={currentPage === i ? styles.activePage : ''}>
                      <button onClick={() => setCurrentPage(i)}>{i}</button>
                  </li>
              );
          }
        } else {
          let startPage = currentPage - 4;
          let endPage = currentPage + 5;
    
          if (startPage < 1) {
            endPage = endPage + (1 - startPage);
            startPage = 1;
          }
    
          if (endPage > totalPages) {
            endPage = totalPages;
            if (endPage > 10) {
              startPage = endPage - 9;
            }
          }
    
          for (let i = startPage; i <= endPage; i++) {
            pageLinks.push(
              <li key={i} className={currentPage === i ? styles.activePage : ''}>
                <button onClick={() => setCurrentPage(i)}>{i}</button>
              </li>
            );
          }
    
          if (endPage < totalPages) {
            pageLinks.push(
              <li key={totalPages} className={styles.pageLink}>
                ...
              </li>
            );
            pageLinks.push(
              <li key={totalPages + 1}>
                <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
              </li>
            );
          } else if (startPage > 1) {
            pageLinks.unshift(
              <li key={1} className={styles.pageLink}>
                ...
              </li>
            );
            pageLinks.unshift(
              <li key={0}>
                <button onClick={() => setCurrentPage(1)}>1</button>
              </li>
            );
          }
        }
    
        return (
          <ul className={styles.pagination}>
              <li>
                  <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}> Prev </button>
              </li>
              {pageLinks}
              <li>
                  <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}> Next </button>                    
              </li>
          </ul>
        );
    };
    


    return (
        <>
            {head()}
            <Layout>
                <main className={styles.backImg}>
                    <div className={styles.mtop}></div>
                    <h1 style={{ textAlign: "center", color: "white" }}>All Blogs</h1>
                    <br />

                    {renderPagination()}
                    <div className={styles.grid}>{showAllBlogs()}</div>
                    <br /> <br />

                </main>
            </Layout>
        </>
    );
};



/*
export async function getServerSideProps() {
  const data = await listBlogsWithCategoriesAndTags();
  if (data.error) {console.log(data.error);}
   else {
    const formattedDate = format(new Date(data.date), 'dd MMMM, yyyy');
    return {props: {blogs: {...data, formattedDate }}}; 
  }
}
*/

export async function getServerSideProps() {
  const data = await listBlogsWithCategoriesAndTags();
  if (data.error) {console.log(data.error);} 
  else {
    const formattedBlogs = data.blogs.map(blog => ({...blog, formattedDate: format(new Date(blog.date), 'dd MMMM, yyyy') }));
   return { props: { blogs: formattedBlogs } };
  }
}


export default withRouter(Blogs);