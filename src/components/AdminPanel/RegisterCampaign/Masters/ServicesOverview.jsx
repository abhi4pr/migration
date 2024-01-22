import React, { useEffect, useState } from 'react'
import OverView from './OverView'
import axios from 'axios'

const ServicesOverview = () => {

    const [serviceData,setServiceData]=useState([])
    const getServiceInfo=async ()=>{
        const data=await axios.get('https://api-dot-react-migration-project.el.r.appspot.com/api/services')
        setServiceData(data.data.result)
    }

    const hardReload=()=>{
        getServiceInfo()
    }
    useEffect(()=>{
        getServiceInfo()
    },[])
  return (
    <div>
      <OverView name={"service"} data={serviceData} hardReload={hardReload}/>
    </div>
  )
}

export default ServicesOverview
