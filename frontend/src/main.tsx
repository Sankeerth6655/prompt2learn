import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import PublicLayout from './layouts/PublicLayout.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import Auth from './pages/Auth.tsx';
import ProtectedLayout from './layouts/ProtectedLayout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import GenerateRoadmap from './pages/GenerateRoadmap.tsx';
import Learning from './pages/Learning.tsx';
import RoadmapPreview from './pages/RoadmapPreview.tsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import ChatRoadmap from './pages/ChatRoadmap.tsx';

const router = createBrowserRouter([
  {
    element:<PublicLayout></PublicLayout>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
    ]
  },
  {
    element:<AuthLayout></AuthLayout>,
    children:[
      {
        path:'/auth',
        element:<Auth></Auth>
      },
    ]
  },
  {
    element:<ProtectedLayout></ProtectedLayout>,
    children:[
      {
        path:'/dashboard',
        element:<Dashboard></Dashboard>
      },
      {
        path:'/create-roadmap',
        element:<GenerateRoadmap></GenerateRoadmap>
      },
      {
        path:'/learning/:roadmapId',
        element:<Learning></Learning>
      },
      {
        path:'/roadmap-preview',
        element:<RoadmapPreview></RoadmapPreview>
      },
      {
        path:'/chat-roadmap',
        element:<ChatRoadmap></ChatRoadmap>
      },
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    </Provider>
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar
      newestOnTop
      pauseOnHover={false}
      closeButton={false}
      pauseOnFocusLoss={false}
      draggable={false}
      theme="dark"
      toastClassName="custom-toast"
    />
  </>
);
