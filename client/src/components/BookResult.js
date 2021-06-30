import './BookResult.css';

const BookResult = props => {

  return (
    <div className='book-result-container'>
      <img className='book-img' src={props.imgUrl} alt='' />
      <div className='book-info'>
        <div className='title'>{props.title}</div>
        <div>{props.author}</div>
      </div>
    </div>
  )
}

export default BookResult;