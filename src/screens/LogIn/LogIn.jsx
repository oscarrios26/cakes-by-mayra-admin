import './LogIn.css'
import { useState } from "react";
import { signIn } from "../../services/apiConfig";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({})

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = await signIn(credentials);
      localStorage.setItem("token", token.token)
      navigate("/home");
    } catch (error) {
      throw error
    }
  }

  return (
    <div className='form-div'>
      <form action="POST" className='form' onSubmit={handleSubmit}>
        <input type="text" placeholder='username' name='username' onChange={handleChange}/>
          <input type="text" placeholder='password' name='password'  onChange={handleChange}/>
          <button>Log In</button>
      </form>
    </div>
  )
}
