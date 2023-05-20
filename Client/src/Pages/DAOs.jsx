import React from 'react'
import { daos } from '../Constants/fakeDAOs'
import { useSearchParams, useLocation } from 'react-router-dom'
import axios from 'axios'

const DAOs = props => {
  let names = new Array();
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const Discordparam = location.hash?.split('&')[1]?.split('=')[1]
  const Daoparam = searchParams.get('dao');
  const get = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://discord.com/api/users/@me/guilds',
      headers: {
        Authorization: `Bearer ${Discordparam}`,
      }
    }

    axios
      .request(config)
      .then((response) => {
        (response.data.map((data,index)=>{
          names.push(data.name);
        }))
        return
      })
      .catch(error => {
        console.log(error)
      })
  }
  if (Discordparam && Daoparam) {
    get();
    return <div>Param Exists</div>
  } else {
    return (
      <a href='https://discord.com/api/oauth2/authorize?client_id=1109245990302662787&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdaos%3Fdao%3Dabc&response_type=token&scope=guilds'>
        Press me
      </a>
    )
  }
}

export default DAOs
