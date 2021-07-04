import './BookResult.css';
import BookButton from './BookButton';

const BookResult = props => {
  const body = {
    bookInfo: {
      bookId: props.bookId,
      imgUrl: props.imgUrl,
      title: props.title,
      author: props.author,
      description: props.description,
    }
  }

  return (
    <div className='book-result-container'>
        <div className='left'>
          <img className='book-img' src={props.imgUrl} alt='' />
          <div className='book-info'>
            <div className='title'>{props.title}</div>
            <div>{props.author}</div>
          </div>
        </div>
        <BookButton alreadyInLibrary={props.alreadyInLibrary} body={body}/>

    </div>
  )
}

export default BookResult;