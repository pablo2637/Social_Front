
export const getUserData =  (_id, profiles) => {
    
    const { name, email, image } = profiles.find(prof => prof._id == _id);

    return { name, email, image };
};
