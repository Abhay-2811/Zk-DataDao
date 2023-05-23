import React from 'react'
import { Database } from '@tableland/sdk'

const Home = () => {
  const dummy =async ()=>{
    const db = new Database();
    const { meta: update } = await db
        .prepare(`UPDATE daos_3141_162 SET contract_add="0xf75d5e6f919150e34d626d1981ee2374f861bcb0" where contract_add="0xca5b5ae9a41bf035f7b16cfc3a662f0a640d08f455763c97f83d7ac092159eb3";`)
        .run()
      await update.txn.wait();
  }
  return (
    <fieldset style={{marginLeft:'40px',textAlign:'center'}}>
    <h1>
      Buy or Sell Data Without Comprimising Your Privacy 🤯 <br /><br /> By using ZK-DataDao
    </h1>
    <p style={{fontWeight:'normal',fontSize:'25px',lineHeight:'40px',marginTop:'50px'}}>
      DAO creators can implement contributor's constraints and create a <b> Zero-Knowledge Barrier </b>, <br />Users can generate verifiable proofs using <b> ZK-SNARK </b>and prove that they are eligible to participate in DAO
    </p>
    </fieldset>
  )
}

export default Home