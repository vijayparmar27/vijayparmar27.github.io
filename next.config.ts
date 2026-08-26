import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* GitHub Pages serves plain files — emit a fully static site into out/. */
  output: 'export',

  /* The Image Optimization API needs a server; static export has none. */
  images: { unoptimized: true },

  /* Pages resolves /work/ -> /work/index.html, so emit directory-style routes. */
  trailingSlash: true,
};

export default nextConfig;
