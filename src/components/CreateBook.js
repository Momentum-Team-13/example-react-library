import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateBook = ({ setBookAdded, token }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [pubYear, setPubYear] = useState('')
  const [error, setError] = useState(null)
  const navigateTo = useNavigate()

  const resetForm = () => {
    setTitle('')
    setAuthor('')
    setPubYear('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // make request to POST new book
    let url = 'https://drf-library-api.herokuapp.com/api/books'
    axios
      .post(
        url,
        { title, author, publication_year: pubYear },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        navigateTo('/books')
        resetForm()
      })
      .catch((err) => {
        setError(err.response.data.error)
      })
  }

  return (
    <div className="book-form container mt-4">
      <h1 className="title is-4">Add a new book</h1>
      {error && <div className="error notification is-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="book-title">
            Title
          </label>
          <div className="control">
            <input
              type="text"
              id="book-title"
              className="input"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setError(null)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="book-author">
            Author
          </label>
          <div className="control">
            <input
              type="text"
              id="book-author"
              className="input"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              onFocus={() => setError(null)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="book-pub-year">
            Publication Year
          </label>
          <div className="control">
            <input
              type="text"
              id="book-pub-year"
              className="input"
              required
              value={pubYear}
              onChange={(e) => setPubYear(e.target.value)}
              onFocus={() => setError(null)}
            />
          </div>
        </div>

        <div className="field">
          <button type="submit" className="button is-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBook
