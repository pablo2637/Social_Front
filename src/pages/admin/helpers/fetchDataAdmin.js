import { userAPI } from "../../../api/userAPI";


export const fetchGetUsers = async () => {

    const data = {
        type: 'getUsers'
    }

    const response = await userAPI(data);

    if (response.ok) {

        return {
            ok: true,
            users: response.data
        };

    } else {

        return {
            ok: false,
            msg: response.msg
        }

    }
};


export const fetchDeleteUser = async (_id, uid) => {

    const data = {
        type: 'deleteUser',
        body: { _id, uid }
    }

    const response = await userAPI(data);

    if (response.ok) {

        return {
            ok: true,
            users: response.data
        };

    } else {

        return {
            ok: false,
            msg: response.msg
        }

    }
};


