const Search = (props) => {
  return (
    <form action='/' method='GET'>
        <input
        type="text"
        id="header-search"
        placeholder="Search books"
        name="s" 
        />
        <button type="submit">Search</button>
    </form>
  )
}

export default Search;