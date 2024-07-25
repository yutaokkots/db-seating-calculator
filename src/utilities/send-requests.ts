
const timeout = (ms: number) => 
    new Promise((_, reject) => 
        setTimeout(() => 
            reject(new Error('Timeout')), ms))

const sendRequest = async(url:string, method="GET", data:Record<string, any> | null = null, timeoutMs = 8000) => {
    const options:RequestInit = { 
        method,
    };
    if (data){
        options.headers={
            'Content-Type': 'application/json'
        } 
        options.body = JSON.stringify(data)
    }
    if (method == "POST"){
        options.redirect = "follow"
        options.headers={
            'Content-Type': "text/plain;charset=utf-8"
        } 
    }

    const fetchPromise = fetch(url, options)
        .then((result) => {
            if (result.ok){
                return result.json()
                }
            throw new Error('Bad Request')
            })
        .catch(error => {
            console.error('Error in fetch:', error);
            throw error;
        });
    return Promise.race([fetchPromise, timeout(timeoutMs)])
}

export default sendRequest;