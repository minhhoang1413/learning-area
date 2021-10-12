import Country from "./Country"
import ListCountry from "./ListCountry"
const Countries = ({ newInput, countries, showCountry }) => {
    if (newInput === "") {
        return <p>enter name countries</p>
    }
    if (countries.length > 10) {
        return <p>too many match, specify another filter</p>
    } else if (countries.length > 1) {
        return (
            <div>
                {countries.map(country => (
                    <ListCountry key={country.name.common} country={country} showCountry={showCountry} />
                    )
                )}
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <Country country={countries[0]} />
        )
    }
    return null;
}
export default Countries;