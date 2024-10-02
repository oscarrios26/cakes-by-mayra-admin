import './Cakes.css'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import {getCakeInquiries} from "../../services/apiConfig"

export default function Cakes() {
  const [clients, setClients] = useState([])
  const [data, setData] = useState({})
  const [style, setStyle] = useState({ "display": "none" })
  const [date, setDate] = useState('')
  const [dateNeeded, setDateNeeded] = useState('')

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const resp = await getCakeInquiries()
        setClients(resp.reverse())
    } catch (error) {
      throw error
    }
    }
    fetchClients()
  }, [])

  const handleClick = (client) => {
  const posted = new Date(client.createdAt);
    const date = posted.toLocaleString();
    setDate(date)
    const dateFormat = new Date(client.date_needed)
    setDateNeeded(dateFormat.toDateString())
    setData(client)
    setStyle({})
  }
  
  const navigate = useNavigate()
  const handleLogOut = () => {
    localStorage.removeItem('token'); 
    navigate('/')
  }

  return (
    <div className="parent-div">
    <div className="nav">
        <Link to='/home' className='link-tag'>Home</Link>
        <p className='logout' onClick={handleLogOut}>Log Out</p>
    </div>
    <div className="title">
        <div>Cake Inquiries ({clients.length})</div>
    </div>
  <div className="client-div">
        <div className="ul-div">
            {clients.map((client) => (
              <div className='client-list'>
            <p className="names" key={client._id} onClick={()=>handleClick(client)}>
              {client.name}
            </p>
            </div>
          ))}
    </div>
        <div className="data-div" style={style}>
          <div className='inquiry-data'>
          <div className='data'><h2>Inquiry Created:</h2><p>{date}</p></div>
          <div className='data'><h2>Name:</h2><p>{data.name}</p></div>
          <div className='data'><h2>Email:</h2><p>{data.email}</p></div>
          <div className='data'><h2>Phone Number:</h2><p>{data.phone_number}</p></div>
          <div className='data'><h2>Date Needed:</h2><p>{dateNeeded}</p></div>
          <div className='data'><h2>Cake Finish:</h2><p>{data.cake_finish}</p></div>
          <div className='data'><h2>Servings:</h2><p>{data.servings}</p></div>
          <div className='data'><h2>Delivery Method:</h2><p>{data.delivery_method}</p></div>
          {data.address ? <div className='data'><h2>Address:</h2><p>{data.address}</p></div> : ''}
          </div>
          
          <div className='pic-div'>
            {data.s3 && data.s3.map((img) => (
              <img src={`${process.env.REACT_APP_CAKE}/${img}`} alt='cake'/>
            ))}
        </div>
    
        </div>
        
  </div>
  </div>
  )
}
