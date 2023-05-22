//  Dao creater creates DAO =>
//    Input data (dao name, dao capacity, duration, restrictions (zkp), DAO name )
//  Table 1 : Data of all dao's (Try through contract)=>
//    Schema: DAO contract address, Creator Address, Dao name,  capacity, contributors number(edited later), min commits
//  Table 2 : Contribution details =>
//    Schema: Contributer Address, DAO contract address, Contribution numbers

import React, { useState } from 'react'
import Select from 'react-select'
import './create.css'
import { createWalletClient, http, custom, createPublicClient } from 'viem'
import { filecoinHyperspace } from 'viem/chains'
import { ContractData } from '../Constants/contract'
import { useAccount } from 'wagmi'
import { Loader } from '../Components/Loader'
import UploadFile from '../Components/UploadFIle'
import { Database } from '@tableland/sdk'

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
  if (props.option === 'Discord') {
    return (
      <>
        <label htmlFor='' style={{ marginTop: '10px' }}>
          Dicord Channel
        </label>
        <input
          style={{ margin: '10px 0 10px 0' }}
          placeholder='Discord Channel'
          type='text'
          onChange={(e)=>{e.preventDefault(); props.parentCallback(e.target.value)}}
        />
      </>
    )
  }
  if (props.option === 'Social') {
    return (
      <p
        style={{
          margin: '10px 0 10px 0',
          border: '2px solid rgb(200, 200, 200)',
          borderRadius: '20px',
          width: '100%',
          padding: '0.8em',
          color: 'red'
        }}
      >
        Feature not available yet !
      </p>
    )
  }
}

const Create = () => {
  const [selected, setSelected] = useState()
  const [hash, setHash] = useState()
  const [loading, setLoading] = useState(false)
  const [deployed, setDeployed] = useState({ bool: false, address: '' })
  const { address } = useAccount()

  // inputs
  const [daoName, setName] = useState();
  const handleNameChange = (e)=>{
    e.preventDefault();
    setName(e.target.value)
  }
  const [daoCapacity, setCapacity] = useState(0);
  const handleCapacityChange = (e)=>{
    e.preventDefault();
    setCapacity(e.target.value)
  }
  const [daoMinCommits, setMinCommits] = useState(0);
  const handleMinCommitsChange = (e)=>{
    e.preventDefault();
    setMinCommits(e.target.value)
  }
  const [daoReward, setReward] = useState(0);
  const handleRewardChange = (e)=>{
    e.preventDefault();
    setReward(e.target.value)
  }
  const [serverName, setServerName]  = useState();
  const handleSelectChange = (e)=>{
    setServerName(e)
  }

  const [cid, setCID] = useState();
  const handleCIDcallback = (e)=>{
    console.log(e);
    setCID(e);
  }

  const db = new Database()
  const prefix = 'dao_data'

  const walletClient = createWalletClient({
    chain: filecoinHyperspace,
    transport: custom(window.ethereum)
  })

  const publicClient = createPublicClient({
    chain: filecoinHyperspace,
    transport: http()
  })

  const deployContract = async () => {
    setLoading(true)
    if (address) {
      const hash = await walletClient.deployContract({
        ...ContractData,
        account: address
      })
      setHash(hash)
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      console.log(receipt.contractAddress)
      setDeployed({ bool: true, address: receipt.contractAddress })
      setLoading(false)

      // table for collection of DAOs
      // const {meta : create } = await db.prepare(`CREATE TABLE daos (contract_add text primary key, creator text, name text, min_commits integer, capacity integer, contributors integer, zkContraint_type text, zkContraint text,FormatReq_cid text, Reward integer)`).run();
      // const { name } = create.txn;
      // TABLE ID : daos_3141_154

      // unique table for each dao
      // const { meta: create } = await db
      // .prepare(`CREATE TABLE ${prefix} (user_add text primary key, dao_add text, contributions integer);`)
      // .run();
      // const { name } = create.txn;
      //  TABLE ID : dao_data_3141_144
      const { meta: insert } = await db
        .prepare(`INSERT INTO daos_3141_154 (contract_add, creator, name, min_commits, capacity, zkContraint_type, zkContraint, FormatReq_cid, Reward) VALUES (?,?,?,?,?,?,?,?,?);`)
        .bind(receipt.contractAddress,address,daoName,daoMinCommits,daoCapacity,selected,serverName,cid, daoReward)
        .run()
      await insert.txn.wait();

    }
  }

  const dummy = async()=>{
    const { results } = await db.prepare(`SELECT * FROM daos_3141_154;`).all();
    console.log(results);
  }

  const zkpOptions = [
    { label: 'None', value: 'none' },
    { label: 'Age restriction', value: 'Age' },
    { label: 'Twitter following restriction', value: 'Social' },
    { label: 'Follow Discord Server', value: 'Discord' }
  ]

  return (
    <>
      {loading ? (
        <div style={{ marginLeft: '50%', marginTop: '20%' }}>
          <Loader />
        </div>
      ) : (
        <>
          {deployed.bool ? (
            <div>
              Contract deployed to{' '}
              <a
                href={`https://mumbai.polygonscan.com/address/${deployed.address}`}
                target='_blank'
              >
                {deployed.address}
              </a>
            </div>
          ) : (
            <div className='create-dao'>
              <h2>Create DAO</h2>

              <label htmlFor='daoName'>DAO Name</label>
              <input type='text' id='daoName' onChange={handleNameChange}/>

              <label htmlFor='daoCapacity'>Dao Capacity</label>
              <input type='number' id='daoCapacity' min={1} onChange={handleCapacityChange}/>

              <label htmlFor='minCommits'>DAO Minimum Commits for reward eligibility</label>
              <input type='number' name='minCommits' id='minCommits' min={1} onChange={handleMinCommitsChange}/>

              <label htmlFor='daoReward'>
                DAO reward (this will be distributed equally among contributers)
              </label>
              <input type='number' id='daoReward' min={1} onChange={handleRewardChange}/>

              <label htmlFor='req'>Data Format Requirements</label>
              <UploadFile parentCallback={handleCIDcallback}/>

              <label htmlFor='zkpOtions'>ZKP options</label>
              <Select
                className='basic-single'
                classNamePrefix='select'
                name='zkpOtions'
                options={zkpOptions}
                onChange={e => setSelected(e.value)}
              />

              {selected && <SelectedOption option={selected} parentCallback={handleSelectChange}/>}
              <button className='create-button' onClick={dummy}>
                <span class='button_top'> Create Dao</span>
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Create
