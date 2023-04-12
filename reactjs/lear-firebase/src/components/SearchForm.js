import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchForm() {
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        if (searchTerm.trim().length === 0) {
            return
        }
        navigate('/images?user=' + searchTerm.trim())
    }
    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="search by username" type="search" name="" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <button type="submit">search</button>
        </form>
    )
}

export default SearchForm