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
  String.prototype.hashCode = function() {
    var hash = 0,
      i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
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
  const userSer = 'ipfsd'
  const reqSer = 'ipfs'
  
  if (Discordparam && Daoparam) {
    get()
    return (
      <>
        <ZKdiscord user={String(userSer.hashCode())} req = {String(reqSer.hashCode())}/>
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
