import SearchButton from './SearchButton'
import './App.css'
import React from "react"

type props = {
  search:any,
  setLoading:any
}

const SearchBar = (props:props) => {

  const [materials, setMaterials] = React.useState("")

  const handleChange = (e:any) => {
    setMaterials(() => e.target.value)
  }

  return (
    <div className="searchbar">
      <div className='searchinput'>
        <input  type="text" value={materials} onChange={handleChange} />
      </div>
      <SearchButton search={props.search} materials={materials} setLoading={props.setLoading}></SearchButton>
    </div>
  )
}

export default SearchBar