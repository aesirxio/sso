import React, { Suspense } from 'react';
import { SSOModalContext } from './modal';
const SSOConcordiumProvider = React.lazy(() => import('../SSOButton/Providers/Concordium'));

const ConcordiumLogin = ({ onGetData }: any) => {
  const handleOnData = (data: any) => {
    onGetData(data);
  };
  return (
    <>
      <div>
        <SSOModalContext.Provider
          value={{
            handleOnData: handleOnData,
            toggle: () => {},
            demoUser: null,
            demoPassword: null,
            noCreateAccount: false,
            isSignUpForm: false,
            isRequireEmail: true,
          }}
        >
          <Suspense fallback={<>Loading...</>}>
            <SSOConcordiumProvider
              setIsAccountExist={() => {}}
              setExpand={() => {}}
              setAccountInfo={() => {}}
            />
          </Suspense>
        </SSOModalContext.Provider>
      </div>
    </>
  );
};

export default ConcordiumLogin;
