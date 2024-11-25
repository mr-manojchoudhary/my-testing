import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from './context'

function Play() {
    const { quizs } = useContext(MainContext);
    const [current, setCurrent] = useState(0)

    return (
        <div className='shadow-lg p-10 w-[400px] mx-auto mt-20'>
            <Box quiz={quizs[current]} current={current} />
            <button
                disabled={current === quizs.length - 1}
                onClick={() => setCurrent(current + 1)}
                className="bg-blue-500 disabled:bg-blue-50 rounded-md p-2 my-4"
            >
                Next
            </button>
        </div>
    )
}

function Box({ quiz, current }) {
    const[ans,setAns] = useState(null);
    const Answer=()=>{
        setAns(quiz.correctOption)
    }

    useEffect(
        ()=>{
            setAns(null)
        },
        [quiz]  
    )
    return (
        <div>
            <h1 className='text-2xl my-4'>({current + 1}){quiz?.question}</h1>
            <div className='text-xl  flex flex-col gap-5'>
                <div onClick={Answer} className={` ${ans == 1 && "bg-green-500 text-[white]"}shadow py-1 w-full  cursor-pointer`}>(A) {quiz?.option1}</div>
                <div onClick={Answer} className={` ${ans == 2 && "bg-green-500 text-[white]"}shadow py-1 w-full cursor-pointer`}>(B) {quiz?.option2}</div>
                <div onClick={Answer} className={` ${ans == 3 && "bg-green-500 text-[white]"}shadow py-1 w-full cursor-pointer`}>(C) {quiz?.option3}</div>
                <div onClick={Answer} className={` ${ans == 4 && "bg-green-500 text-[white]"}shadow py-1 w-full cursor-pointer`}>(D) {quiz?.option4}</div>
            </div>
        </div>
    )
}


export default Play;