import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Card from './components/Card'
import NewJournal from './pages/NewJournal'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/card/:id",
    element: <Card />,
  },
  {
    path: "/new-journal",
    element: <NewJournal />,
  }
  
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
)