
const Form = ({ handleSubmit, categories }) => {
    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select className="form-control" id="category" name="category">
                    {categories.map(category =>
                        <option key={category.id} value={category.id}>{category.name}</option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input className="form-control" type="number" id="amount" name="amount" min="1" max="50" defaultValue="10" />
            </div>
            <button className="form-control" type="submit">Generate</button>
        </form>
    )
}
export default Form