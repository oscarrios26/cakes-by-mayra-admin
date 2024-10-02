import './Home.css'
import {useNavigate} from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const handleClick = () => {
    localStorage.removeItem('token'); 
    navigate('/')
  }

  return (
    <div className="parent-div">
      <div className='navbar'>
      <p className='logout' onClick={handleClick}>Log Out</p>
      </div>
      <div className='title'>
        <h3>Welcome back Mayra</h3>
      </div>
  <div className="btn-div">
    <button className="button-15" onClick={()=>navigate('/cakes')}>Cake inquiries</button>
    <button className="button-15" onClick={()=>navigate('/cookies')}>Cookie inquiries</button>
  </div>
  </div>
  )
}
