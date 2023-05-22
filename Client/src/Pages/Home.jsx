import React from 'react'
import { Database } from '@tableland/sdk'

const Home = () => {
  const dummy =async ()=>{
    const db = new Database();
    const { meta: update } = await db
        .prepare(`DELETE FROM daos_3141_162 where contract_add=0xca5b5ae9a41bf035f7b16cfc3a662f0a640d08f455763c97f83d7ac092159eb3;`)
        .run()
      await update.txn.wait();
  }
  return (
    <button onClick={dummy}>CLick</button>
  )
}

export default Home