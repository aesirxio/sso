import React, { useEffect, useRef } from 'react';
import { WidgetInstance } from 'friendly-challenge';
import { toast } from 'react-toastify';

const FriendlyCaptcha = ({ setCaptcha }: any) => {
  const captchaRef = useRef<any>(null);
  const widget = useRef<any>();

  useEffect(() => {
    if (!widget.current && captchaRef.current) {
      widget.current = new WidgetInstance(captchaRef.current, {
        doneCallback: (solution) => {
          setCaptcha(solution);
        },
        errorCallback: (err) => {
          console.log(err);
          toast.error('There was an error when trying to solve the Captcha.');
        },
        startMode: 'none',
      });
    }
    return () => {
      if (widget.current != undefined) widget.current.reset();
    };
  }, [captchaRef]);

  return (
    <div
      ref={captchaRef}
      className="frc-captcha"
      data-sitekey={process.env.NEXT_PUBLIC_FRIENDLY_CAPTCHA}
    />
  );
};

export default FriendlyCaptcha;
