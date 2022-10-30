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

  const pressEnter = (e:any)  =>{
    if (e.key == 'Enter') {
      props.search(materials)
    }
  }


  return (
    <div className="searchbar">
      <div className='searchinput'>
        <input  type="text" value={materials} placeholder="(例) 玉ねぎ 牛肉 人参" onChange={handleChange} onKeyPress={pressEnter}/>
      </div>
      <SearchButton search={props.search} materials={materials} setLoading={props.setLoading}></SearchButton>
    </div>
  )
}

export default SearchBar