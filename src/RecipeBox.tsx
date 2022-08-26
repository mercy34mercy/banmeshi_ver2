import { type } from '@testing-library/user-event/dist/type'
import React, { useEffect, useRef } from 'react'
import { Fetch } from './FetchAPI';
import { Searchbox } from './SearchBox'
import {Load} from './Loading'

type recipedata = {
    foodImageUrl: string,
    mediumImageUrl: string,
    recipeCost: string,
    recipeTitle: string,
    recipeUrl: string,
    smallImageUrl: string,
    threeRecipeMaterial: string[]
}

const RecipeBox = () => {
    const [data, setRecipedata] = React.useState<recipedata[]>([])
    const [Loading, setLoading] = React.useState<boolean>(false)

    const Fetch = (props: string[]) =>{
        let Recipedata: recipedata[] = []
        const url = "https://banmeshikun.azurewebsites.net/recipe_by_mate"

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: props })
        };

        const FetchAPI = () => {
            (async () => {
                try {
                    const response = await fetch(url, requestOptions)
                    const body = await response.json()
                    let recipearray: recipedata[] = []
                    body.data.forEach((element: recipedata) => {
                        let material: string[] = []
                        element.threeRecipeMaterial.map((mate: string, i: number) =>
                            material.push(mate)
                        )
                        const setdata: recipedata = {
                            foodImageUrl: element.foodImageUrl,
                            mediumImageUrl: element.mediumImageUrl,
                            recipeCost: element.recipeCost,
                            recipeTitle: element.recipeTitle,
                            recipeUrl: element.recipeUrl,
                            smallImageUrl: element.smallImageUrl,
                            threeRecipeMaterial: material
                        }
                        recipearray.push(setdata)
                        console.log("setdata => ", setdata)
                    });
                    setRecipedata(recipearray)
                    setLoading(false)
                }
                catch {

                } finally {
                }
            })()
        }
        FetchAPI()
    }

    const search = (materials: string) => {
        setLoading(true)
        Fetch(materials.replaceAll("　", " ").split(" "))
    }


    return (
        <div>
            <div>
                <Searchbox search={search} setLoading={setLoading}></Searchbox>
            </div>
            <div>
                {Loading ? <Load/> :  <div className='recipe'>
                {data.map((recipe, i) =>
                    <div className='recipebox' key={i}>
                        <div className='flexbox'>
                            <div className='box picturebox'>
                                <img src={recipe.foodImageUrl} alt="レシピ画像" />
                            </div>
                            <div className='materialbox box'>
                                <p className='recipetitle'>{recipe.recipeTitle}</p>
                                {recipe.threeRecipeMaterial.map((mate, l) =>
                                    <p key={l}>{mate}</p>
                                )}
                                <p>{recipe.recipeCost}</p>
                            </div>
                        </div>
                        <div className='urlbutton'>
                            <button><a href={recipe.recipeUrl} target="_blank" >レシピ詳細</a></button>
                        </div>
                    </div>

                )}
            </div>}
            </div>
        </div>
    )
}

export default RecipeBox