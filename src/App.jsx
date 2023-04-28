import { NavBar } from './components/NavBar';
import { NavBarUser } from './components/NavBarUser';
import { useAuthStore } from './hooks/useAuthStore';
import { AppRoutes, UserRoutes } from './routers'


function App() {

  const {
    user,
    isChecking,
    status
  } = useAuthStore();

  return (

    <>
      <p>Status: {status} - isChecking: {isChecking.toString()} - user: {user.name}</p>

      {
        (status === 'authenticated') && <img src={user.image} alt="" />

      }

      <header>
        <p>Social Connect</p>
      </header>
      {
        (status === 'authenticated')
          ?
          <NavBarUser />
          :
          <NavBar />
      }

      <main>

        {
          (status === 'authenticated')
            ?
            <UserRoutes />
            :
            <AppRoutes />
        }

      </main>


      <footer>
        <p>Footer</p>
      </footer>

    </>
  );

}

export default App
