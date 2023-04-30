import { useDispatch, useSelector } from "react-redux";
import { onLoadProfile, onLoadProfileComplete, onLoadingProfile, onUpdateProfile, onUpdatingComplete, onUpdatingProfile } from '../store/slice/usersSlice';
import { fetchLoadProfiles, fetchUpdateProfile } from "../helpers/fetchData";
import { onLoginUser } from "../store/slice/authSlice";
import { setLocal } from "../helpers/localStorage";

export const useUserStore = () => {

  const { status, user, isChecking } = useSelector((state) => state.auth);
  const { profiles } = useSelector((state) => state.users);
  const dispatch = useDispatch();


  const loadProfiles = async () => {

    dispatch(onLoadingProfile());

    const response = await fetchLoadProfiles();

    if (!response.ok)
      return {
        ok: false,
        msg: response
      };

    dispatch(onLoadProfile(response.profiles));

    dispatch(onLoadProfileComplete());

    return { ok: true };

  };


  const updateUserProfile = async (formData) => {

    dispatch(onUpdatingProfile());

    const response = await fetchUpdateProfile(formData);

    if (!response.ok)
      return {
        ok: false,
        msg: response
      };

    dispatch(onLoginUser(response.user));
    setLocal(response.user);

    const newProfile = profiles.filter(profile => profile._id != response.user._id);
    newProfile.push({
      _id: response.user._id,
      name: response.user.name,
      email: response.user.email,
      profileOrder: response.user.profileOrder,
      profile: response.user.profile
    });

    dispatch(onUpdateProfile(newProfile));

    dispatch(onUpdatingComplete());

    return {
      ok: true,
      user: response.user
    };

  };


  return {
    loadProfiles,
    updateUserProfile
  };
};
