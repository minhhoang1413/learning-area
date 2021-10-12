
const Filter = ({newFilter,handleNewFilter}) => (
    <div>
        filter shown with: <input value={newFilter} onChange={handleNewFilter} />
    </div>
)
export default Filter;