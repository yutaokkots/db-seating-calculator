//const baseUrl = "https://docs.google.com/spreadsheets/d/"
const googleAppScript = import.meta.env.VITE_GOOGLE_APP_SCRIPT

const sendRequest = async(method="GET") => {
    const options = { method };
    const url = `${googleAppScript}`;
    const result = await fetch(url, options)

    if (result.ok) return result.json()
    throw new Error('Bad Request')
}

export default sendRequest;