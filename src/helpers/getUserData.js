
export const getUserName = (_id, profiles) => {
    
    const { name, email } = profiles.find(prof => prof._id == _id);
    
    return { name, email };
};
