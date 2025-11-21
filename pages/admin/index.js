import dynamic from "next/dynamic";
import Admin from "../../components/auth/Admin";

// Dynamically import BlogUpdate to prevent SSR errors
const BlogUpdate = dynamic(() => import("../../components/crud/BlogUpdate"), { ssr: false });

const Blog = () => {
  return (
    <Admin>
      <section className="blog-update-section">
        <h2>Update Blogs</h2>
        <BlogUpdate />
      </section>

      <style jsx>{`
        .blog-update-section {
          padding: 20px;
          color: var(--text-color);
        }

        h2 {
          font-size: 1.5rem;
          margin-bottom: 15px;
        }
      `}</style>
    </Admin>
  );
};

export default Blog;
