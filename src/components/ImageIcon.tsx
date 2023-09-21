import React from 'react';
interface ImageIcon {
  width?: number;
  height?: number;
  src: string;
  className?: string;
}

const ImageIcon = ({ width, height, src, className }: ImageIcon) => {
  return (
    <span
      className={`icon-image d-inline-block align-text-bottom ${className}`}
      style={{
        width: `${width ?? 24}px`,
        height: `${height ?? 24}px`,
        WebkitMaskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
      }}
    ></span>
  );
};

export default ImageIcon;
