import React from 'react';
import SSOProvider from '../utils/SSOProvider';
import SSOHandle from './handle';
const SSOReact = ({ className, text }) => {
  return (
    <>
      <SSOProvider>
        <SSOHandle className={className} text={text} />
      </SSOProvider>
    </>
  );
};
export default SSOReact;
