const urlBack = import.meta.env.VITE_URL_BACK;

export const userAPI = async (data, formData) => {

    let url, options = {};
    switch (data.type) {

        case 'email':
            url = `${urlBack}/api/users/email/${data.email}`;
            break;

        case 'register':
            url = `${urlBack}/api/users`;
            options = {
                method: 'POST',
                body: formData
            }
            break;

        case 'registerGoogle':
            url = `${urlBack}/api/users`;
            options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data.body)
            }
            break;

    };


    try {
        console.log('url', url, 'options', options)
        const request = await fetch(url, options);

        if (request.ok) {
            const response = await request.json();

            return response;

        } else {

            throw {
                ok: false,
                data: request
            };
        }

    } catch (e) {
        console.log('errorFetch', e)

        return {
            msg: 'errorFetch',
            error: e,
            ok: false
        }

    };
}
