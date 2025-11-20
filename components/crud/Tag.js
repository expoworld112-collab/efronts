import { useState, useEffect } from 'react';
import { getCookie } from '../../actions/auth';
import { create, getTags, removeTag } from '../../actions/tag';
import dynamic from 'next/dynamic';
const AdminDashLayout = dynamic(() => import('../AdminDashLayout'), { ssr: false });
import styles0 from "../../styles/tagsCategory.module.css"
import Head from 'next/head';

const Tag = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false
    });


    const head = () => (
        <Head>
            <title>Create Tag</title>
        </Head>
    );



    const [ModalOpen, setModalOpen] = useState(false);
    const [currentBlogSlug, setCurrentBlogSlug] = useState("");


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


    const deleteTag = (slug) => {
        
        removeTag(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
            }
        });
    };


    const handleConfirmDelete = () => {
        deleteTag(currentBlogSlug);
        setModalOpen(false);
    };



    const { name, description, error, success, tags, removed, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        loadTags();
    }, [reload]);

    const loadTags = () => {
        getTags().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, tags: data });
            }
        });
    };



    const clickSubmit = e => {
        e.preventDefault();

        create({ name, description }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, error: false, success: true, name: '', description: '', removed: false, reload: !reload });
            }
        });
    };

    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' });
    };
    const handleChangedesc = e => {
        setValues({ ...values, description: e.target.value, error: false, success: false, removed: '' });
    };

    const showSuccess = () => {
        if (success) {
            return <p style={{ color: 'var(--text-color)' }}>Tag is created</p>;
        }
    };

    const showError = () => {
        if (error) {
            return <p style={{ color: 'var(--text-color)' }}>Tag already exist</p>;
        }
    };

    const showRemoved = () => {
        if (removed) {
            return <p style={{ color: 'var(--text-color)' }}>Tag is removed</p>;
        }
    };


    const showTags = () => {
        return tags.map((c) => {
            return (
                <div className={styles0.gridcontainer00} key={c.slug}>
                    <div className={styles0.griditem00}>{c.name}</div>
                    <div className={styles0.griditem02}>{c.description}</div>

                    {/* <button className={styles0.griditem03} onClick={() => deleteConfirm(c.slug)}>Delete</button> */}
                    <div onClick={() => showModal(c.slug)} className={styles0.griditem03}>Delete</div>


                    {ModalOpen && (
                        <div className="modal">
                            <div className="modalContent">
                                <div>Are you sure you want to delete this Tag ?</div>
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





    const newTagFom = () => (
        <>
            <div className={styles0.wrapper}>
                <form onSubmit={clickSubmit} autoComplete="off">
                    <div className={styles0.createCategory}>

                        <div className={styles0.name} >Name</div>
                        <input className={styles0.inputs} value={name} required onChange={handleChange} type="text" placeholder="Name" />
                        <div className={styles0.description} >Description</div>
                        <textarea value={description} onChange={handleChangedesc} rows={5} cols={40}></textarea>
                        <div>
                            <button className={styles0.addtagbtn} type="submit" >
                                Add New Tag
                            </button>
                        </div>
                    </div>
                </form>
                <div>
                <div style={{ textAlign: "center", height: "35px", marginBottom: "10px" }}>
                        {showSuccess()}
                        {showError()}
                        {showRemoved()}
                    </div>
                    <div className={styles0.gridcontainer000}>
                        <div className={styles0.griditem000} >Name</div>
                        <div className={styles0.griditem000} >Description</div>
                        <div className={styles0.griditem000} >Remove</div>
                    </div>
                    {showTags()}
                </div>
            </div>

        </>
    );

    return (
        <AdminDashLayout>
            {head()}
            <h1 className={styles0.Catname}>Tags</h1>
            <div>
                {newTagFom()}
            </div>
        </AdminDashLayout>
    );
};

export default Tag;