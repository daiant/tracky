import { IProvider } from "@web3auth/base";
import { ethers } from "ethers";

export const getAddress = async (provider: IProvider): Promise<string> => {
  try {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = signer.getAddress();

    return await address;
  } catch (error) {
    console.warn(error);
    return "";
  }
};
