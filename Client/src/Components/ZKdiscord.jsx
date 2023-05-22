import React, { useState, useEffect } from 'react'
import { initialize } from 'zokrates-js'
import './style.css'
const ZKdiscord = props => {
  const [res, setRes] = useState()
  const [showProof, setShowProof] = useState(false)
  const [err, setErr] = useState()
  const [verification, setVerification] = useState(false)

  const handleSubmit = async () => {
    initialize().then(zokratesProvider => {
      try {
		console.log(props.user,props.req);
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
		console.log(error);
        setErr(error)
      }
    })
  }

  const JoinDAO = ()=>{
	
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
