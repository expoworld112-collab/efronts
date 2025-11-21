import Head from "next/head";
import { singleStory, allslugs } from "../../actions/story";
import { API, DOMAIN, APP_NAME, MY_API } from "../../config";
import Script from "next/script";
import { format } from "date-fns";
import React from "react";

export const config = { amp: true };

// -------------------------------------------------------
// SAFE getAllBlogSlugs() wrapper (fix for build crash)
// -------------------------------------------------------
async function getAllBlogSlugs() {
  try {
    const slugs = await allslugs();

    if (!Array.isArray(slugs)) {
      console.error("Invalid slugs response:", slugs);
      return [];
    }

    return slugs;
  } catch (err) {
    console.error("getAllBlogSlugs() failed:", err);
    return [];
  }
}

// -------------------------------------------------------

const Stories = ({ story, errorCode }) => {

  if (errorCode) {
    return (
      <>
        <Head>
          <title>{`404 Error - ${APP_NAME}`}</title>
        </Head>

        <div style={{ 
          textAlign: "center", 
          fontWeight: "800", 
          fontSize: "30px", 
          marginTop: "200px" 
        }}>
          404 Error! Story Not Found
        </div>
      </>
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${DOMAIN}/#organization`,
        "name": `${APP_NAME}`,
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.liquorprices.in/wp-content/uploads/2023/06/cropped-Logo-1.png",
          "width": "96",
          "height": "96"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${DOMAIN}/#website`,
        "url": `${DOMAIN}`,
        "name": `${APP_NAME}`
      },
      {
        "@type": "ImageObject",
        "@id": `${story.coverphoto}`,
        "url": `${story.coverphoto}`,
        "width": "640",
        "height": "853"
      },
      {
        "@type": "WebPage",
        "@id": `${DOMAIN}/web-stories/${story.slug}/#webpage`,
        "url": `${DOMAIN}/web-stories/${story.slug}`,
        "name": `${story.title}`,
        "datePublished": story.date,
        "dateModified": story.date
      },
      {
        "@type": "NewsArticle",
        "headline": `${story.title} - ${APP_NAME}`,
        "datePublished": story.date,
        "dateModified": story.date,
        "description": story.description,
        "@id": `${DOMAIN}/web-stories/${story.slug}/#richSnippet`,
        "image": { "@id": `${story.coverphoto}` }
      }
    ]
  };

  const head = () => (
    <Head>
      <title>{`${story.title} - ${APP_NAME}`}</title>
      <meta name="description" content={story.description} />
      <meta property="og:title" content={`${story.title} - ${APP_NAME}`} />
      <meta property="og:image" content={story.coverphoto} />
      <link rel="canonical" href={`${DOMAIN}/web-stories/${story.slug}`} />
      <script type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
      />
    </Head>
  );

  const formattedDate = format(new Date(story.date), "dd MMM, yyyy");

  return (
    <>
      {head()}

      <Script src="https://cdn.ampproject.org/v0.js" async />
      <Script custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js" async />
      <Script custom-element="amp-story-auto-analytics" src="https://cdn.ampproject.org/v0/amp-story-auto-analytics-0.1.js" async />

      <amp-story
        standalone=""
        title={story.title}
        publisher={APP_NAME}
        publisher-logo-src="http://www.liquorprices.in/wp-content/uploads/2023/09/logologo.png"
        poster-portrait-src={story.coverphoto}
      >
        <amp-story-page id="cover" auto-advance-after="4s">
          <amp-story-grid-layer template="vertical">
            <amp-img src={story.coverphoto} layout="responsive" width="720" height="1280" />
          </amp-story-grid-layer>

          <amp-story-grid-layer template="vertical" className="bottom">
            <h1>{story.title}</h1>
            <p>{`By ${APP_NAME} Team`}</p>
            <p>{formattedDate}</p>
          </amp-story-grid-layer>
        </amp-story-page>

        {story.slides.map((slide, i) => (
          <React.Fragment key={i}>
            <amp-story-page id={`page${i}`} auto-advance-after="5s">
              <amp-story-grid-layer template="vertical">
                <amp-img src={slide.image} layout="responsive" width="720" height="1280" />
              </amp-story-grid-layer>

              <amp-story-grid-layer template="vertical" className="bottom">
                {slide.heading && <h2>{slide.heading}</h2>}
                <p>{slide.paragraph}</p>
              </amp-story-grid-layer>
            </amp-story-page>
          </React.Fragment>
        ))}

        {story.link && story.lastheading && story.lastimage && (
          <amp-story-page id="lastpage">
            <amp-story-grid-layer template="vertical">
              <amp-img src={story.lastimage} layout="responsive" width="720" height="1280" />
            </amp-story-grid-layer>

            <amp-story-grid-layer template="vertical" className="bottom">
              <h3>{story.lastheading}</h3>
            </amp-story-grid-layer>

            <amp-story-cta-layer>
              <a href={story.link} className="button">Click Here</a>
            </amp-story-cta-layer>
          </amp-story-page>
        )}

        <amp-story-auto-analytics gtag-id="G-D18GTPG2SJ" />
      </amp-story>
    </>
  );
};

// -------------------------------------------------------
// FIXED getStaticPaths (SAFE, NO BUILD CRASH)
// -------------------------------------------------------

export async function getStaticPaths() {
    let slugs = [];

    try {
        const data = await allslugs();

        // Ensure it's an array
        if (Array.isArray(data)) {
            slugs = data;
        }
    } catch (err) {
        console.error("Error loading slugs:", err);
        slugs = [];
    }

    // Safe return
    return {
        paths: slugs.map((s) => ({
            params: { slug: s.slug || s },
        })),
        fallback: 'blocking' // prevents build crash
    };
}
// -------------------------------------------------------

// export async function getStaticProps({ params }) {
//   try {
//     const story = await singleStory(params.slug);

//     if (!story) {
//       return { props: { errorCode: 404 } };
//     }

//     return { props: { story } };
//   } catch (error) {
//     console.error("getStaticProps error:", error);
//     return { props: { errorCode: 500 } };
//   }
// }
export async function getStaticProps({ params }) {
    let story = null;

    try {
        const data = await singleStory(params.slug);

        if (data && typeof data === "object") {
            story = data;
        }
    } catch (err) {
        console.error("Error loading story:", err);
    }

    // Prevent crash if null
    if (!story) {
        return {
            notFound: true
        };
    }

    return {
        props: { story },
        revalidate: 10
    };
}
export default Stories;
