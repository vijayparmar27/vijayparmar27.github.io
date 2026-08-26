import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Work } from '@/components/sections/Work';
import { Experience } from '@/components/sections/Experience';
import { Capabilities } from '@/components/sections/Capabilities';
import { Stack } from '@/components/sections/Stack';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Work />
      <Experience />
      <Capabilities />
      <Stack />
      <Contact />
    </>
  );
}
