import React, { Suspense } from 'react';
import { SSOModalContext } from './modal';
import SSOEmailProvider from '../SSOButton/Providers/Email';
interface EmailLoginProps {
  onGetData: any;
  btnClass: string;
  spacingClass: string;
  noLabel: boolean;
  forgotPasswordLink?: string;
  demoUser?: string;
  demoPassword?: string;
}
const EmailLogin: React.FC<EmailLoginProps> = ({
  onGetData,
  btnClass,
  spacingClass,
  noLabel,
  forgotPasswordLink,
  demoUser,
  demoPassword,
}) => {
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
            demoUser: demoUser ?? '',
            demoPassword: demoPassword ?? '',
            noCreateAccount: false,
            isSignUpForm: false,
            isRequireEmail: false,
          }}
        >
          <div className="control-group">
            <Suspense fallback={<>Loading...</>}>
              <SSOEmailProvider
                btnClass={btnClass}
                spacingClass={spacingClass}
                noLabel={noLabel}
                forgotPasswordLink={forgotPasswordLink}
              />
            </Suspense>
          </div>
        </SSOModalContext.Provider>
      </div>
    </>
  );
};

export default EmailLogin;
