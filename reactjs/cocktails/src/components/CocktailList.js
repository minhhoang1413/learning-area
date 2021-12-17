import { useGlobalContext } from "../context"
import Cocktail from "./Cocktail"
import Loading from './Loading'
const CocktailList = () => {
    const {cocktails, isLoading} = useGlobalContext()

    if (isLoading) {
        return <Loading />
    }
    if (cocktails.length < 1) {
        return <h2 className="section-title">no cocktails match your search criteria</h2>
    }
    return (
        <section className="section">
            <h2 className="section-title">cocktails</h2>
            <div className="cocktails-center">
                {cocktails.map(item=>
                    <Cocktail key={item.idDrink} {...item} />
                )}
            </div>
        </section>
    )
}
export default CocktailList