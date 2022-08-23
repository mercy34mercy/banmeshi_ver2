import React from "react";

type props = {
    materials: String[]
}

type recipedata = {
    foodImageUrl: String,
    mediumImageUrl: String,
    recipeCost: String,
    recipeTitle: String,
    recipeUrl: String,
    smallImageUrl: String,
    threeRecipeMaterial: String
}

export const Fetch = (props: String[]) => {
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
                console.log("setdata => ", setdata)

                // setflag(false)
            }
            catch {

            } finally {
            }
        })()

    }


    console.log("fetch")
    FetchAPI()
    let flag = true
    return { Recipedata ,flag}

}