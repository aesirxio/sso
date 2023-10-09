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
      return false;
    }
  };

  const verifySignature = async (wallet: any, publicAddress: string, signature: any) => {
    try {
      // Get return
      const returnParams = new URLSearchParams(window.location.search)?.get('return');
      const channelTypeParams = new URLSearchParams(window.location.search)?.get('channel_type');
      const organisationParams = new URLSearchParams(window.location.search)?.get('organisationId');

      const reqAuthFormData = {
        wallet: wallet,
        publicAddress: publicAddress,
        signature: signature,
        ...(channelTypeParams && { channel_type: channelTypeParams }),
        ...(returnParams && { return: returnParams }),
        ...(organisationParams && { organisationId: organisationParams }),
      };

      const config = {
        method: 'post',
        url: `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=walletLogin&api=hal&return=${
          returnParams ?? null
        }`,
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
