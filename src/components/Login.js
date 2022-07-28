import axios from 'axios'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
export const Login = ({ setAuth, isLoggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    setError(null)
    // when the form submits, make an ajax request to the login endpoint
    // capture the auth token in state
    axios
      .post('https://drf-library-api.herokuapp.com/api/auth/token/login', {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.auth_token
        setAuth(username, token)
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  return (
    <>
      <h2>Hello I am the Login Form</h2>
      {error && <div className="error">{error}</div>}
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="form-controls">
          <label htmlFor="username-field">username</label>
          <input
            id="username-field"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
        </div>
        <div className="form-controls">
          <label htmlFor="password-field">password</label>
          <input
            id="password-field"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <div className="form-submit">
          <input type="submit" value="Log In" />
        </div>
      </form>
    </>
  )
}
