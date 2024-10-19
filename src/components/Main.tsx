"use client";
import React, { useState } from 'react'
import {AccountInfo} from './AccountInfo'
import SendEth from './SendEth'

const Main = () => {
    const [send, setSend] = useState(false);
  return (
    <div className='h-full w-full flex justify-center items-center '>
        {
            send ?
            <SendEth setSend={setSend}/>
            :
            <AccountInfo setSend={setSend} />
        }

    </div>
  )
}

export default Main