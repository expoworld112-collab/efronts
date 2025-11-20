
import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import fetch from "isomorphic-fetch";
import { API } from "@/config";
import { getCookie } from '../../actions/auth';
const token = getCookie('token');
const AdminDashLayout = dynamic(() => import('../AdminDashLayout'), { ssr: false });
import dynamic from "next/dynamic";
import styles from "../../styles/images.module.css";
import { useEffect } from "react";

function ImageGallary() {

    const [file, setFile] = useState("");
    const [images, setImages] = useState([]);
    const [imagescount, setImagescount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [copiedStatus, setCopiedStatus] = useState({});

    const [ModalOpen, setModalOpen] = useState(false);
    const [currentBlogSlug, setCurrentBlogSlug] = useState("");

    useEffect(() => { if (file.length > 0) { handleUpload(); } }, [file]);
    useEffect(() => { fetchData(); }, [currentPage]);


    const showModal = (slug) => {
        setModalOpen(true);
        setCurrentBlogSlug(slug);
    };

    const hideModel = () => {
        setModalOpen(false);
        setCurrentBlogSlug("");
    };

    const handleConfirmDelete = () => {
        handledelete(currentBlogSlug);
        setModalOpen(false);
        document.body.style.overflow = 'auto';
    };



    const getImages = async (page) => {
        try {
            const response = await fetch(`${API}/allimages?page=${page}`, { method: 'GET' });
            return await response.json();
        } catch (err) { return console.log(err); }
    };

    const fetchData = async () => {
        try {
            const data = await getImages(currentPage); setImages(data.data || []); setImagescount(data.totalImages || [])
        } catch (error) { console.error('Error fetching images:', error); }
    };

    function handleChange(event) { const selectedFiles = event.target.files; setFile(selectedFiles); }

    const handleUpload = () => {
        for (let i = 0; i < file.length; i++) {
            const storageRef = ref(storage, `/blogs/${file[i].name}-${Date.now()}`);
            const uploadTask = uploadBytesResumable(storageRef, file[i]);

            uploadTask.on("state_changed", () => { },
                (err) => { console.log(err); },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        saveUrlToMongoDB(url, token);
                        setImages(prevImages => [{ url, _id: Date.now() }, ...prevImages]);
                        // fetchData();
                    });
                });
        }
    };


    const saveUrlToMongoDB = async (url, token) => {
        try {
            const response = await fetch(`${API}/uploadimages`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ url })
            });
            return await response.json();
        } catch (err) { return console.log(err); }
    };


    const removeImage = async (url, token) => {
        try {
            const encodedUrl = encodeURIComponent(url);
            const response = await fetch(`${API}/images/search?url=${encodedUrl}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error(error); return { error: 'Failed to delete image' };
        }
    };

    const handleCopy = async (url) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopiedStatus(prevStatus => ({ ...prevStatus, [url]: true, }));
            setTimeout(() => { setCopiedStatus(prevStatus => ({ ...prevStatus, [url]: false, })); }, 2000);
        } catch (err) { console.error('Error copying to clipboard:', err); }
    };

    const handledelete = async (url) => {
        try {
            removeImage(url, token);
            const imageRef = ref(storage, url);
            await deleteObject(imageRef);
            fetchData();
        } catch (error) { console.error('Error Deleting:', error); }
    }


    const handlePageChange = (newPage) => { setCurrentPage(newPage); };

    return (
        <AdminDashLayout>

            <div className={styles.center}>
                {imagescount ? (<h3>Total &nbsp; Images &nbsp; - &nbsp; <span> {imagescount} </span></h3>) : (<></>)}
                <br />

                <div>
                    <label className={styles.fileInputLabel}>
                        Upload Images
                        <input type="file" className={styles.fileInput} onChange={handleChange} multiple accept="image/*" />
                    </label>
                </div>
            </div>

            <br />

            <div className={styles.pagination}>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span>{currentPage}</span>
                <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>

            <div className={styles.gridparent}>
                <div className={styles.grid}>
                    {images && images.map((image) => (
                        <div key={image._id} className={styles.card}>
                            <img src={image.url} alt={image.description} loading="lazy" className={styles.gallaryimages} />
                            <div className={styles.btnparent}>
                                <button onClick={() => handleCopy(image.url)}> {copiedStatus[image.url] ? 'URL Copied!' : 'Copy URL'}</button>

                                <div> <button className={styles.btn}  onClick={() => showModal(image.url)} >Delete </button></div>
                               
                            </div>
                        </div>
                    ))}
                </div>



                {ModalOpen && (
                    <div className="modal">
                        <div className="modalContent">
                            <div>Are you sure you want to delete this post ?</div>
                            <br />
                            <button className={styles.mbtn0} onClick={handleConfirmDelete}> DELETE</button>
                            <button className={styles.mbtn1} onClick={hideModel}>CANCEL</button>
                        </div>
                    </div>
                )}
            </div>

        </AdminDashLayout>
    );
}

export default ImageGallary