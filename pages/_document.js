import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style amp-custom="" dangerouslySetInnerHTML={{
            __html: `
              amp-story-page {
                 background-image: url("/wall.jpg");
              }
              amp-story-grid-layer{
                margin: auto;
              }
              amp-story-page h1{
                font-weight: 800;
                font-size: 28px;
                line-height: 1.5;
                color: white;
                text-transform: capitalize;
                font-family: Arial, Helvetica, sans-serif;
                padding-left: 20px;
                padding-right: 20px;
                padding-bottom: 25px;
                word-wrap: break-word;
              }
              amp-story-page h3 {
                font-weight: 800;
                font-size: 28px;
                line-height: 1.5;
                color: white;
                text-transform: capitalize;
                font-family: Arial, Helvetica, sans-serif;
                padding-left: 20px;
                padding-right: 20px;
                padding-bottom: 45px;
                word-wrap: break-word;
              }
              amp-story-page h2 {
                font-weight: 800;
                font-size: 30px;
                line-height: 1.5;
                color: white;
                text-transform: capitalize;
                font-family: Arial, Helvetica, sans-serif;
                text-align: center;
                padding-left: 20px;
                padding-right: 20px;
                word-wrap: break-word;
              }
              amp-story-page p {
                padding-left: 20px;
                padding-right: 20px;
                font-weight: 700;
                font-size: 20px;
                line-height: 1.6;
                color: white;
                font-family: Arial, Helvetica, sans-serif;
              }
              amp-story-grid-layer.bottom {
                align-content: end;
                padding-bottom: 60px;
              }
              .myclass amp-story-grid-layer.bottom{
                padding-bottom: 40px;
              }
              amp-story-grid-layer.noedge {
                padding: 0px;
              }
              amp-story-grid-layer.center-text {
                align-content: center;
              }
              amp-img {
                height: 40vh;
              }
            `
          }} />
        </>
      )
    };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
