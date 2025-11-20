import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { singleStory, updateStory } from '../../actions/story';
import slugify from 'slugify';
import styles from "../../styles/storyeditor.module.css"

const StoryUpdate = ({ router }) => {

    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: new FormData(),
        title: '',
        coverphoto: '',
        description: '',
        slug: '',
        link: '',
        ads: '',
        lastheading: '',
        lastimage: '',
        publishstory: 'Update Story',
        slides: [],
    });

    const { error, success, formData, publishstory, title, coverphoto, description, slug, slides, link, lastheading, lastimage, ads } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initBlog();
    }, [router]);



    const [message, setMessage] = useState('');
    const editStory = e => {
        e.preventDefault();
        setValues({ ...values, publishstory: 'Updating....' });

        updateStory(formData, token, router.query.slug).then(data => {

            if (data.error) {
                setValues({ ...values });
                setMessage(data.error)

                function removemsg() {
                    setMessage("")
                }
                setTimeout(removemsg, 2500)
            }

            else {
                setValues({ ...values, success: `WebStory titled "${data.title}" is successfully updated` });
                let postslug = slugify(slug).toLowerCase();
                function redirect() {
                    Router.push(`/web-stories/${postslug}`);
                }
                setTimeout(redirect, 500)

            }
        });
    };


    const showError = () => (<div className={styles.error}>{message}</div>);
    const showSuccess = () => (<div className={styles.success}>{success}</div>);



    const initBlog = (res) => {
        if (router.query.slug) {
            singleStory(router.query.slug).then(data => {
                if (!data) {
                    if (!isAuth()) {
                        Router.push(`/signin`);
                    } else if (isAuth().role == 1) {
                        Router.push(`/admin`);
                    }
                    else if (isAuth().role !== 1) {
                        Router.push(`/`);
                    }

                } else {
                    // const isoDateString = data.date;
                    // const dateObject = parseISO(isoDateString);

                    setValues({ ...values, title: data.title, description: data.description, slug: data.slug, ads: data.ads, coverphoto: data.coverphoto, link: data.link, lastheading: data.lastheading, lastimage: data.lastimage, slides: data.slides });
                }
            });
        }
    };


    const handleAddSlide = () => {
        const updatedSlides = [...slides, { image: '', heading: '', paragraph: '' }];
        setValues({ ...values, slides: updatedSlides });
        formData.set('slides', JSON.stringify(updatedSlides));

    };


    const handleRemoveSlide = index => () => {
        const updatedSlides = [...slides];
        updatedSlides.splice(index, 1);
        setValues({ ...values, slides: updatedSlides });
        formData.set('slides', JSON.stringify(updatedSlides));
    };



    const handletitle = name => e => {
        const value = e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };


    const handleSlideChange = (index, property) => e => {
        const updatedSlides = [...slides];
        updatedSlides[index] = { ...updatedSlides[index], [property]: e.target.value };
        setValues({ ...values, slides: updatedSlides });
        formData.set('slides', JSON.stringify(updatedSlides));

    };



    const updateStoryForm = () => {
        return (
            <div className={styles.back}>
                <form onSubmit={editStory} >
                    <div className={styles.gridcontainer}>



                        {/* ---------------------------------------------------------------------------------------------------------------------- */}

                        <div className={styles.griditem2}>

                            {showError()}
                            {showSuccess()}

                            <button type='submit' className={styles.publishbtn}>{publishstory}</button>

                            <div>  <input className={styles.coverphoto} placeholder='Cover Photo Link' value={coverphoto} onChange={handletitle("coverphoto")} /></div>



                            <div className={styles.textarea}>
                                <textarea placeholder='Description' value={description} onChange={handletitle("description")} />
                            </div>

                            <input className={styles.slug} value={slug} placeholder='slug' onChange={handletitle("slug")} />

                            <br /><br /> <br /><br /> <br /><br /><br /><br />
                            <input className={styles.slug} value={ads} placeholder='Ads ?' onChange={handletitle("ads")} />
                            <br /><br /> <br /><br />

                            <input className={styles.slug} value={link} placeholder='Swipe Up Link' onChange={handletitle("link")} />
                            <input className={styles.slug} value={lastimage} placeholder='Lastimage' onChange={handletitle("lastimage")} />
                            <input className={styles.slug} value={lastheading} placeholder='Lastheading' onChange={handletitle("lastheading")} />

                        </div>
















                        <div className={styles.griditem1}>

                            <input placeholder='Web Story Title' className={styles.title} value={title} onChange={handletitle("title")} autoFocus={true} />

                            <div className={styles.slideContainer}>
                                {slides.map((slide, index) => (
                                    <div key={index} className={styles.slide}>
                                        <div className={styles.divspan}>  <span className={styles.storynum}>{index + 1}</span></div>

                                        

                                        <div className={styles.INP}>Image</div>
                                        <input type="text" placeholder="Image URL" value={slide.image} onChange={handleSlideChange(index, 'image')} />
                                        <div className={styles.INP}>Heading</div>
                                        <input type="text" placeholder="Heading" value={slide.heading} onChange={handleSlideChange(index, 'heading')} />
                                        <textarea placeholder="Paragraph" value={slide.paragraph} onChange={handleSlideChange(index, 'paragraph')} />


                                        <div className={styles.btncontainer}>
                                            <button type="button" onClick={handleRemoveSlide(index)} className={styles.removeslide}> 🗑 </button>
                                        </div>

                                    </div>
                                ))}
                                <button className={styles.addslide} type="button" onClick={handleAddSlide}> + </button>

                            </div>


                        </div>
                    </div>
                </form>
            </div>
        );
    };

    const head = () => (
        <Head><title>Update This Story</title></Head>  
    );

    return (
        <>
            {head()}
            {isAuth() && (<>{updateStoryForm()}</> )} 
        </>
    );
};

export default withRouter(StoryUpdate);