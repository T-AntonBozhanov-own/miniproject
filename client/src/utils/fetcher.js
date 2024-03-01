import {HTTP_METHODS} from "../constants";

export const fetcher = async (url, method = HTTP_METHODS.GET, body) => {
    let result
    try {
        const response = await fetch(`/api/${url}`, {
            method,
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await response.json()
    } catch (e) {
        console.log('Fetch error', e)
    }

    return result
}
