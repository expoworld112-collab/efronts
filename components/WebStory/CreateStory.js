import { useState } from 'react';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { createwebstory } from '../../actions/story';
import styles from "../../styles/storyeditor.module.css"
import slugify from 'slugify';
import 'react-datepicker/dist/react-datepicker.css';



const CreateStory = () => {

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
        ads:'',
        lastheading: '',
        lastimage: '',
        publishstory: 'Publish Story',
        slides: Array(7).fill({ image: '', heading: '', paragraph: '' }),
    });

    const { error, success, formData, publishstory, title, coverphoto, description, slug, slides, link, lastheading, lastimage, ads } = values;
    const token = getCookie('token');


    const showError = () => (
        <div className={styles.error} style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className={styles.success} style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );





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


    const publishwebstory = e => {
        e.preventDefault();
        setValues({ ...values, publishstory: 'Publishing...' });
        createwebstory(formData, token).then(data => {
            if (data.error) { setValues({ ...values, error: data.error }); }
            else {
                setValues({ ...values, title: '', link: '', description: '', link: '', slides: [], coverphoto: '', ads:'', slug: '', error: '', success: `A story titled "${data.title}" is created` });
                let storyslug = slugify(slug).toLowerCase();
                function redirect() {
                    Router.replace(`/web-stories/${storyslug}`);
                }
                setTimeout(redirect, 200)
            }
        });
    };


    return (
        <div className={styles.back}>
            <form onSubmit={publishwebstory} >
                <div className={styles.gridcontainer}>
                    <div className={styles.griditem2}>
                        {showError()}
                        {showSuccess()}
                        <button type='submit' className={styles.publishbtn}>{publishstory}</button>

                      <div>  <input className={styles.coverphoto} placeholder='Cover Photo Link' value={coverphoto} onChange={handletitle("coverphoto")} /></div>

                        <div className={styles.textarea}>
                            <textarea placeholder='Description' value={description} onChange={handletitle("description")} />
                        </div>

                        <input className={styles.slug} value={slug} placeholder='slug' onChange={handletitle("slug")} />

                        <br/><br/> <br/><br/> <br/><br/><br/><br/>
                        <input className={styles.slug} value={ads} placeholder='Ads ?' onChange={handletitle("ads")} />
                         <br/><br/> <br/><br/>

                        <input className={styles.slug} value={link} placeholder='Swipe Up Link' onChange={handletitle("link")} />
                        <input className={styles.slug} value={lastimage} placeholder='Image' onChange={handletitle("lastimage")} />
                        <input className={styles.slug} value={lastheading} placeholder='Heading' onChange={handletitle("lastheading")} />

                    </div>



                    <div className={styles.griditem1}>

                        <input placeholder='Web Story Title' className={styles.title} value={title} onChange={handletitle("title")} autoFocus={true} />

                        <div className={styles.slideContainer}>
                            {slides.map((slide, index) => (
                                <div key={index} className={styles.slide}>
                                    <div className={styles.divspan}>  <span className={styles.storynum}>{index + 1}</span></div>


                                    <input type="text" placeholder="Image URL" value={slide.image} onChange={handleSlideChange(index, 'image')} />
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


                    {/* ---------------------------------------------------------------------------------------------------------------------- */}


                </div>
            </form>
        </div>
    )

};

export default CreateStory