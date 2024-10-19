"use client"
import React, { useEffect, useState } from 'react'
import { BackgroundGradient } from './ui/background-gradient';
import Button from './Button';
import { useAccount, useBalance, useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'
import { isAddress } from 'viem';
import { toast } from 'sonner';

// 0x918e6C05ddE98a4ef7D175ED849e1D074CEfd3D0

interface AccountInfoProps {
  setSend: React.Dispatch<React.SetStateAction<boolean>>; // Correct type for setSend
}
const SendEth = ({ setSend }: AccountInfoProps) => {
  const [recaddress, setRecAddress] = useState("");
  const [amount, setAmount] = useState("");
  const {  sendTransaction } = useSendTransaction()
  const [sending, setSending] = useState(false);
  const [setError, setSetError] = useState("");
  const { address } = useAccount();

  const { data: balanceData } = useBalance({
    address,
  });

  useEffect(() => {
    if(amount > balanceData?.formatted.toString()){
      setSetError("* Insufficient balance")
      return;
    }else if(amount <= balanceData?.formatted.toString()){
      setSetError("")
      return;
    }
  }, [amount,balanceData?.formatted])
  

  
  const handleSend = async () => {
      console.log("sending....");
      setSending(true);
  
      // Validate the Ethereum address
      if (!isAddress(recaddress)) {
        console.error("Invalid Ethereum address");
        toast("Invalid Ethereum address")
        return;
      }
  
      // Validate the amount
      if (!amount || parseFloat(amount) <= 0) {
        console.error("Amount must be a positive number");
        toast("Amount must be a positive number !!")
        return;
      }
  
      try {
        const txHash = await sendTransaction({
          to: address,                // Use 'to' for the recipient's address
          value: parseEther(amount),  // Use 'value' for the amount of ETH to send
        });
        console.log("Transaction Hash:", txHash);
        toast("Transaction sent successfully!")
        setSending(false);
      } catch (error) {
        toast(`Error sending transaction ${error}`)
        console.error("Error sending transaction:", error);
        setSending(false);
      }
  };
  return (
    <div>
       <BackgroundGradient className="rounded-[22px]  max-w-[35rem] p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <div className='flex flex-col mb-5'>
        <input  type="text" className='w-[350px] bg-transparent border border-gray-600 p-2 text-white text-[20px] rounded-xl ' placeholder='Enter Recipient Address  ' onChange={(e)=> setRecAddress(e.target.value)} />
        <input type="number" className='w-[350px] bg-transparent border border-gray-600 p-2 text-white text-[20px] rounded-xl mt-5 ' placeholder='Enter Amount ' onChange={(e)=> setAmount(e.target.value)} />
        <p className='text-red-600 mt-3'>{setError.length > 0 && (setError)}</p>
        </div>
        <div className="flex justify-between items-center">
          {
            sending? (
              <Button title={"Sending..."}  />
            ) : setError ? (
              <Button title={"Insufficient Balance"} disabled={true}  />
            ) :(
              <Button title={"Send"} onClick={handleSend} />
            )
          }
          <Button title={"Close"} onClick={() => setSend(false)}  />
        </div>
      </BackgroundGradient>
    </div>
  )
}

export default SendEth