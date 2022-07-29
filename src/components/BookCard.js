import { Link } from 'react-router-dom'
export const BookCard = ({ title, bookId, featured, setSelected }) => {
  return (
    <Link to={`/books/${bookId}`}>
      <div className="book card" id={bookId}>
        <div className="card-content">
          <div className="content">
            <p>
              {title}
              {featured && (
                <span className="icon">
                  <i className="fa-solid fa-feather-pointed"></i>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
