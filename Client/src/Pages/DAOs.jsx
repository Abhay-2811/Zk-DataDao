import React, { useEffect } from 'react'
import { daos } from '../Constants/fakeDAOs'
import { useSearchParams } from 'react-router-dom'


const DAOs = () => {
  const [searchParams] = useSearchParams()
  const Discordparam = searchParams.get('code');
  if(Discordparam){
    return(
      <div>Param Exists</div>
    )
  }
  else{
    return(
      <div>Param dne</div>
    )
  }
}

export default DAOs