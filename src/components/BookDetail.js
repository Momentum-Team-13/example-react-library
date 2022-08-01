import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export const BookDetail = ({ token }) => {
  const [book, setBook] = useState(null)
  const { bookId } = useParams()
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`https://drf-library-api.herokuapp.com/api/books/${bookId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setBook(res.data)
      })
      .catch((error) => setError(error))
  }, [bookId, token])

  return (
    <>
      <Link to="/" className="button is-primary is-light">
        Go Back to All Books
      </Link>
      {error && <h1 className="title">OH NO 404</h1>}
      {book && (
        <>
          <div className="book content container-box" id={book.pk}>
            <h2>{book.title}</h2>
            <div className="details">
              <p>{book.author}</p>
              <p>{book.publication_year}</p>
            </div>
          </div>
        </>
      )}
    </>
  )
}
