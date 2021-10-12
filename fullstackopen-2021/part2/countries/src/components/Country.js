import Weather from "./Weather"
const Country = ({country}) => (
    <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital.join(", ")}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
            {Object.keys(country.languages).map(lang =>
                <li key={lang}>{country.languages[lang]}</li>
            )}
        </ul>
        <img src={country.flags.svg} alt={(country.name.common) + " flag"} width="300" />
        <Weather country={country} />
    </div>
)
export default Country