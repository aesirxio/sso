import { toast } from 'react-toastify';
import axios from 'axios';
import { getClientApp } from '../utils';

const useWallet = (wallet: any, publicAddress: string) => {
  const { endpoint } = getClientApp();

  const getWalletNonce = async () => {
    try {
      const reqAuthFormData = {
        publicAddress: publicAddress,
        wallet: wallet,
        text: `Login with nonce: {}`,
      };

      const config = {
        method: 'post',
        url: `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=getWalletNonce&api=hal`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: reqAuthFormData,
      };
      const { data } = await axios(config);

      if (data.result) {
        return data.result;
      }
      throw false;
    } catch (error) {
      toast('Wrong authentication', { closeOnClick: false });
      return false;
    }
  };

  const verifySignature = async (wallet: any, publicAddress: string, signature: any) => {
    try {
      const reqAuthFormData = {
        wallet: wallet,
        publicAddress: publicAddress,
        signature: signature,
      };

      const config = {
        method: 'post',
        url: `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=walletLogin&api=hal`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: reqAuthFormData,
      };

      const { data } = await axios(config);
      if (data?.result) {
        return data?.result;
      } else {
        throw false;
      }
    } catch (error) {
      console.log(error);
      toast('Wrong authentication', { closeOnClick: false });
      return false;
    }
  };

  return { getWalletNonce, verifySignature };
};

export default useWallet;
