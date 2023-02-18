import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/Activities/Dashboard/ActivityDashboard";
import ActivityDetails from "../../features/Activities/Dashboard/details/ActivityDetails";
import ActivityForm from "../../features/Activities/Dashboard/form/ActivityForm";
import NotFound from "../../features/Errors/NotFound";
import ServerError from "../../features/Errors/ServerError";
import TestErrors from "../../features/Errors/TestError";
import ProfilePage from "../../features/Profiles/ProfilePage";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";

export const routes : RouteObject[] = [
    {
        path: '/',
        element: <App/>, 
        children: [
            {element: <RequireAuth/>, children: [
                {path:'activities', element: <ActivityDashboard/>},
                {path:'activities/:id', element: <ActivityDetails/>},
                {path:'createActivity', element: <ActivityForm key='create'/>},
                {path:'manage/:id', element: <ActivityForm key='manage'/>},
                {path:'profiles/:username', element: <ProfilePage/>},
                {path:'errors', element: <TestErrors/>},
            ]},
            
            {path:'not-found', element:<NotFound/>},
            {path:'server-error',element:<ServerError/>},
            {path:'*', element:<Navigate replace to='/not-found'/>}
        ]
    }
]

export const router = createBrowserRouter(routes);