import UserBlogRead from '../../components/crud/UserBlogRead';
import Private from '../../components/auth/Private';
import { isAuth } from '../../actions/auth';

const Blog = () => {
    const username = isAuth() && isAuth().username;

    return (

        <Private>
            <UserBlogRead username={username} />
        </Private>

    );
};

export default Blog;