import Link from 'next/link';
import styles from "../../styles/blogposts.module.css";
import { format } from 'date-fns';

const SmallCard = ({ blog }) => {
    const formattedDate = format(new Date(blog.date), 'dd MMMM, yyyy');
    return (
        <>
            <Link href={`/${blog.slug}`} className={styles.relatedtitle}>
                <section className={styles.resizeparent}><img src={blog.photo} className={styles.resizeimgrelated} alt={blog.title} /></section>
                <section className={styles.givetitlemar}> {blog.title} </section>
            </Link>
            <section className={styles.dateauth}>
                {formattedDate} &nbsp; by &nbsp;
                {blog.postedBy && blog.postedBy.name && blog.postedBy.username ? (
                    <Link href={`/profile/${blog.postedBy.username}`} className={styles.author}>{blog.postedBy.name}</Link>) : (<span></span>)}
            </section>
            <br />
        </>
    );
};

export default SmallCard;