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
        path:'/login',
        element:<Auth></Auth>
      },
    ]
  },
  {
    element:<ProtectedLayout></ProtectedLayout>,
    children:[
      {
        path:'dashboard',
        element:<Dashboard></Dashboard>
      },
      {
        path:'/create-roadmap',
        element:<GenerateRoadmap></GenerateRoadmap>
      },
      {
        path:'/learning',
        element:<Learning></Learning>
      },
      {
        path:'/roadmap-preview',
        element:<RoadmapPreview></RoadmapPreview>
      },
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}></RouterProvider>
);
