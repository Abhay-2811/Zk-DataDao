import React, { useEffect, useState } from 'react'
import './profile.css'
import Userprofile from '../Components/Userprofile'
import Operatorporfile from '../Components/Operatorporfile'

const Profile = () => {
 
  const [profile, setProfile] = useState('user');

  
  const SelectedProfile = (props) => {
    if(props.sel === 'user'){
      return (
        <Userprofile />
      )
    }
    if(props.sel ==='operator'){
    return (
      <Operatorporfile />
    )
  }
  }

  const handleUserChange = ()=>{
    setProfile('user');
  }
  const handleOpChange = ()=>{
    setProfile('operator');
  }
  return (
    <>
    <fieldset id='switch' className='radio'>
      <input name='switch' id='user' type='radio' onChange={handleUserChange}/>
      <label for='user'>User </label>
      <input name='switch' id='operator' type='radio'  onChange={handleOpChange}/>
      <label for='operator'>DAO Operator</label>
    </fieldset>
    {
      profile && <SelectedProfile sel={profile}/>
    }
    </>
  )
}

export default Profile
