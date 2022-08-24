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
        foodImageUrl: String,
        mediumImageUrl: String,
        recipeCost: String,
        recipeTitle: String,
        recipeUrl: String,
        smallImageUrl: String,
        threeRecipeMaterial: String
    }

    const Fetch = (props: String[]) => {
        // const [flag, setflag] = React.useState(true)
        let Recipedata: recipedata[] = []
        const url = "https://banmeshikun.azurewebsites.net/random_one_by_mate"

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: props })
        };


        const FetchAPI = async () => {
            (async () => {
                try {
                    const response = await fetch(url, requestOptions)
                    const body = await response.json()
                    console.log("body => ", body.data[0])

                    const setdata: recipedata = {
                        foodImageUrl: body.data[0].foodImageUrl,
                        mediumImageUrl: body.data[0].mediumImageUrl,
                        recipeCost: body.data[0].recipeCost,
                        recipeTitle: body.data[0].recipeTitle,
                        recipeUrl: body.data[0].recipeUrl,
                        smallImageUrl: body.data[0].smallImageUrl,
                        threeRecipeMaterial: body.data[0].threeRecipeMaterial
                    }
                    Recipedata.push(setdata);
                    data.push(setdata)
                    console.log("setdata => ", setdata)

                    // setflag(false)
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
            <div className='main'>
                {data.map((recipe, i) => <li key={i}>{recipe.foodImageUrl}</li>)}
            </div>
        </div>
    )
}

export default RecipeBox