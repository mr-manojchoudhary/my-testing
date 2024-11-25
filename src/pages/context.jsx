import React, { createContext, useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";



const MainContext = createContext();

export default function Context(props) {
    const [user, SetUser] = useState(null); // Use camelCase for the setter
    const [quizs,Setquizs]=useState([]);



    const fetchData = () => {
        const db = getDatabase();
        const starCountRef = ref(db, 'quiz/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const arr = Object.keys(data).map((d,i)=>{
                return { id : d, ...data[d]}
            })
            Setquizs(arr)
        });
        
    }

    useEffect(
        ()=>{
            fetchData()
        },
        []
    )

    useEffect(
        ()=>{
            const lsUser= localStorage.getItem("user")
             if(lsUser != undefined){
                SetUser(JSON.parse(lsUser))
             }
        },
        []
    )

    const login =(data)=>{
        SetUser(data);
        localStorage.setItem("user",JSON.stringify(data));
    }

    const logout =(data)=>{
        SetUser(null);
        localStorage.removeItem("user");
    }

    return (
        <MainContext.Provider value={{ user, SetUser,login,quizs }}>
            {props.children}
        </MainContext.Provider>
    );
}

export { MainContext };
