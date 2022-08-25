import './App.css'
import button from './assets/baseline_search_black_24dp.png'


type props = {
    search:any,
    materials:String
    setLoading:any
}

const SearchButton = (props:props) => {
   const handleclick = () => {
    props.search(props.materials)
    props.setLoading(true)
   } 

  return (
    <button className='searchbutton' onClick={handleclick}>
        <img src={button} alt="" />
    </button>
  )
}

export default SearchButton