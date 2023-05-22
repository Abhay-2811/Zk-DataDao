import React, { useEffect } from 'react'
import { Database } from "@tableland/sdk";
import { useAccount } from 'wagmi';
const Profile = () => {
  const db = new Database();
  const table_dao_data = "dao_data_3141_164";
  const {address} = useAccount();
  useEffect(()=>{
    const getInfo = async()=>{
      const { results } = await db.prepare(`SELECT * FROM ${table_dao_data} WHERE user_add="${address}";`).all();
      console.log(results);
    }
    getInfo()
  },[])
  return (
    <div>Profile</div>
  )
}

export default Profile