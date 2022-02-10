/* eslint-disable @next/next/no-page-custom-font */
import {
  Document,
  Html,
  DocumentHead,
  Main,
  BlitzScript,
  /*DocumentContext*/
} from 'blitz'

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en">
        <DocumentHead>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Cantata+One&family=DM+Sans:wght@400;500;700&family=IBM+Plex+Sans+Thai:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </DocumentHead>
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
