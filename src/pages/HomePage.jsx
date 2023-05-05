import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Profile } from "./user/components";
import { useUserStore } from "../hooks/useUserStore";

export const HomePage = () => {

  const { profiles, isLoading, userStatus } = useSelector((state) => state.users);

  const { loadProfiles } = useUserStore();

  const getData = async () => {

    await loadProfiles();
  };

  useEffect(() => {
    getData();

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
