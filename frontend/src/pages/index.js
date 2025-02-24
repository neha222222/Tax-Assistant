import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { StickyProvider } from 'contexts/app/app.provider';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout';
import Banner from 'sections/banner';
import Services from 'sections/services';
import Jackpot from 'sections/jackpot';
import CallToAction from 'sections/call-to-action';
import Featured from 'sections/featured';
import Pricing from 'sections/pricing';
import Testimonials from 'sections/testimonials';
import Blogs from 'sections/blogs';
import FAQ from 'sections/faq';
import Subscribe from 'sections/subscribe';

import welcome from 'assets/welcome.png';
import process from 'assets/process.png';
import processing from 'assets/processing.png';
import summary from 'assets/summary.png';
import banner from 'assets/banner-mockups.png';

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <SEO title="Tubechat - Your AI Youtube Buddy" />
          <Banner />
          {/* <Services /> */}
          <Jackpot  heading="Download The TubeChat Chrome Extension"  image={welcome} />
          <CallToAction heading="Process the video " description="Video needs to be processed and model trained before use!" image={process} />
          <Jackpot  heading="Get High-Quality Summaries" description="Grasp all of the key points without watching the entire video."  image={summary} />
          <CallToAction heading="Ask anything about the video you're watching
" description="Ask questions, find timestamps, and dive deeper into the video, all without pausing or switching tabs!" image={banner} />

          {/* <Featured /> */}
          {/* <Pricing /> */}
          {/* <Testimonials /> */}
          {/* <Blogs /> */}
          {/* <FAQ /> */}
          <Subscribe />
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  );
}
