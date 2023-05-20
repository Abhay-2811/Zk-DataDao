import React from 'react'
import { daos } from '../Constants/fakeDAOs'
import { useSearchParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import ZKdiscord from '../Components/ZKdiscord'
import Card from '../Components/Card'

const DAOs = props => {
  let names = new Array()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const Discordparam = location.hash?.split('&')[1]?.split('=')[1]
  const Daoparam = searchParams.get('dao')
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
          names.push(data.name)
        })
        return
      })
      .catch(error => {
        console.log(error)
      })
  }
  if (Discordparam && Daoparam) {
    get()
    return (
      <>
        <ZKdiscord user='111' req = '111'/>
      </>
    )
  } else {
    return (
      <>
        <Card />
      </>
    )
  }
}

export default DAOs
