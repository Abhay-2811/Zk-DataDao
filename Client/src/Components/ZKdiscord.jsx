import React, { useState, useEffect } from 'react'
import { initialize } from 'zokrates-js'
import { createWalletClient, custom } from 'viem'
import {filecoinHyperspace} from 'viem/chains'
import './style.css'
import { ContractData } from '../Constants/contract'
import { useAccount } from 'wagmi'
import { Database } from '@tableland/sdk'

const table_daos = "daos_3141_156";
const table_dao_data = "dao_data_3141_144";

const ZKdiscord = props => {
  const [res, setRes] = useState()
  const [showProof, setShowProof] = useState(false)
  const [err, setErr] = useState()
  const [verification, setVerification] = useState(false)
  const { address } = useAccount()
  const walletClient = createWalletClient({
    chain: filecoinHyperspace,
    transport: custom(window.ethereum)
  })

  const handleSubmit = async () => {
    initialize().then(zokratesProvider => {
      try {
        console.log(props.user, props.req)
        const source =
          'def main(private field a, field b) {assert(a == b); return;}'

        // compilation
        const artifacts = zokratesProvider.compile(source)

        // computation
        const { witness, output } = zokratesProvider.computeWitness(artifacts, [
          props.user,
          props.req
        ])

        // run setup
        const keypair = zokratesProvider.setup(artifacts.program)

        // generate proof
        const proof = zokratesProvider.generateProof(
          artifacts.program,
          witness,
          keypair.pk
        )
        const isVerified = zokratesProvider.verify(keypair.vk, proof)
        console.log(isVerified)
        setVerification(true)
        const formatedProof = zokratesProvider.utils.formatProof(proof)
        console.log(formatedProof, proof.inputs)
        setRes(JSON.stringify(formatedProof[0]))
        setShowProof(true)
      } catch (error) {
        console.log(error)
        setErr(error)
      }
    })
  }
  const db = new Database()
  const JoinDAO = async () => {
    // await walletClient.writeContract({
    //   address: props.data.contract_add,
    //   abi: ContractData.abi,
    //   functionName: 'joinDAO',
    //   account: address,
    // });
    console.log(props.data);
    const current_cont = Number(props.data.contributors);
    const new_cont = current_cont+1;
    // console.log(new_cont);
    const {meta: update} = await db.prepare(`UPDATE ${table_daos} SET contributors=${new_cont} WHERE contract_add=${props.data.contract_add}`).run();
    await update.txn.wait();
  }

  return (
    <div className='zk-page'>
      <button onClick={handleSubmit} className='zk-button'>
        <span className='zk-button_top'>Generate Proof</span>
      </button>
      {err ? (
        <h2 style={{ color: 'red', textAlign: 'center' }}>
          You haven't joined the server as required by DAO operator
        </h2>
      ) : (
        <>
          {showProof ? <p>{res}</p> : <p></p>}
          {verification ? <p>✅ Verified</p> : <></>}
          <button className='dao-button' onClick={JoinDAO}>
            <span className='zk-button_top'>Join DAO</span>
          </button>
        </>
      )}
    </div>
  )
}

export default ZKdiscord
