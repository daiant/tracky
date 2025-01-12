import { IProvider } from "@web3auth/base";
import { ethers } from "ethers";

export const sendTransaction = async (
  provider: IProvider,
  destination: string,
  amount: string
) => {
  const ethersProvider = new ethers.BrowserProvider(provider);
  const signer = await ethersProvider.getSigner();

  const tx = await signer.sendTransaction({
    to: destination,
    value: ethers.parseEther(amount),
  });

  await tx.wait();
};
