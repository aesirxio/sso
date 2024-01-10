import React from 'react';
import '../SSOButton/styles/index.scss';
import { SSOModalContext } from '../SSOButton/modal';
import CreateAccount from '../SSOButton/Providers/CreateAccount';
interface SignUpConcordiumProps {
  isRequireEmail?: boolean;
  productOptions: Array<any>;
  packagesData: any;
}

const SignUpConcordium: React.FC<SignUpConcordiumProps> = ({
  isRequireEmail = false,
  productOptions = [],
  packagesData,
}) => {
  return (
    <>
      <div>
        <SSOModalContext.Provider
          value={{
            handleOnData: null,
            toggle: () => {},
            demoUser: null,
            demoPassword: null,
            noCreateAccount: false,
            isSignUpForm: true,
            isRequireEmail: isRequireEmail,
          }}
        >
          <CreateAccount
            noLogin={true}
            isNoWallet={true}
            setShow={true}
            packagesData={packagesData}
            productOptions={productOptions}
            isRequireEmail={isRequireEmail}
            isRequireConcordium={true}
          />
        </SSOModalContext.Provider>
      </div>
    </>
  );
};

export default SignUpConcordium;
