import { getLocalProfiles } from "../../../helpers/localStorage";

export const getUserData = (_id, profiles) => {
    // console.log('profiles', _id, profiles);

    if (profiles.length == 0)
        profiles = getLocalProfiles();

    const userData = profiles.find(prof => prof._id == _id);

    return userData;
};
