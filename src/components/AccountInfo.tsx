"use client";
import {
  useAccount,
  useBalance,
  useDisconnect,
} from "wagmi";
import { BackgroundGradient } from "./ui/background-gradient";
import Button from "./Button";
import { toast } from "sonner";

interface AccountInfoProps {
  setSend: React.Dispatch<React.SetStateAction<boolean>>; // Correct type for setSend
}

export function AccountInfo({ setSend }: AccountInfoProps) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: balanceData, isError, isLoading } = useBalance({
    address,
  });

  function shortenAddress(address: any) {
    return `${address.slice(0, 4)}...${address.slice(-2)}`;
  }
  
  const ShortAdd = address ? shortenAddress(address) : "";

  return (
    <div>
      {
        address ? 
      <BackgroundGradient className="rounded-[22px]  max-w-[35rem] p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <div className="w-[30rem] h-auto flex justify-between items-center gap-10 p-3 mb-6 ">
        <p
          className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 cursor-pointer flex gap-3 justify-between items-center  "
        >
          Address: {ShortAdd} <img src="https://cdn-icons-png.flaticon.com/128/8860/8860785.png" alt="copy" width={25} height={15} onClick={() => {
            navigator.clipboard.writeText(`${address}`)
            toast("Copied to clipboard")
            }} />
        </p>
        <p className="text-base sm:text-xl">
          Balance: 
          {isLoading ? (
            "Loading..."
          ) : isError ? (
            "Error fetching balance"
          ) : (
            ` ${balanceData?.formatted} ETH`
          )}
        </p>
        </div>
        <div className="flex justify-between items-center">
          <Button title={"Disconnect"} onClick={() => disconnect()} />
          <Button title={"Send Eth"} onClick={() => setSend(true)} />
        </div>
      </BackgroundGradient>
        :
      <BackgroundGradient className="rounded-[22px] max-w-[35rem] p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <p
          className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 cursor-pointer"
        >
          Please Connect your Wallet.
        </p>
      </BackgroundGradient>
      }
    </div>
  );
}
