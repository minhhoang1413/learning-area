import { Link,  } from "react-router-dom"

const Cocktail = ({idDrink,strAlcoholic,strDrink,strDrinkThumb,strGlass}) => {
    
    return (
        <article className="cocktail">
            <div className="img-container">
                <img src={strDrinkThumb} alt={strDrink} />
            </div>
            <div className="cocktail-footer">
                <h3>{strDrink}</h3>
                <h4>{strGlass}</h4>
                <p>{strAlcoholic}</p>
                <Link to={`/cocktail/${idDrink}`} className="btn btn-primary btn-detail">details</Link>
            </div>
        </article>
    )
}
export default Cocktail