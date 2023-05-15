import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";

import { onLoadUsers, onLoadingUsers, onLoadInvites, onUpdatingInvites, onLoadProfile, onLoadProfileComplete, onLoadingProfile, onUpdateProfile, onUpdatingComplete, onUpdatingProfile, onNewProfiles, onNewInvites } from '../store/slice/usersSlice';
import { onLoadChats } from "../store/slice/socketSlice";
import { onLoadFriends, onLoadMsgs, onLoginUser, onNewMsgs } from "../store/slice/authSlice";

import { fetchLoadInvites, fetchLoadProfiles } from "../helpers/fetchData";
import { setLocal, setLocalChats, setLocalFriends, setLocalInvites, setLocalMsgs, setLocalProfiles } from "../helpers/localStorage";
import { fetchDataChats, fetchDataFriends, fetchDataMsgs, fetchUpdatePrivateProfile, fetchUpdateProfile } from "../pages/user/helpers/fetchDataUser";
import { fetchGetUsers } from "../pages/admin/helpers/fetchDataAdmin";

import { SocketContext } from "../contexts/SocketContext";



/**
 * @author Pablo
 * @module useUserStore
 */


/**
 * Hook personalizado para almacenar el state de las invitaciones, perfiles y los usuarios pero para su gestión por el admin
 * @method useUserStore
 */
export const useUserStore = () => {

  const { profiles } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);


  /**
   * Hace el fetch para cargar los perfiles públicos
   * @method loadProfiles
   * @async
   * @returns {json} ok
   */
  const loadProfiles = async () => {

    dispatch(onLoadingProfile());

    const response = await fetchLoadProfiles();

    if (!response.ok)
      return {
        ok: false,
        msg: response
      };

    dispatch(onLoadProfile(response.profiles));
    setLocalProfiles(response.profiles);

    dispatch(onNewProfiles());
    dispatch(onLoadProfileComplete());

    return { ok: true };

  };


  /**
  * Hace el fetch para cargar las invitaciones
  * @method loadProfiles
  * @async
  * @returns {json} ok
  */
  const loadInvites = async () => {

    dispatch(onUpdatingInvites());

    const response = await fetchLoadInvites();

    if (!response.ok)
      return {
        ok: false,
        msg: response
      };


    dispatch(onLoadInvites(response.invites));
    setLocalInvites(response.invites)

    return { ok: true };

  };


  /**
  * Hace el fetch para modificar los datos del perfil público del usuario
  * @method updateUserProfile
  * @async
  * @param {Object} formData Los datos del formulario sin serializar
  * @returns {json} ok y user
  */
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
    setLocalProfiles(newProfile);

    dispatch(onUpdatingComplete());

    return {
      ok: true,
      user: response.user
    };

  };



  /**
  * Hace el fetch para modificar los datos del perfil privado del usuario
  * @method updateUserPrivateProfile
  * @async
  * @param {Object} formData Los datos del formulario sin serializar
  * @returns {json} ok y user
  */
  const updateUserPrivateProfile = async (formData) => {

    dispatch(onUpdatingProfile());

    const response = await fetchUpdatePrivateProfile(formData);

    if (!response.ok)
      return {
        ok: false,
        msg: response
      };

    dispatch(onLoginUser(response.user));
    setLocal(response.user);

    // const newProfile = profiles.filter(profile => profile._id != response.user._id);
    // newProfile.push({
    //   _id: response.user._id,
    //   name: response.user.name,
    //   email: response.user.email,
    //   profileOrder: response.user.profileOrder,
    //   profile: response.user.profile
    // });

    // dispatch(onUpdateProfile(newProfile));
    // setLocalProfiles(newProfile);

    dispatch(onUpdatingComplete());

    return {
      ok: true,
      user: response.user
    };

  };



  /**
  * Hace el fetch para cargar los chats de un usuario
  * @method loadChats
  * @async
  * @returns {json} ok 
  */
  const loadChats = async (_id) => {

    const chats = await fetchDataChats(_id);

    if (!chats.ok)
      return {
        ok: false,
        response: chats.msg
      };


    dispatch(onLoadChats(chats.chats));
    setLocalChats(chats.chats)
    socket.emit('whoAmI', { userID: _id });

    return {
      ok: true
    };

  };


  /**
    * Hace el fetch para cargar los amigos de un usuario
    * @method loadFriends
    * @async
    * @returns {json} ok 
    */
  const loadFriends = async (_id) => {

    const friends = await fetchDataFriends(_id);

    if (!friends.ok)
      return {
        ok: false,
        response: friends.msg
      };


    dispatch(onLoadFriends(friends.friends));
    setLocalFriends(friends.friends)

    return {
      ok: true
    };

  };


  /**
    * Hace el fetch para cargar los mensajes de un usuario
    * @method loadMsgs
    * @async
    * @returns {json} ok 
    */
  const loadMsgs = async () => {

    const msgs = await fetchDataMsgs(user._id);

    if (!msgs.ok)
      return {
        ok: false,
        response: msgs.msg
      };


    dispatch(onLoadMsgs(msgs.msgs));
    setLocalMsgs(msgs.msgs)

    dispatch(onNewMsgs(true));

    return {
      ok: true
    };

  };


  /**
    * Hace el fetch para cargar los usuarios para su gestión por parte del admin
    * @method getUsers
    * @async
    * @returns {json} ok 
    */
  const getUsers = async () => {

    dispatch(onLoadingUsers());

    const users = await fetchGetUsers();

    if (!users.ok)
      return {
        ok: false,
        response: users.msg
      };


    dispatch(onLoadUsers(users.users));

    return {
      ok: true
    };

  };


  return {
    getUsers,
    loadChats,
    loadMsgs,
    loadFriends,
    loadProfiles,
    loadInvites,
    updateUserProfile,
    updateUserPrivateProfile
  };
};
