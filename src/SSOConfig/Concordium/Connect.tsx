import React from 'react';
import { Button } from 'react-bootstrap';
import { isDesktop } from 'react-device-detect';
import { BROWSER_WALLET } from '../../SSOButton/Providers/Concordium/config';
import { Image } from '../../components/Image';
import concordium_logo from '../../SSOButton/images/concordium.png';

const Connect = (props: any) => {
  return (
    <div>
      {isDesktop && (
        <>
          <Button
            type="button"
            className={`fw-semibold text-white w-100  d-flex align-items-center justify-content-center `}
            variant={'success'}
            onClick={() => props.setActiveConnectorType(BROWSER_WALLET)}
          >
            <Image src={concordium_logo} alt="concordium-logo" width={20} height={21} />
            <span className="ms-2">Browser Wallet</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default Connect;
