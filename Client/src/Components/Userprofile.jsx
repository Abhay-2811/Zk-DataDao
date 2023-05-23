import React, { useState, useEffect } from 'react'
import { Database } from '@tableland/sdk'
import { useAccount } from 'wagmi'
import './style.css'
import { createPublicClient, http, createWalletClient, custom, parseUnits } from 'viem'
import { filecoinHyperspace } from 'viem/chains'
import { ContractData } from '../Constants/contract'
import UploadFile from './UploadFIle'
import {useNavigate} from 'react-router-dom'

const Userprofile = () => {
  const db = new Database()
  const table_dao_data = 'dao_data_3141_164';
  const table_daos = 'daos_3141_162';
  const { address } = useAccount()
  const [userData, setUserData] = useState()
  const contri = new Array()
  const publicClient = createPublicClient({
    chain: filecoinHyperspace,
    transport: http()
  })
  const [showCommit, setShowCommit] = useState({bool: false, con: 0})
  const [commitData, setCommitData] = useState({bool: false,ca: ''})
  const [cid, setCID] = useState()
  const navigate = useNavigate();

  const getCommits = async (dao_add, i) => {
    const data = await publicClient
      .readContract({
        address: dao_add,
        abi: ContractData.abi,
        functionName: 'getContribution',
        args: [address]
      })
      .then(res => {
        console.log(i)
        
        setShowCommit({bool: true,con: Number(res)})
      })
  }
  const walletClient = createWalletClient({
    chain: filecoinHyperspace,
    transport: custom(window.ethereum)
  })


  const handleparentCallback = e => {
    setCID(e)
  }
  const handleSubmit = async()=>{
    const hash = await walletClient.writeContract({
      address: commitData.ca,
      abi: ContractData.abi,
      functionName: 'contribute',
      account: address,
      args: [cid],
      value: parseUnits('0.1', 18)
    })
  }


  useEffect(() => {
    const getInfo = async () => {
      const { results } = await db
        .prepare(`SELECT * FROM ${table_dao_data} where user_add="${address}";`)
        .all()
      console.log(results)
      setUserData(results)
    }
    getInfo()
  }, [])
  return (
    <>
      {!commitData.bool && (
        <div>
          {userData?.map((value, index) => (
            <div key={index} className='cards'>
              <span>
                <b>DAO Address: </b>
                {value.dao_add}
              </span>
              <br />
              <span>
                <b>Min Commits: </b>5
              </span>
              <br />

              {showCommit.bool ? (
                <div>
                  <b>Commits</b> : {showCommit.con}
                </div>
              ) : (
                <button onClick={() => getCommits(value.dao_add, index)}>
                  <b>Click to Get Your Commits </b>
                </button>
              )}
              <br />
              <button className='dao-button'>
                <span
                  className='zk-button_top'
                  onClick={() => {
                    setCommitData({bool: true, ca: value.dao_add})
                  }}
                >
                  Commit Data
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
      {commitData.bool && (
        <div className='commit-data'>
          <h2>Commit Data</h2>
          <h3>Make sure you follow requirements for submission : <i><a href={`http://${window.location.host}/daos`}>Requirement</a></i></h3>
          <UploadFile parentCallback={handleparentCallback}/>
          <button className='dao-button'>
                <span
                  className='zk-button_top'
                  onClick={handleSubmit}
                >
                  Submit
                </span>
              </button>
        </div>
      )}
    </>
  )
}

export default Userprofile
