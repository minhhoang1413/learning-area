
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseUrl)
    const data = await response.json()
    return data
}
const createNew = async (content) => {
    const obj = {content,votes:0}
    const response = await fetch(baseUrl,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(obj)
    })
    return response.json()
}
const update = async (id, obj) => {
    const response = await fetch(`${baseUrl}/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    return response.json()
}
export default {getAll, createNew, update}