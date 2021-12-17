import { useGlobalContext } from "../context"
const SearchForm = () => {
    const {setSearchTerm} = useGlobalContext()

    const handleSearchChange = (e)=>{
        setSearchTerm(e.target.value)
    }
    return (
        <section className="section-search">
            <form  className="search-form" onSubmit={e=>e.preventDefault()}>
                <div className="form-control">
                    <label htmlFor="search">search your favorite cocktail</label>
                    <input type="text" id="search" onChange={handleSearchChange} />
                </div>
            </form>
        </section>
    )
}
export default SearchForm