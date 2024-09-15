import { useRef } from "react";
import { useEffect, useState } from "react"

const StopWatch = () => {

    const [time,setTime] = useState(0);
    const ref = useRef(null)
    const [timerStarted,setTimeStarted] = useState(false)


    const startTimer = () => {

        ref.current = setInterval(() => {
            setTime(time => time + 10)
        },10)
    }

    const stopTimer = () => {

        if(ref.current){
            clearInterval(ref.current)
        }
        
    }

    return(

       <div>
            <label className="text-4xl font-bold text-red-600">Stop Watch</label>
            <div className="text-5xl px-4 my-10">
                <span className="px-4">{Math.floor((time / 60000) % 60).toString().padStart(2, '0')}</span>: 
                <span className="px-4">{Math.floor((time / 1000) % 60).toString().padStart(2, '0')}</span>: 
                <span className='text-red-600 px-4'>{((time / 10) % 100).toString().padStart(2, '0')}</span>
            </div>
            
            <div className=" flex justify-between">
                <button className="w-32" onClick={() => {
                   startTimer()
                   setTimeStarted(true)
                   
                    }}>
                    {timerStarted? 'resume' : 'start'}
                </button>
                <button className="w-32" onClick={() => {
                   stopTimer()
                }}>
                    stop
                </button>

            </div>
            {timerStarted ? 
                <button className="w-32 my-10" onClick={() => {
                    setTimeStarted(false)
                    stopTimer()
                    setTime(0)
                }}>
                    reset
                </button> : <></>}
       </div>
    )
}

export default StopWatch