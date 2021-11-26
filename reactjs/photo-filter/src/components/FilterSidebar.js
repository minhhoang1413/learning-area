
export default function FilterSidebar({name, active, handleSelectSidebar}){
    return (
        <button className={`sidebar-item ${active ? 'active' : ''}`}
            onClick={handleSelectSidebar}>
            {name}
        </button>
    )
}