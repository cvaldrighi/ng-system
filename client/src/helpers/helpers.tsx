export function getJwtFromCookie() {
    type tFinalHeaders = {
        [key: string]: string
    }

    if (document.cookie) {
        const headersTemp = document.cookie.split(';');
        const finalHeaders: tFinalHeaders = {};

        headersTemp.forEach((header) => {   // <-- looping on all cookies
            const headerTemp = header.split('='); // <-- split each cookie to get key and value
            finalHeaders[headerTemp[0].trim()] = headerTemp[1].trim()   // <-- save on object to access using keys.
        })
        const jwt = JSON.parse(finalHeaders['jwt']).access_token; // <-- get only token value

        return jwt;
    }
}

export function clearCookie() {
    document.cookie = "jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
}

