import "./CakeDetails.css"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCakeInquiries, getCakeInquirie, updateCakeInquiries } from '../../services/apiConfig'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal';

export default function CakeDetails() {
  const [clients, setClients] = useState([])
  const [data, setData] = useState({})
  const [date, setDate] = useState('')
  const [dateNeeded, setDateNeeded] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate()

  const customStyles = {
  content: {
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

  let { id } = useParams();
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const cakes = await getCakeInquiries()
        setClients(cakes.reverse())
        const cake = await getCakeInquirie(id)
        setData(cake)
      if (cake) { 
          function convertDate()  {
          const posted = new Date(cake.createdAt);
          const newdate = posted.toLocaleString();
          setDate(newdate)
          const dateFormat = new Date(cake.date_needed)
          setDateNeeded(dateFormat.toDateString())
          }
          convertDate()
            } 

    } catch (error) {
      throw error
      }
    }
    fetchClients()
  }, [id])
  
const handleLogOut = () => {
    localStorage.removeItem('token'); 
    navigate('/')
}
  
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
  
  const  deleteInquiry = async(id)=> {
    try {
      const updateInquiry = {
        ...data,
        is_deleted: true
        }
        await updateCakeInquiries(id, updateInquiry)
      setModalIsOpen((prev) => !prev)
      navigate('/cakes')
    } catch (error) {
      throw error
    }
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
        <div className="data-div">
          <div className='inquiry-data'>
            { 
            data &&
              <>
                <div className="trash-div">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi-trash" viewBox="0 0 16 16" onClick={()=>setModalIsOpen((prev)=> !prev)}>
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
                </div>
            <div className='data'><h2>Inquiry Created:</h2><p className='p-data'>{date}</p></div><div className='data'><h2>Name:</h2><p className='p-data'>{data.name}</p></div><div className='data'><h2>Email:</h2><p className='p-data'>{data.email}</p></div><div className='data'><h2>Phone Number:</h2><p className='p-data'>{data.phone_number}</p></div><div className='data'><h2>Date Needed:</h2><p className='p-data'>{dateNeeded}</p></div><div className='data'><h2>Cake Finish:</h2><p className='p-data'>{data.cake_finish}</p></div><div className='data'><h2>Servings:</h2><p className='p-data'>{data.servings}</p></div><div className='data'><h2>Delivery Method:</h2><p className='p-data'>{data.delivery_method}</p></div></>
            }
{data && data.address ? <div className='data'><h2>Address:</h2><p className='p-data'>{data.address}</p></div> : ''}
            
          </div>
          
          <div className='pic-div'>
            {data && data.s3 && data.s3.map((img) => (
              <img src={`${process.env.REACT_APP_CAKE}/${img}`} alt='cake'/>
            ))}
        </div>
    
        </div>
      </div>
       <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal">
          <button className="modal-btn" onClick={()=> deleteInquiry(id)}>Confirm Delete</button>
          <button className="modal-btn" onClick={()=>setModalIsOpen((prev)=>!prev)}>Cancel Delete</button>
        </div>
      </Modal>
  </div>
  )
}
