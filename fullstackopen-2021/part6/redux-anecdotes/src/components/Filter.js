import { createFilter } from "../reducers/filterReducer"
import { connect, useDispatch } from "react-redux"
const Filter = (props) => {
    // const dispatch = useDispatch()
    const style = {
        marginBottom: 10
    }
    const handleChange = (ev) => {
        // dispatch(createFilter(ev.target.value))
        props.createFilter(ev.target.value)
    }
    return (
        <div style={style}>
            <input type="search" onChange={handleChange} />
        </div>
    )
}
const mapDispatchToProps = {
    createFilter
}
export default connect(
    null,
    mapDispatchToProps
)(Filter)