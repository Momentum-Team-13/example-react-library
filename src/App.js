import { useState } from 'react'
import { BookList } from './components/BookList'
import { BookDetail } from './components/BookDetail'
import { Login } from './components/Login'
import NoMatch from './components/NoMatch'
import CreateBook from './components/CreateBook'
import './App.css'
import axios from 'axios'
import useLocalStorageState from 'use-local-storage-state'
import { Routes, Route, Navigate, Link } from 'react-router-dom'

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
        <Link to="/">
          <h1 className="has-text-white">Books</h1>
        </Link>
        {isLoggedIn && (
          <nav>
            <button className="button" onClick={handleLogout}>
              Log Out
            </button>
          </nav>
        )}
      </header>
      <main className="container main">
        {isLoggedIn && (
          <div className="logged-in-message mt-2">
            Hello, you're logged in as {username}
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/books" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="books"
            element={<BookList token={token} isLoggedIn={isLoggedIn} />}
          />
          <Route path="books/:bookId" element={<BookDetail token={token} />} />
          <Route path="books/new" element={<CreateBook token={token} />} />
          <Route
            path="/login"
            element={<Login setAuth={setAuth} isLoggedIn={isLoggedIn} />}
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
    </>
  )
}

export default App
