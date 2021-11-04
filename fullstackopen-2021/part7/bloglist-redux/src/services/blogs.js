const baseUrl = '/api/blogs'
let token = null

const getAll = async () => {
    const response = await fetch(baseUrl)
    const data = await response.json()
    return data
}
const create = async (blog) => {
    const config = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(blog)
    }
    const response = await fetch(baseUrl, config)
    const data = await response.json()
    if (!response.ok) {
        throw (data)
    }
    return data
}
const update = async (id) => {
    const config = {
        method: 'put',
        headers: {
            'Authorization': token
        }
    }
    const response = await fetch(`${baseUrl}/${id}`, config)
    const data = await response.json()
    if (!response.ok) {
        throw (data)
    }
    return data
}
const remove = async (id) => {
    const config = {
        method: 'delete',
        headers: {
            'Authorization': token
        }
    }
    const response = await fetch(`${baseUrl}/${id}`, config)
    console.log(response)
    //const data = await response.json()
    if (!response.ok) {
        throw (response.statusText)
    }
    //return data
}
const setToken = (newToken) => {
    token = `bearer ${newToken}`
    console.log(newToken)
}
export default { getAll, create, update, remove, setToken }