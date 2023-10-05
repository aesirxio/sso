import React from 'react';
const CreateMarkup = ({ htmlString, className }: any) => {
  return <span className={className ?? ''} dangerouslySetInnerHTML={{ __html: htmlString }}></span>;
};
export default CreateMarkup;
