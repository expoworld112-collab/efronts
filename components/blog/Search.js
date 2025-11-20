import { useState } from 'react';
import { listSearch } from '../../actions/blog';
import styles from "../../styles/blogposts.module.css"

const Search = () => {

    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const { search, results, searched, message } = values;

    const searchSubmit = e => {
        e.preventDefault();
        listSearch({ search }).then(data => {
            setValues({ ...values, results: data, searched: true, message: `${data.length} Blogs Found` });
        });
    };

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value, searched: true, results: [] });
    };

    const searchedBlogs = (results = []) => {
        return (
            < >
                {message && <div className={styles.blogfoundmsg}>{message}</div>}

                {results.map((blog, i) => {
                    return (
                        <div key={i} className={styles.givemargin}>
                            <a href={`/${blog.slug}`} className={styles.searchresult}>
                                {blog.title}
                            </a>
                        </div>
                    );
                })}
            </>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>


            <div className={styles.search}>
                <input type="search" className={styles.searchTerm} placeholder="Search" onChange={handleChange} />
                <button type="submit" className={styles.searchButton}>
                        Search                  
                </button>
            </div>

        </form>
    );

    return (
        <div>
            <div>{searchForm()}</div>
            {searched && <div style={{ marginTop: '20px', marginBottom: '20px', textAlign:"center" }}>{searchedBlogs(results)}</div>}
        </div>
    );
};

export default Search;