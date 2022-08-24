import React from 'react'

type props = {
    a:any
}

export const Test = (props:props) => {
  return (
    <div>{props.a.map((recipe:any, i:number) => <li key={i}>{recipe.foodImageUrl}</li>)}</div>
  )
}
