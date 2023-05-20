//  Dao creater creates DAO =>
//    Input data (dao name, dao capacity, duration, restrictions (zkp), DAO name )
//  Table 1 : Data of all dao's (Try through contract)=>
//    Schema: DAO contract address, Creator Address, Dao name, duration, capacity, contributors number(edited later), min commits
//  Table 2 : Contribution details =>
//    Schema: Contributer Address, DAO contract address, Contribution numbers

import React, {  useState } from 'react'
import Select from 'react-select'
import './create.css'
import { createWalletClient, http, custom, createPublicClient } from 'viem'
import { polygonMumbai } from 'viem/chains'
import { ContractData } from '../Constants/contract'
import { useAccount } from 'wagmi'
import { Loader } from '../Components/Loader'
import UploadFile from '../Components/UploadFIle'

const SelectedOption = props => {
  if (props.option === 'Age') {
    return (
      <>
        <label htmlFor='' style={{ marginTop: '10px' }}>
          Age range
        </label>
        <input
          style={{ margin: '10px 0 10px 0' }}
          placeholder='min age'
          type='number'
        />
      </>
    )
  }
  if(props.option ==='Discord'){
    return(
      <>
        <label htmlFor='' style={{ marginTop: '10px' }}>
          Dicord Channel
        </label>
        <input
          style={{ margin: '10px 0 10px 0' }}
          placeholder='Discord Channel'
          type='text'
        />
      </>
    )
  }
  if (props.option === 'Social') {
    return (
      <p style={{ margin: '10px 0 10px 0',
      border: '2px solid rgb(200, 200, 200)',
      borderRadius: '20px',
      width: '100%',
      padding: '0.8em',
    color:'red'}}>Feature not available yet !</p>
    )
  }
}

const Create = () => {
  const [selected, setSelected] = useState();
  const [hash,setHash] = useState();
  const [loading,setLoading] = useState(false);
  const [deployed,setDeployed] = useState({bool:false,address:''});
  const {address} = useAccount();
  
  const walletClient = createWalletClient({
    chain: polygonMumbai,
    transport: custom(window.ethereum)
  });

  const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http()
  })

  const deployContract = async()=>{
    setLoading(true)
    if(address){
      const hash = await walletClient.deployContract({
      ...ContractData,
      account: address,
    });
    setHash(hash);
    const receipt = await publicClient.waitForTransactionReceipt({hash});
    console.log(receipt.contractAddress);
    setDeployed({bool: true,address: receipt.contractAddress});
    setLoading(false)
  }
  }

  const zkpOptions = [
    { label: 'None', value: 'none' },
    { label: 'Age restriction', value: 'Age' },
    { label: 'Twitter following restriction', value: 'Social' },
    {label: 'Follow Discord Server', value: 'Discord'}
  ]

  return (
    <>
    {
      loading ? <div style={{marginLeft:'50%',marginTop:'20%'}}><Loader /></div> : 
      <>
      {deployed.bool ? 
      <div >Contract deployed to <a href={`https://mumbai.polygonscan.com/address/${deployed.address}`} target='_blank'>{deployed.address}</a></div>
      :
      <div className='create-dao'>
        <h2>Create DAO</h2>

        <label htmlFor="daoName">DAO Name</label>
        <input type="text" id='daoName'/>

        <label htmlFor='daoCapacity'>Dao Capacity</label>
        <input type='number' id='daoCapacity' min={1} />

        <label htmlFor='DAOend'>DAO End Date</label>
        <input type='date' name='DAOend' id='DAOend' />

        <label htmlFor='daoCapacity'>
          DAO reward (this will be distributed equally among contributers)
        </label>
        <input type='number' id='daoCapacity' min={1} />

        <label htmlFor="req">Data Format Requirements</label>
        <UploadFile />

        <label htmlFor='zkpOtions'>ZKP options</label>
        <Select
          className='basic-single'
          classNamePrefix='select'
          name='zkpOtions'
          options={zkpOptions}
          onChange={e => setSelected(e.value)}
        />

        {selected && <SelectedOption option={selected} />}
        <button className='create-button' onClick={deployContract} >
          <span class='button_top'> Create Dao</span>
        </button>
      </div> 
      }
      </>
    }
  </>    
  )
}

export default Create
