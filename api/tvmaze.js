import axios from "axios"

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const allEndpoint = `${apiUrl}?q=all`


const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log('error:', error)
        return {}
    }
}

export const fetchAll = () => {
    return apiCall(allEndpoint)
}
export const fetchSearch = input => {
    const searchEndpoint = `${apiUrl}?q=${input}`
    return apiCall(searchEndpoint)
}