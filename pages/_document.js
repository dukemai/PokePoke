import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link
            rel="stylesheet"
            href="/static/fonts/foundation-icons/foundation-icons.css"
            crossOrigin="anonymous"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="#Pokemon app"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-139405410-1"
          />
          <script src="/static/analytics.js" />
        </body>
      </html>
    );
  }
}
