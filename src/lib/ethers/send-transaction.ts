import { IProvider } from "@web3auth/base";
import { ethers } from "ethers";

export const sendTransaction = async (
  provider: IProvider,
  destination: string,
  amount: string
) => {
  if (isNaN(parseFloat(amount))) throw new Error("amount mus be a number");
  if (parseFloat(amount) <= 0) throw new Error("amount must be greater than 0");
  const ethersProvider = new ethers.BrowserProvider(provider);
  const signer = await ethersProvider.getSigner();

  const tx = await signer.sendTransaction({
    to: destination,
    value: ethers.parseEther(amount),
  });

  await tx.wait();
};
