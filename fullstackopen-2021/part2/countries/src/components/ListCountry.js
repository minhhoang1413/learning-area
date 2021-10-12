
const ListCountry = ({ country, showCountry }) => (
    <div>
        <p>{country.name.common}</p>
        <button onClick={() => showCountry(country.name.common)}>show</button>
    </div>
)
export default ListCountry;