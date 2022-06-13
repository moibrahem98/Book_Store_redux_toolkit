import React from 'react';
import { useSelector } from 'react-redux'
const BooksList = ({ isLoading, dispatch, deleteBook }) => {
  const { books } = useSelector(state => state.books)
  const bookList = books ? books.map((book) => {
    return (
      <li className='list-group-item d-flex  justify-content-between align-items-center' key={book.id}>
        <div>{book.title}</div>
        <div className='btn-group' role='group'>
          <button type='button' className='btn btn-primary'>
            Read
          </button>
          <button type='button' className='btn btn-danger' onClick={() => dispatch(deleteBook(book.id))}>
            Delete
          </button>
        </div>
      </li>
    )

  }) : <p>There is no books available</p>
  return (

    <div>
      <h2>Books List</h2>
      {isLoading ? 'loading...' : (
        <ul className='list-group'>
          {bookList}
        </ul>
      )
      }
    </div >

  );
};

export default BooksList;
