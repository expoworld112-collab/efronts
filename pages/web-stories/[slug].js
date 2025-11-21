import Head from "next/head";
import { singleStory, allslugs } from "../../actions/story";
import { API, DOMAIN, APP_NAME } from "../../config";
import Script from "next/script";
import { format } from "date-fns";
import React from "react";

export const config = { amp: true };

// -------------------------------------------
// Safe parser for slugs
// -------------------------------------------
async function getSafeSlugs() {
  try {
    const data = await allslugs();
    if (Array.isArray(data)) return data.filter(Boolean);
    // Try parsing if data is a JSON string
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed.filter(Boolean);
    } catch (err) {
      console.error("allslugs() returned invalid JSON:", data);
    }
    return [];
  } catch (err) {
    console.error("Error fetching slugs:", err);
    return [];
  }
}

// -------------------------------------------
// Story Component
// -------------------------------------------
const Stories = ({ story, errorCode }) => {
  if (errorCode) {
    return (
      <>
        <Head>
          <title>{`404 Error - ${APP_NAME}`}</title>
        </Head>
        <div style={{
          textAlign: "center",
          fontWeight: 800,
          fontSize: 30,
          marginTop: 200
        }}>
          404 Error! Story Not Found
        </div>
      </>
    );
  }

  const formattedDate = format(new Date(story.date), "dd MMM, yyyy");

  // JSON-LD schema for SEO
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${DOMAIN}/#organization`,
        "name": APP_NAME,
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
        "url": DOMAIN,
        "name": APP_NAME
      },
      {
        "@type": "ImageObject",
        "@id": story.coverphoto,
        "url": story.coverphoto,
        "width": "640",
        "height": "853"
      },
      {
        "@type": "WebPage",
        "@id": `${DOMAIN}/web-stories/${story.slug}/#webpage`,
        "url": `${DOMAIN}/web-stories/${story.slug}`,
        "name": story.title,
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
        "image": { "@id": story.coverphoto }
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );

  return (
    <>
      {head()}

      {/* AMP scripts */}
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
        {/* Cover page */}
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

        {/* Slides */}
        {story.slides?.map((slide, i) => (
          <amp-story-page key={i} id={`page${i}`} auto-advance-after="5s">
            <amp-story-grid-layer template="vertical">
              <amp-img src={slide.image} layout="responsive" width="720" height="1280" />
            </amp-story-grid-layer>
            <amp-story-grid-layer template="vertical" className="bottom">
              {slide.heading && <h2>{slide.heading}</h2>}
              <p>{slide.paragraph}</p>
            </amp-story-grid-layer>
          </amp-story-page>
        ))}

        {/* Last page with link */}
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

// -------------------------------------------
// Safe getStaticPaths
// -------------------------------------------
export async function getStaticPaths() {
  const slugs = await getSafeSlugs();

  return {
    paths: slugs.map(s => ({ params: { slug: s.slug || s } })),
    fallback: "blocking",
  };
}

// -------------------------------------------
// Safe getStaticProps
// -------------------------------------------
export async function getStaticProps({ params }) {
  let story = null;

  try {
    const data = await singleStory(params.slug);
    if (data && typeof data === "object") story = data;
  } catch (err) {
    console.error("Error fetching story:", err);
  }

  if (!story) {
    return { notFound: true };
  }

  return {
    props: { story },
    revalidate: 10,
  };
}

export default Stories;
