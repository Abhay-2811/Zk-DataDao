import React, { useEffect, useState } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import ZKdiscord from '../Components/ZKdiscord'
import Card from '../Components/Card'
import { Database } from "@tableland/sdk";

const table_daos = "daos_3141_162";
const db = new Database();


const DAOs = props => {
  let names = new Array()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const Discordparam = location.hash?.split('&')[1]?.split('=')[1]
  const Daoparam = searchParams.get('dao')
  const reqSer = 'ipfs'
  
  const [includes, setIncludes] = useState(false);
  const [tableData, setTableData] = useState()
  
  const get = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://discord.com/api/users/@me/guilds',
      headers: {
        Authorization: `Bearer ${Discordparam}`
      }
    }

    axios
      .request(config)
      .then(response => {
        response.data.map((data, index) => {
          names.push(data.name);
          if(data.name === reqSer){
            setIncludes(true)
          }
        })
        return
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(()=>{
    const getData = async() =>{
      const { results } = await db.prepare(`SELECT * FROM ${table_daos};`).all();
      console.log(results);
      setTableData(results);
    }
    getData();
  },[])
  
  if (Discordparam && Daoparam) {
    get()
    return (
      <>
        <ZKdiscord user={String(Number(includes))} req ={String(Number(true))} data={tableData ? tableData[Number(Daoparam)] : 0}/>
      </>
    )
  } else {
    return (
      <>
        {
          tableData?.map((value,index)=>(
            <div key={index}>
              <Card data={value} i={index}/>
            </div>
          ))
        }
      </>
    )
  }
}

export default DAOs
