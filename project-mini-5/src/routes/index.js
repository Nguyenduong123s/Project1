import { Children } from "react";
import LayoutDefault from "../layout/LayoutDefault";
import Home from "../page/Home";
import Topic from "../page/Topic";
import Answers from "../page/Answers";
import Login from "../page/Login";
import Register from "../page/Register";
import Quiz from "../page/Quiz";
import Result from "../page/Result";

export const routers = [
    {
        path : "/",
        element : <LayoutDefault/>,
        children : [
            {
                path : "/",
                element : <Home/>
            },
            {
                path : "/topic",
                element : <Topic/>
            },
            {
                path : "/answers",
                element : <Answers/>
            },
            {
                path : "/login",
                element : <Login/>
            },
            {
                path : "/register",
                element : <Register/>
            },
            {
                path : "/quiz/:id",
                element : <Quiz/>
            },
            {
                path : "/result/:id",
                element : <Result/>
            }
        ]
    }
]