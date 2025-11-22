// pages/web-stories/index.jsx
import Layout from "@/components/Layout";
import { list } from "../../actions/story";
import styles from "../../styles/stories.module.css";
import { format } from "date-fns";
import Head from "next/head";
import { DOMAIN, APP_NAME } from "@/config";

const Stories = ({ stories = [] }) => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${DOMAIN}/web-stories/#organization`,
        "name": APP_NAME,
      },
      {
        "@type": "WebSite",
        "@id": `${DOMAIN}/web-stories/#website`,
        url: DOMAIN,
        name: APP_NAME,
        alternateName: APP_NAME,
        publisher: {
          "@id": `${DOMAIN}/web-stories/#organization`,
        },
        inLanguage: "pa",
      },
      {
        "@type": "CollectionPage",
        "@id": `${DOMAIN}/web-stories/#webpage`,
        url: `${DOMAIN}/web-stories/`,
        name: `Stories - ${APP_NAME}`,
        isPartOf: {
          "@id": `${DOMAIN}/web-stories/#website`,
        },
        inLanguage: "pa",
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Web Stories</title>
        <meta name="description" content={`Stories Archive - ${APP_NAME}`} />
        <meta
          name="robots"
          content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />
        <link rel="canonical" href={`${DOMAIN}/web-stories/`} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={`Stories - ${APP_NAME}`} />
        <meta property="og:description" content={`Stories - ${APP_NAME}`} />
        <meta property="og:url" content={`${DOMAIN}/web-stories/`} />
        <meta property="og:site_name" content={APP_NAME} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <Layout>
        <div className={styles.back}>
          <div className={styles.heading}>Web Stories</div>
          <div className={styles.grid}>
            {stories.map((story, index) => {
              const formattedDate = format(new Date(story.date), "dd MMM, yyyy");

              return (
                <div key={story._id || index} className={styles.cards}>
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img
                      src={story.coverphoto}
                      alt={story.title}
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <h2>
                    <a href={`/web-stories/${story.slug}`} target="_blank" rel="noopener noreferrer">
                      {story.title}
                    </a>
                  </h2>
                  <p>{formattedDate}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const data = await list();

  if (!data || data.error) {
    console.error(data?.error || "Failed to fetch stories");
    return { props: { stories: [] } };
  }

  return {
    props: { stories: data },
  };
}

export default Stories;
