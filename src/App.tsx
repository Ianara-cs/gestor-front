import { RouterProvider } from 'react-router'
import { router } from './routes'
import { useNotification } from './shared/hooks/useNotification';
import { useRequests } from './shared/hooks/useRequest';

function App() {
  const { contextHolder } = useNotification();
  // const { setUser } = useGlobalContext();
  // const { request } = useRequests();

  // useEffect(() => {
  //   request(URL_USER, MethodsEnum.GET, setUser);
  // }, []);
  
  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  )
}

export default App
