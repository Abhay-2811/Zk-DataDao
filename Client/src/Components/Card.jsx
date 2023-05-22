import React, { useEffect, useState } from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import {faDiscord} from '@fortawesome/free-brands-svg-icons'
import {createPublicClient, http} from 'viem';
import { filecoinHyperspace } from 'viem/chains'
import { ContractData } from '../Constants/contract'

function Card(props) {
    const daoADD = props.data.contract_add;
    const publicClient = createPublicClient({
      chain: filecoinHyperspace,
      transport: http()
    });
    const [contributors, setContri] = useState(0)
    useEffect(()=>{
        const getContractData = async()=>{
          try {
            const data = await publicClient.readContract({
              address: props.data.contract_add,
              abi: ContractData.abi,
              functionName: 'totalContributors',
            }).then((res)=>{console.log(res);setContri(res)})
          } catch (error) {
            console.log(error);
          }
        };
        getContractData()
    },[])
  return (
    <div className="cards">
    <div className="leftSection">
      <h1 className="title">{props.data.name}</h1>
      <a className="dec" href={`https://gateway.lighthouse.storage/ipfs/${props.data.FormatReq_cid}`} target='_blank'>Requirements</a>
      <div className="group">
        <label>Contract Address : </label>
        <p> <b>{props.data.contract_add}</b></p>
      </div>
      <div className="group">
        <label>Reward Pool :</label>
        <p> <b>{props.data.Reward} TFIL</b></p>
      </div>
      <div className="group">
        <label>DAO capacity : </label>
        <p> <b>{props.data.capacity}<FontAwesomeIcon icon={faUsers} style={{marginLeft:'5px'}}/></b></p>
      </div>
      <div className="group">
        <label>Current DAO Contributors : </label>
        <p> <b>{Number(contributors)}/{props.data.capacity}</b></p>
      </div>
      <div className="group">
        <label>Joining Condition: </label>
        <p> <b>Join Server "{props.data.zkContraint}" on <FontAwesomeIcon icon={faDiscord} style={{marginLeft:'5px'}}/></b></p>
      </div>
      <div className="group">
        <label>Minimum Commits: </label>
        <p> <b>{props.data.min_commits}</b></p>
      </div>
    </div>
    <button className='zk-button'>
        <a className='zk-button_top' href={`https://discord.com/api/oauth2/authorize?client_id=1109245990302662787&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdaos%3Fdao%3D${props.i}&response_type=token&scope=guilds`}>Verify Joining Condition</a>
      </button>
  </div>
  )
}

export default Card

// FormatReq_cid
// : 
// "QmU6QmpMDSKsLHiDFeNoqtMmVtXpDGtad4R76xGDueXKAM"
// Reward
// : 
// 10000
// capacity
// : 
// 1000
// contract_add
// : 
// "0x883b8d30d438547340e6317d76d57c0f7570d050"
// contributors
// : 
// null
// creator
// : 
// "0x72d2F62A93305752CC57D48Ea217CA687EA43dc0"
// min_commits
// : 
// 10
// name
// : 
// "Food Research By InterHeath co."
// zkContraint
// : 
// "ipfs"
// zkContraint_type
// : 
// "Discord"