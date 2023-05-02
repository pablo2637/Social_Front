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

        case 'sendInvite':
            url = `${urlBack}/api/users/invite`;
            options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data.body)
            }
            break;

        case 'removeInvite':
            url = `${urlBack}/api/users/invite`;
            options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data.body)
            }
            break;


        case 'removeFriend':
            url = `${urlBack}/api/users/friends`;
            options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data.body)
            }
            break;

        case 'getInvites':
            url = `${urlBack}/api/users/invite`;
            break;

        case 'respondInvite':
            url = `${urlBack}/api/users/invite`;
            options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data.body)
            }
            break;

        case 'updateUser':
            url = `${urlBack}/api/users`;
            options = {
                method: 'PUT',
                body: formData
            }
            break;



        case 'updateProfile':
            url = `${urlBack}/api/users/profile`;
            options = {
                method: 'PUT',
                body: formData
            }
            break;

        case 'getProfiles':
            url = `${urlBack}/api/public`;
            break;

    };


    try {
        console.log('url', url, 'options', options)
        const request = await fetch(url, options);
        // console.log('request',request)

        if (request.ok) {
            const response = await request.json();
            // console.log('response',response)
            return response;

        } else {

            throw {
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
