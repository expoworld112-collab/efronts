import Private from '../../components/auth/Private';
import BlogCreate from '../../components/crud/CreateBlog';
import dynamic from 'next/dynamic';


const Blog = () => {
    return (

        <Private>
            <BlogCreate />
        </Private>

    );
};

// export default Blog;

export default dynamic(() => Promise.resolve(Blog), { ssr: false })