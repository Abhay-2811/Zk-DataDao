import React, { useState, useEffect } from 'react'
import { initialize } from 'zokrates-js'
import './style.css'
const ZKdiscord = (props) => {
	const [res,setRes] = useState();
	const [showProof, setShowProof] = useState(false);
	const [err, setErr] = useState();

  const handleSubmit = async () => {

		initialize().then((zokratesProvider) => {
			try {
				const source = "def main(private field a, field b) {assert(a == b); return;}";
		  
			// compilation
			const artifacts = zokratesProvider.compile(source);
		  
			// computation
			const { witness, output } = zokratesProvider.computeWitness(artifacts, [props.user,props.req]);
		  
			// run setup
			const keypair = zokratesProvider.setup(artifacts.program);
	
			
			// generate proof
			const proof = zokratesProvider.generateProof(
				artifacts.program,
				witness,
				keypair.pk
				);
			const isVerified = zokratesProvider.verify(keypair.vk, proof);
			console.log(isVerified);
			const formatedProof = zokratesProvider.utils.formatProof(proof);
			console.log(formatedProof, proof.inputs);
			setRes(JSON.stringify(formatedProof[0]));
			setShowProof(true)
			} catch (error) {
				setErr(error)
			}
			
		})

	

  }

  return (
	<div className='zk-page'>
	<button onClick={handleSubmit} className='zk-button'>
		<span className='zk-button_top'>Generate Proof</span>
	</button>
	{err ? <h2 style={{color:'red',textAlign:'center'}}>You haven't joined the server as required by DAO operator</h2> :<>{
		showProof ? <p>{res}</p> : <p></p> 
	}
	<button className='dao-button'>
		<span className='zk-button_top'>Join DAO</span>
	</button>
	</>
	}
	</div>
	)
}

export default ZKdiscord
// [["",""],[["",""],["",""]],["",""]]