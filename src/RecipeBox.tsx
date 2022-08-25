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
    const [text, setText] = React.useState("")

    const [data, setRecipedata] = React.useState<recipedata[]>([])
    const [Loading, setLoading] = React.useState<boolean>(false)
    const RefRecipedata = React.useRef(data)

    type recipedata = {
        foodImageUrl: string,
        mediumImageUrl: string,
        recipeCost: string,
        recipeTitle: string,
        recipeUrl: string,
        smallImageUrl: string,
        threeRecipeMaterial: string[]
    }

    const Fetch = (props: string[]) => {
        // const [flag, setflag] = React.useState(true)
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


                }
                catch {

                } finally {
                }
            })()

        }

        FetchAPI()


    }


    const search = (materials: string) => {
        // const  Recipedata = Fetch(materials.replaceAll("　", " ").split(" "))
        // RefRecipedata.current = Recipedata
        // setRecipedata(Recipedata)
        // console.log("RefRecipedata.current",RefRecipedata.current)
        // setLoading(false)
        // setLoading(true)
        Fetch(materials.replaceAll("　", " ").split(" "))
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
            <div className='recipe'>
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

            </div>
        </div>
    )
}

export default RecipeBox