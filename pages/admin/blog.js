// import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import BlogCreate from '../../components/crud/CreateBlog';
// import dynamic from 'next/dynamic';


const Blog = () => {
    return (

        <Admin>
            <BlogCreate />
        </Admin>

    );
};

export default Blog;

// export default dynamic(() => Promise.resolve(Blog), { ssr: false })