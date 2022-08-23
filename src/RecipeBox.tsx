import { type } from '@testing-library/user-event/dist/type'
import React, { useEffect } from 'react'
import { Fetch } from './FetchAPI';
import { App } from './App'


type recipedata = {
    foodImageUrl: String,
    mediumImageUrl: String,
    recipeCost: String,
    recipeTitle: String,
    recipeUrl: String,
    smallImageUrl: String,
    threeRecipeMaterial: String
}


const RecipeBox = () => {

    const [data, setRecipedata] = React.useState<recipedata[]>()
    const [Loading, setLoading] = React.useState<boolean>(false)
    const RefRecipedata = React.useRef(data)


    const search = (materials: string) => {
        const { Recipedata, flag } = Fetch(materials.replaceAll("　", " ").split(" "))
        RefRecipedata.current = Recipedata
        setRecipedata(Recipedata)
        console.log("RefRecipedata.current", RefRecipedata.current)
        // setLoading(false)
        setLoading(true)
    }

    useEffect(() => {
        setLoading(true)
        // RefRecipedata.current = data
    }, [data])


    return (
        <div>
            <div>
                <App search={search} setLoading={setLoading}></App>
            </div>
            <div className='main'>
                {RefRecipedata.current?.map((recipe, i) => <li key={i}>{recipe.foodImageUrl}</li>)}
            </div>
        </div>
    )

}

export default RecipeBox