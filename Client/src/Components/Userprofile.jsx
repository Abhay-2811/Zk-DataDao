import React, { useState, useEffect } from 'react'
import { Database } from '@tableland/sdk'
import { useAccount } from 'wagmi'
import './style.css'
import { createPublicClient, http } from 'viem'
import { filecoinHyperspace } from 'viem/chains'
import { ContractData } from '../Constants/contract'

const Userprofile = () => {
  const db = new Database()
  const table_dao_data = 'dao_data_3141_164'
  const { address } = useAccount()
  const [userData, setUserData] = useState()
  const contri = new Array()
  const publicClient = createPublicClient({
    chain: filecoinHyperspace,
    transport: http()
  })

  useEffect(() => {
    const getInfo = async () => {
      const { results } = await db
        .prepare(`SELECT * FROM ${table_dao_data} WHERE user_add="${address}";`)
        .all()
      results.map(async (value, index) => {
        console.log(index);
        const data = await publicClient.readContract({
          address: value.dao_add,
          abi: ContractData.abi,
          functionName: 'getContribution',
          args: [address]
        })
        contri.push(data)
        console.log(contri[0])
      })
      setUserData(results)
    }
    getInfo()
  }, [])
  return (
    <div className='cards'>
      {userData?.map((value, index) => (
        <div key={index}>
          <span>
            <b>DAO Address: </b>
            {value.dao_add}
          </span>
          <br />
          <span>
            <b>Min Commits: </b>5
          </span>
          <br />
          <span>
            <b>Your Commits: </b>
            {(contri[index] ? String(contri[index]):0)}
          </span>
          <br />
        </div>
      ))}
    </div>
  )
}

export default Userprofile
