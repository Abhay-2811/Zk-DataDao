import React, { useState } from 'react'
import Select from 'react-select'
import './create.css'

const SelectedOption =(props)=> {
  if(props.option==='Age restriction'){
  return(
    <>
    <label htmlFor="" style={{marginTop:'10px'}}>Age range</label>
    <input style={{margin: '10px 0 10px 0'}} placeholder='min age' type='number'/>
    </>
  )
  }
  if(props.option==='Twitter following restriction'){
    return(
      <p style={{margin: '10px 0 10px 0'}}>
        Feature not available yet !
      </p>
    )
    }
}

const Create = () => {
  const [selected,setSelected] = useState();
  
  const zkpOptions = [
    { value: 'Age restriction', label: 'Age' },
    { value: 'Twitter following restriction', label: 'Social'},
  ]
  return (
    <div className='create-dao'>
      Create DAO
      <label htmlFor="daoCapacity">DaoCapacity</label>
      <input type="number" id='daoCapacity' min={1}/>
      <label htmlFor="DAOend">DAO end date</label>
      <input type="date" name="DAOend" id="DAOend" />
      <label htmlFor="zkpOtions">ZKP options</label>
      <Select className="basic-single"
        classNamePrefix="select"
        name="zkpOtions"
        options={zkpOptions}
        onChange={(e)=>setSelected(e.value)}
        />
      {selected && <SelectedOption option={selected}/>}
    </div>
  )
}

export default Create