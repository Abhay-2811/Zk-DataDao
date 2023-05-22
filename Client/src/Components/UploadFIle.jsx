import React, { useState } from 'react'
import { useContractWrite, useAccount, useWaitForTransaction } from 'wagmi'
import { dealClient } from '../Constants/contract'
import lighthouse from '@lighthouse-web3/sdk'
import { ClipLoader  } from 'react-spinners'
const CID = require('cids')

const UploadFile = (props) => {
  const { address,isConnected } = useAccount()
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const { write,data } = useContractWrite({
    address: dealClient.address,
    abi: dealClient.abi,
    chainId: 3141,
    functionName: 'makeDealProposal',
  });
  const waitForTransaction = useWaitForTransaction({
    chainId: 3141,
    hash: data?.hash,
    onSuccess(data){
        setUploaded(true)
    }
    })


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
    props.parentCallback(hash);
    const carLink = `https://ipfs.io/ipfs/${hash}?format=car`
    await dataDeal(hash,carLink,fileSize);

  }


  const dataDeal = async (cid, carLink, fileSize) => {
    try {
      console.log('deal initiated ....')
      setUploading(true);
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
    <div >
    {uploading ? 
    <div style={{ margin: '10px 0 10px 0',
        border: '2px solid rgb(200, 200, 200)',
        borderRadius: '20px',
        width: '100%',
        padding: '0.8em'}}>{uploaded ? <span> ✅ Data deal created </span> : <span> <ClipLoader size={15} /> Creating Data Deal on FVM</span>} </div>:
    <input type='file' name='DAOres' id='res' onChange={(e)=>{uploadFile(e)}} />
    }
    <span></span>
    </div>
  )
}

export default UploadFile
