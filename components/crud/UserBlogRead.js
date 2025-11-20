import Head from 'next/head';
import { useState, useEffect } from 'react';
import { getCookie } from '../../actions/auth';
import { list2, removeBlog } from '../../actions/blog';
import dynamic from 'next/dynamic';
const UserDashLayout = dynamic(() => import('../UserDashLayout'), { ssr: false });
import styles0 from "../../styles/editblogs.module.css";
import { format } from 'date-fns';

const BlogRead = ({ username }) => {

  const token = getCookie('token');

  const head = () => (
    <Head>
      <title>Edit Blogs</title>
    </Head>
  );


  const [blogs, setBlogs] = useState([]);
  const [blogscount, setBlogscount] = useState(0);
  const [message, setMessage] = useState('');
  const [ModalOpen, setModalOpen] = useState(false);
  const [currentBlogSlug, setCurrentBlogSlug] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const showModal = (slug) => {
    setModalOpen(true);
    setCurrentBlogSlug(slug);
    document.body.style.overflow = 'hidden';
  };

  const hideModel = () => {
    setModalOpen(false);
    setCurrentBlogSlug("");
    document.body.style.overflow = 'auto';
  };


  const fetchData = async () => {
    try {
      const data = await list2(username, currentPage); setBlogs(data.data || []); setBlogscount(data.totalBlogs || [])
    } catch (error) { console.error('Error fetching images:', error); }
  };


  useEffect(() => { fetchData(); }, [currentPage]);

  const handlePageChange = (newPage) => { setCurrentPage(newPage); };

  const deleteBlog = slug => {
    removeBlog(slug, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage("BlogPost Deleted Successfully");
        fetchData();
        setTimeout(() => {
          setMessage("");
        }, 2500);
      }
    });
  };


  const handleConfirmDelete = () => {
    deleteBlog(currentBlogSlug);
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };



  const showAllBlogs = () => {


    return blogs && blogs.map((blog, i) => {
      const formattedDate = format(new Date(blog.date), 'dd MMMM, yyyy');
      return (
        <div key={i} className={styles0.blog}>
          <div className={styles0.heading}>{blog.title}</div>
          <section className={styles0.date}>
            {formattedDate}
            {blog.postedBy && blog.postedBy.name && blog.postedBy.username ? (
              <> - {blog.postedBy.name} </>
            ) : (
              <span> - User</span>
            )}
          </section>


          <div onClick={() => showModal(blog.slug)} className={styles0.deletebtn}>Delete</div>
          <a target="_blank" href={`/user/${blog.slug}`} className={styles0.updatebtn}>Edit</a>

          {ModalOpen && (
            <div className="modal">
              <div className="modalContent">
                <div>Are you sure you want to delete this post ?</div>
                <br />
                <button className={styles0.deletebtn00} onClick={handleConfirmDelete}> DELETE</button>
                <button className={styles0.deletebtn00} onClick={hideModel}>CANCEL</button>
              </div>
            </div>
          )}


        </div>
      );
    });
  };



  return (

    <UserDashLayout >

      {head()}
      <div className={styles0.container}>

        {message && <div id='msg' className={styles0.message}>{message}</div>}

        
        {blogscount==0 ? (<div className={styles0.head}>Total &nbsp; Articles &nbsp; - &nbsp; <span> 0 </span></div>) : (<></>)}

        
        {blogscount!=0 ? (<div className={styles0.head}>Total &nbsp; Articles &nbsp; - &nbsp; <span> {blogscount} </span></div>) : (<></>)}

        {blogscount!=0 ? (
        <div className={styles0.pagination}>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <span>{currentPage}</span>
          <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </div>) : (<></>)}

        {showAllBlogs()}
      </div>

    </UserDashLayout>
  );
}

export default BlogRead;
