import React, { useEffect, useState } from 'react'
import OverView from './OverView'
import axios from 'axios'

const AgencyOverview = () => {

    const [agencyData,setAgencyData]=useState([])
    const getAgencyInfo=async ()=>{
        const data=await axios.get('https://api-dot-react-migration-project.el.r.appspot.com/api/agency')
        setAgencyData(data.data.result)
    }

    const hardReload=()=>{
        getAgencyInfo()
    }
    useEffect(()=>{
        getAgencyInfo()
    },[])
  return (
    <div>
      <OverView name={"Agency"} data={agencyData} hardReload={hardReload}/>
    </div>
  )
}

export default AgencyOverview
