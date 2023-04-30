import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUserStore } from '../hooks/useUserStore';
import { Profile } from "./user/components";

export const HomePage = () => {

  const { profiles, isLoading, userStatus } = useSelector((state) => state.users);

  const { loadProfiles } = useUserStore();


  const getProfiles = () => {

    loadProfiles();

  };


  useEffect(() => {
    getProfiles();

  }, []);

  return (

    <section>

      <h1>Bienvenido a Social Connect</h1>

      {profiles.map(profile =>

        <Profile key={profile._id} {...profile} />
      )}

    </section>

  );
};
