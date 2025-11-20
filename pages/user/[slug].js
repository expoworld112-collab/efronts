import Private from '../../components/auth/Private';
import BlogUpdate from '../../components/crud/BlogUpdate';

const Blog = () => {
    return (

        <Private>
            <BlogUpdate />
        </Private>

    );
};

export default Blog;