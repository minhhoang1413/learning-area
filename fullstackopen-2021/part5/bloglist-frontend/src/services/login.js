const baseUrl = '/api/login'

const login = async (credentials) => {
    const config = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    }

    const response = await fetch(baseUrl, config)

    const data = await response.json()
    if (!response.ok) {
        throw (data)
    }
    return data

}
export default { login }