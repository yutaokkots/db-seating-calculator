//const baseUrl = "https://docs.google.com/spreadsheets/d/"
const googleAppScript = import.meta.env.VITE_GOOGLE_APP_SCRIPT

const timeout = (ms: number) => 
    new Promise((_, reject) => 
        setTimeout(() => 
            reject(new Error('Timeout')), ms))

const sendRequest = async(method="GET", timeoutMs = 8000) => {
    const options = { method };
    const url = `${googleAppScript}`;

    const fetchPromise = fetch(url, options)
        .then((result) => {
            if (result.ok)
                return result.json();
            throw new Error('Bad Request')
        })
    return Promise.race([fetchPromise, timeout(timeoutMs)])
    // const result = await fetch(url, options)

    // if (result.ok) return result.json()
    // throw new Error('Bad Request')
}

export default sendRequest;