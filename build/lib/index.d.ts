import React from 'react';

interface SSOButtonProps {
    className: string;
    text: string;
    loginText: string;
    loginBg?: string;
    onGetData: (data: any) => void;
    demoUser?: string;
    demoPassword?: string;
    noCreateAccount?: boolean;
    isRequireEmail?: boolean;
    customClass?: string;
    forgotPasswordLink?: string;
}
declare const SSOButton: React.FC<SSOButtonProps>;

declare const ConcordiumLogin: ({ onGetData }: any) => React.JSX.Element;

interface EmailLoginProps {
    onGetData: any;
    btnClass: string;
    spacingClass: string;
    noLabel: boolean;
    forgotPasswordLink?: string;
    demoUser?: string;
    demoPassword?: string;
}
declare const EmailLogin: React.FC<EmailLoginProps>;

interface SignUpButtonProps {
    className: string;
    text: string;
    loginBg?: string;
    isRequireEmail?: boolean;
    productOptions: Array<any>;
    customClass?: string;
    alertButton?: any;
}
declare const SignUpButton: React.FC<SignUpButtonProps>;

interface SignUpConcordiumProps {
    isRequireEmail?: boolean;
    productOptions: Array<any>;
    packagesData: any;
    defaultValues: Array<any>;
}
declare const SignUpConcordium: React.FC<SignUpConcordiumProps>;

declare const CreateAccount: ({ formID, setShow, setIsExist, setIsAccountExist, accountAddress, connection, wallet, noLogin, isNoWallet, packagesData, productOptions, productName, socialType, isRequireEmail, hideDefaultProduct, isRequireConcordium, defaultValues, alertButton, }: any) => React.JSX.Element;

declare const SSO: () => React.JSX.Element;

export { ConcordiumLogin, CreateAccount, EmailLogin, SSOButton, SSO as SSOConfig, SignUpButton, SignUpConcordium };
