import { useDispatch, useSelector } from "react-redux";
import { onLoadProfile, onLoadProfileComplete, onLoadingProfile, onUpdateProfile, onUpdatingComplete, onUpdatingProfile } from '../store/slice/userSlice';
import { fetchUpdateProfile } from "../helpers/fetchData";
import { onLoginUser } from "../store/slice/authSlice";
import { setLocal } from "../helpers/localStorage";

export const useUserStore = () => {

  const { status, user, isChecking } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const loadProfile = () => {

    dispatch(onLoadingProfile());

    console.log('user profile', user.profile)
    dispatch(onLoadProfile(user.profile || []));

    dispatch(onLoadProfileComplete());

  };


  const updateUserProfile = async (formData) => {

    dispatch(onUpdatingProfile());

    const response = await fetchUpdateProfile(formData);
    console.log('response', response)

    if (!response.ok)
      return {
        ok: false,
        msg: response
      }

    dispatch(onLoginUser(response.user));
    setLocal(response.user);

    console.log('response profile', response.user.profile)
    dispatch(onUpdateProfile(response.user.profile));


    dispatch(onUpdatingComplete());

    return {
      ok: true,
      user: response.user
    }

  }


  return {
    loadProfile,
    updateUserProfile
  }
}
