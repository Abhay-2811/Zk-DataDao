import React, { useState, useEffect } from 'react'
import { initialize } from 'zokrates-js'
import './style.css'
const ZKdiscord = (props) => {
	const [res,setRes] = useState();

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
	})

  }

  return (
	<div>
	<span>{res}</span>
	<div>
	<button onClick={handleSubmit} className='zk-button'>
		<span className='zk-button_top'>Generate Proof</span>
	</button>
	</div>
	<div>
	<button className='dao-button'>
		<span className='zk-button_top'>Join DAO</span>
	</button>
	</div>
	
	</div>
	)
}

export default ZKdiscord
