import Head from 'next/head';
import CenterContentLayout from '../layouts/CenterContent';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Techcast - Content Generator</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="เว็บนิยามคำศัพท์ by Techcast" />
        <meta property="og:image" content="https://cdn.statically.io/og/theme=dark/Content%20Generator.jpg" />
        <meta
          name="description"
          content="มา 'นิยาม' คำศัพท์ใหม่ๆ ด้วยกันเถอะ"
        />
      </Head>

      <CenterContentLayout>
        Hello world
      </CenterContentLayout>
    </div>
  )
}
