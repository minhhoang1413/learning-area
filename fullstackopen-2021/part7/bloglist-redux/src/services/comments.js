const baseUrl = '/api/blogs'

const getAll = async (id) => {
    const url = `${baseUrl}/${id}/comments`
    const response = await fetch(url)
    const data = await response.json()
    return data
}
const create = async (id, comment) => {
    const url = `${baseUrl}/${id}/comments`
    const config = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment)
    }
    const response = await fetch(url, config)
    const data = await response.json()
    if (!response.ok) {
        throw (data)
    }
    return data
}
export default { getAll, create }