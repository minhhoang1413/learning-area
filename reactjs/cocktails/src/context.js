import { createContext, useContext, useEffect, useState } from "react";

const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('a')
    const [cocktails, setCocktails] = useState([])

    const fetchDrink = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${baseUrl}${searchTerm}`)
            const data = await response.json()
            if (data.drinks) {
                // const newCocktails = data.drinks.map(item => {
                //    const {idDrink,strAlcoholic,strDrink,strDrinkThumb,strGlass} = item
                //    return 
                // })
                setCocktails(data.drinks)
            } else {
                setCocktails([])
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        fetchDrink()
    },[searchTerm])
    return (
        <AppContext.Provider value={{
            isLoading, cocktails, setSearchTerm
        }}>
            {children}
        </AppContext.Provider>
    )
}
export const useGlobalContext = () => {
    return useContext(AppContext)
}