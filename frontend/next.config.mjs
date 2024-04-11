// Import the withMDX function from '@next/mdx'
import withMDX from '@next/mdx';

// Provide an options object (even if empty)
const mdxConfig = withMDX();

// Configure the pageExtensions to include MDX files
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
};

export default { ...mdxConfig, ...nextConfig };
