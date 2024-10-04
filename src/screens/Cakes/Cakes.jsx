import './Cakes.css'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getCakeInquiries, updateCakeInquiries} from "../../services/apiConfig"

export default function Cakes() {
  const [clients, setClients] = useState([])
  const navigate = useNavigate()

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

  const handleClick = async(client) => {
    navigate(`/cakes/${client._id}`)
     const clientInquiry = {
      ...client,
      is_open: true
    }
    try {
      if (!client.is_open) {
        await updateCakeInquiries(client._id, clientInquiry)
      }
    } catch (error) {
      throw error
    }
  }
  
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
        <h2>Cake Inquiries ({clients.length})</h2>
    </div>
  <div className="client-div">
        <div className="ul-div">
            {clients.map((client) => (
              <div className='client-list'>
            <p className="names" key={client._id} onClick={()=>handleClick(client)}>
              {client.name}
                </p>
                {
                  !client.is_open ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope-arrow-up" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4.5a.5.5 0 0 1-1 0V5.383l-7 4.2-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h5.5a.5.5 0 0 1 0 1H2a2 2 0 0 1-2-1.99zm1 7.105 4.708-2.897L1 5.383zM1 4v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1"/>
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.354 1.25 1.25a.5.5 0 0 1-.708.708L13 12.207V14a.5.5 0 0 1-1 0v-1.717l-.28.305a.5.5 0 0 1-.737-.676l1.149-1.25a.5.5 0 0 1 .722-.016"/>
                  </svg>
                    :
                    null
                }
            </div>
          ))}
    </div>
  </div>
  </div>
  )
}
