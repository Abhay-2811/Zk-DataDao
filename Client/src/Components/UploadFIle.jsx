import React, { useState } from 'react'
import { useContractWrite, useAccount } from 'wagmi'
import { dealClient } from '../Constants/contract'
import lighthouse from '@lighthouse-web3/sdk'
const CID = require('cids')

const UploadFile = () => {
  const { address,isConnected } = useAccount()
  const { write } = useContractWrite({
    address: dealClient.address,
    abi: dealClient.abi,
    chainId: 3141,
    functionName: 'makeDealProposal',
    onSuccess (data) {
      console.log(data)
    }
  });


  // helper function for upload img function
  const progressCallback = progressData => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2)
    console.log(percentageDone)
  }
  const uploadFile = async (e) => {
    const output = await lighthouse.upload(
      e,
      process.env.REACT_APP_LHAPI,
      progressCallback
    );
    const file = e.target.files;
    console.log(file[0].size);
    const fileSize = file[0].size;
    console.log('File Status:', output)
    console.log(
      'Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash
    )
    const hash = output.data.Hash;
    console.log(hash);

    const carLink = `https://ipfs.io/ipfs/${hash}?format=car`
    await dataDeal(hash,carLink,fileSize);

  }


  const dataDeal = async (cid, carLink, fileSize) => {
    try {

      console.log('deal initiated ....')
      console.log(cid);
      console.log(carLink);
      console.log(fileSize);
      const cidHexRaw = new CID(cid).toV1().toString('base16').substring(1)
      const cidHex = "0x" + cidHexRaw
      if (isConnected) {
          const extraParamsV1 = [carLink, 10000, false, false]
          const DealRequestStruct = [
              cidHex,
              fileSize,
              false,
              cid,
              300200, //startEpoch - be sure to check while final deploy
              370000, // end epoch - '👆'
              0,
              0,
              0,
              1,
              extraParamsV1
            ]
            write({
                args: [DealRequestStruct],
                from: address
              });
      }
    } catch (error) {
      console.log(error)
      return
    }
  }
  return (
    <input type='file' name='DAOres' id='res' onChange={(e)=>{uploadFile(e)}} />
  )
}

export default UploadFile
