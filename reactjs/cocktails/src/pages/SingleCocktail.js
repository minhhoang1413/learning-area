import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import Loading from "../components/Loading"
import { useGlobalContext } from "../context"
const SingleCocktail = () => {
    const { id } = useParams()
    const { cocktails } = useGlobalContext()
    const [cocktail, setCocktail] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const cocktail = cocktails.find(item => item.idDrink === id)
        if (cocktail) {
            setCocktail(cocktail)
            setLoading(false)
        } else {
            fetchSingleCocktail()
        }
    }, [id])
    const fetchSingleCocktail = async () => {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            const data = await response.json()
            if (data.drinks) {
                setCocktail(data.drinks[0])
            } else {
                setCocktail(null)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    if (loading) {
        return <Loading />
    }
    if (!cocktail) {
        return <h2 className="section-title">no cocktail to display</h2>
    }
    let ingredient = ""
    let i = 1
    while (cocktail[`strIngredient${i}`]) {
        ingredient += cocktail[`strIngredient${i}`] + ', '
        i++
    };
    return (
        <section className="section cocktail-section">
            <Link to="/" className="btn btn-primary">back home</Link>
            <h2 className="section-title">{cocktail.strDrink}</h2>
            <div className="drink">
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <div className="drink-info">
                    <p>
                        <span className="drink-data">name: </span>
                        {cocktail.strDrink}
                    </p>
                    <p>
                        <span className="drink-data">category: </span>
                        {cocktail.strCategory}
                    </p>
                    <p>
                        <span className="drink-data">Info: </span>
                        {cocktail.strAlcoholic}
                    </p>
                    <p>
                        <span className="drink-data">glass: </span>
                        {cocktail.strGlass}
                    </p>
                    <p>
                        <span className="drink-data">Instruction: </span>
                        {cocktail.strInstructions}
                    </p>
                    <p>
                        <span className="drink-data">Ingredient: </span>
                        {ingredient.substring(0,ingredient.length-1)}
                    </p>
                </div>
            </div>
        </section>
    )
}
export default SingleCocktail