import React, { Suspense } from 'react';
import { SSOModalContext } from './modal';
const SSOEmailProvider = React.lazy(() => import('../SSOButton/Providers/Email'));
interface EmailLoginProps {
  onGetData: any;
  btnClass: string;
  spacingClass: string;
  noLabel: boolean;
}
const EmailLogin: React.FC<EmailLoginProps> = ({ onGetData, btnClass, spacingClass, noLabel }) => {
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
            demoUser: '',
            demoPassword: '',
            noCreateAccount: false,
            isSignUpForm: false,
            isRequireEmail: false,
          }}
        >
          <div className="control-group">
            <Suspense fallback={<>Loading...</>}>
              <SSOEmailProvider btnClass={btnClass} spacingClass={spacingClass} noLabel={noLabel} />
            </Suspense>
          </div>
        </SSOModalContext.Provider>
      </div>
    </>
  );
};

export default EmailLogin;
