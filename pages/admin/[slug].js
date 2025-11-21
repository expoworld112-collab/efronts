// // import Layout from '../../../components/Layout';
// import Admin from '../../components/auth/Admin';
// import BlogUpdate from '../../components/crud/BlogUpdate';
// // import Link from 'next/link';

// const Blog = () => {
//     return (

//         <Admin>
//             <BlogUpdate />
//         </Admin>

//     );
// };

// export default Blog;


import dynamic from 'next/dynamic';
import Admin from '../../components/auth/Admin';

// Dynamically import BlogUpdate to avoid SSR issues
const BlogUpdate = dynamic(() => import('../../components/crud/BlogUpdate'), { ssr: false });

const Blog = () => {
  return (
    <Admin>
      <BlogUpdate />
    </Admin>
  );
};

export default Blog;
