import { useState } from 'react'
import { BookList } from './components/BookList'
import { Login } from './components/Login'
import './App.css'
import axios from 'axios'
import useLocalStorageState from 'use-local-storage-state'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const [token, setToken] = useLocalStorageState('libraryToken', null)
  const [username, setUsername] = useLocalStorageState('libraryUsername', '')

  const setAuth = (username, token) => {
    setToken(token)
    setUsername(username)
  }

  const handleLogout = () => {
    // send request to log out on the server
    axios
      .post(
        'https://drf-library-api.herokuapp.com/api/auth/token/logout',
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() =>
        // log out in React
        setAuth('', null)
      )
  }

  const isLoggedIn = username && token

  return (
    <>
      <header className="header is-flex is-justify-content-space-between">
        <h1 className="is-size-1">Books</h1>
        {isLoggedIn && (
          <nav>
            <button className="button" onClick={handleLogout}>
              Log Out
            </button>
          </nav>
        )}
      </header>
      <div className="logged-in-message">
        Hello, you're logged in as {username}
      </div>
      <Routes>
        <Route
          path="/"
          element={<BookList token={token} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/login"
          element={<Login setAuth={setAuth} isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </>
  )
}

export default App
