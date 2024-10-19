"use client"; // Ensure this line is at the top of the file
import React, { useState } from "react";
import Button from "./Button"; // Make sure this points to your Button component
import { useAccount, useConnect } from "wagmi";

const Header = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const { connectors, connect } = useConnect();
  const { isConnected } = useAccount(); // Use Wagmi's useConnect hook

  const togglePopup = () => {
    setPopupVisible((prev) => !prev);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[90%] h-[10vh] pl-4 pr-4 flex justify-between items-center">
        <h1 className="text-white text-[32px] font-bold">Ethereum</h1>
        <div >
          {
            isConnected? (
              <Button title={"Wallet Connected"} />
            ) : (
              <Button title={"Connect Wallet"} onClick={togglePopup}/>
            )
          }
        </div>

        {/* Popup for wallet options */}
        {isPopupVisible && (
          // Overlay for modal
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-600 rounded-lg shadow-lg w-[350px] p-4 relative">
              <button
                className="absolute top-2 right-5 text-[28px] text-white"
                onClick={togglePopup}
              >
                &times; {/* Close button as a cross */}
              </button>
              <h2 className="text-[32px] font-bold mb-4 text-center text-white">Connect Wallet</h2>
              <div className="w-[60%] flex flex-col m-auto gap-3">
                {connectors.map((connector) => (
                  <Button
                    key={connector.id}
                    onClick={() => {
                      connect({ connector });
                      togglePopup(); // Close popup after connecting
                    }}
                    title={connector.name}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
