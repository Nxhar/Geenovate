// components/DynamicMarkdownRenderer.js
import React from 'react';
import { MDXProvider } from '@mdx-js/react';

const DynamicMarkdownRenderer = ({ content }) => {
  // You can provide custom components for MDX rendering here if needed
  const components = {};

  return (
    <div className='prose'>
      <MDXProvider components={components}>
        {/* Render the MDX content as a React component */}
        {React.createElement(() => content)}
      </MDXProvider>
    </div>
  );
};

export default DynamicMarkdownRenderer;
