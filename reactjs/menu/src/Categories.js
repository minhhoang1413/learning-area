const Categories = ({ categories, filterCategory }) => {
    return <div className="btn-container">
        {categories.map((cat, index) =>
            <button key={index}
                className="filter-btn"
                onClick={() => filterCategory(cat)}>
                {cat}
            </button>
        )}
    </div>
}
export default Categories