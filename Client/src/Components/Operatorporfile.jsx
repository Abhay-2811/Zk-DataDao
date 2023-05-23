import React, { useEffect, useState } from 'react'
import { Database } from '@tableland/sdk'
import { useAccount } from 'wagmi'
import { createWalletClient, custom,createPublicClient,http } from 'viem'
import './style.css'
import { filecoinHyperspace } from 'viem/chains'
import { Loader } from './Loader'
import { ContractData } from '../Constants/contract'

const Operatorporfile = () => {
  const db = new Database()
  const [opData, setOpData] = useState()
  const { address } = useAccount()
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)
  const table_daos = 'daos_3141_162'
  const walletClient = createWalletClient({
    chain: filecoinHyperspace,
    transport: custom(window.ethereum)
  })
  const publicClient = createPublicClient({
    chain: filecoinHyperspace,
    transport: http()
  })
  const releaseFunds = async add => {
    setLoading(true)
    const hash = await walletClient.writeContract({
      address: add,
      abi: ContractData.abi,
      functionName: 'sendReward',
      account: address,
      args: [['0x72d2F62A93305752CC57D48Ea217CA687EA43dc0']]
    })
    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    setCompleted(true);
  }
  useEffect(() => {
    const getData = async () => {
      const { results } = await db
        .prepare(`SELECT * FROM ${table_daos} where creator="${address}";`)
        .all()
      console.log(results)
      setOpData(results)
    }
    getData()
  }, [])
  return (
    <>
      {loading ? (
        <>
          {completed ? (
            <h1> ✅ Funds Released </h1>
          ) : (
            <div style={{ marginLeft: '50%', marginTop: '20%' }}>
            <Loader text='Releasing Funds' />
            </div>
          )}
        </>
      ) : (
        <div>
          {opData?.map((value, index) => (
            <div key={index} className='cards'>
              <span>
                <b>Contract Address: </b>
                {value.contract_add}
              </span>
              <button className='dao-button' onClick={()=>releaseFunds(value.contract_add)}>
                <span
                  className='zk-button_top'
                >
                  Release Funds to Valid Contributors
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Operatorporfile
