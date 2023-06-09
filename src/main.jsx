import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './routes/Routes.jsx'
import AuthProvider from './providers/AuthProvider'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// import AddClass from './pages/Dashboard/InstructorDashboard/AddClass'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* <AddClass> */}
          <RouterProvider router={Routes}></RouterProvider>
        {/* </AddClass> */}
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
