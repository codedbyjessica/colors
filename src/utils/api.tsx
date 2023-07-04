export const getContrastCheck = (fcolor: string, bcolor: string, success: any, fail: any) => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };

    fetch(`https://webaim.org/resources/contrastchecker/?fcolor=${fcolor.replace("#", "")}&bcolor=${bcolor.replace("#", "")}&api`, requestOptions)
        .then(response => {
            if (response.status >= 400 && response.status < 600) {
                throw new Error(String(response.status));
            } else {
                return response.json()
            }
        })
        .then(result => {
            return success(result);
        })
        .catch(error => {
            fail(error);
        })
}