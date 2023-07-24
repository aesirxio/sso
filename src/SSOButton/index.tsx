import React, { Suspense, useEffect, useState } from 'react';

const SSOModal = React.lazy(() => import('./modal'));

interface SSOButtonProps {
  className: string;
  text: string;
  onGetData: (data: any) => void;
}

const SSOButton: React.FC<SSOButtonProps> = ({ className, text = 'Login', onGetData }) => {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div className="aesirxsso">
      <button
        type="button"
        className={`btn ${className}`}
        data-bs-toggle="modal"
        data-bs-target="#ssoModal"
      >
        {text}
      </button>
      <Suspense fallback={<></>}>{domLoaded ? <SSOModal onGetData={onGetData} /> : null}</Suspense>
    </div>
  );
};

export default SSOButton;
