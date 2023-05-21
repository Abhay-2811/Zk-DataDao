import React, { useState, useEffect } from 'react'
import { initialize } from 'zokrates-js'
import './style.css'
const ZKdiscord = (props) => {
	const [res,setRes] = useState();
	const [showProof, setShowProof] = useState(false);

  const handleSubmit = async () => {
	initialize().then((zokratesProvider) => {
		const source = "def main(private field a, field b) {assert(a == b); return;}";
	  
		// compilation
		const artifacts = zokratesProvider.compile(source);
	  
		// computation
		const { witness, output } = zokratesProvider.computeWitness(artifacts, [props.user,props.req]);
	  
		// run setup
		const keypair = zokratesProvider.setup(artifacts.program);
	  
		// generate proof
		const {proof,inputs} = zokratesProvider.generateProof(
		  artifacts.program,
		  witness,
		  keypair.pk
		);
		console.log(proof, inputs);
		setRes(JSON.stringify(proof));
		setShowProof(true)
	})

  }

  return (
	<div className='zk-page'>
	<button onClick={handleSubmit} className='zk-button'>
		<span className='zk-button_top'>Generate Proof</span>
	</button>
	{
		showProof ? <p>{res}</p> : <p></p> 
	}
	<button className='dao-button'>
		<span className='zk-button_top'>Join DAO</span>
	</button>
	</div>
	)
}

export default ZKdiscord
