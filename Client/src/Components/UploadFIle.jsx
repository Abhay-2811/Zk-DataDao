import React from 'react'

const UploadFile = () => {
  const client = new Web3Storage({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEU0NjhDOTU2ZTM4MjQyMDlhMzdCNkVlZDZkQjExMTE4YzE3ZGQ0MzMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzk1MDU0NDc0NjAsIm5hbWUiOiJ1cGxvYWQifQ.XH3sRMYQyZMrJKoTba4xxJI5K-8zJvkCAuqRWuGtOBg'
  })
    const uploadFile = async () => {
        const fileToUpload = new File([file], file.name.split(' ').join(''), {
          type: file.type
        })
        console.log(fileToUpload);
        const fileSize = fileToUpload.size
        cid = await client.put([fileToUpload], {
          name: file.name
        })
        console.log(fileToUpload.size);
        carLink = `https://ipfs.io/ipfs/${cid}?format=car`
    
        // *TODO* is uploading == false
        return { cid: cid, fileSize: fileSize, imgUrl: carLink }
      }
  const dataDeal = async () => {
    try {
      setLC('Creating Data Deal On FVM .....')
      console.log('deal initiated ....')
      const _CID = new CID(cid) //careful - different data type of (cid), CID is from library , and _CID is the one here
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum)
        const signer = await provider.getSigner()
        dealClient = new ethers.Contract(contractAddress, contractABI, signer)
        const extraParamsV1 = [
          carLink,
          10000, //for @abhay - change this in future
          false,
          false
        ]
        const DealRequestStruct = [
          _CID.bytes,
          fileSize,
          false,
          cid,
          184200, //startEpoch - be sure to check while final deploy
          200000, // end epoch - '👆'
          0,
          0,
          0,
          1,
          extraParamsV1
        ]
        console.log(dealClient.interface)
        const transaction = await dealClient.makeDealProposal(DealRequestStruct)
        console.log('Proposing deal...')
        const receipt = await transaction.wait()
        console.log(receipt)

        dealClient.on('DealProposalCreate', (id, size, verified, price) => {
          console.log(id, size, verified, price)
        })

        console.log('Deal proposed! CID: ' + _CID)
        //after success everything is done
        setLoading(false)
        setSucess(true)
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
      return
    }
  }
  return <div>UploadFIle</div>
}

export default UploadFIle
