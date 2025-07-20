import React, {useState, useEffect, useRef, use} from "react";


function StopWatch (){

  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const intervalIdRef = useRef(null)
  const startTimeRef = useRef(0)
 
  useEffect (() => {

    if (isRunning) {
      intervalIdRef.current = setInterval(() => { setElapsedTime(Date.now() - startTimeRef.current)}, 10)
      /* setInterval(()=> {
     intervalIdRef.current = setElapsedTime((prevTime) => Date.now() - startTimeRef.current)

      }, 10) */
    }
    else {
      clearInterval(intervalIdRef.current); // Clear the interval when stopwatch stops
    }


    return () => {
      clearInterval(intervalIdRef.current)
    }
   

  }, [isRunning]);

  function start (){
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now() - elapsedTime;
      console.log("start");
      console.log(isRunning);
    } 
  }

  function stop (){
    setIsRunning(false)
    console.log('stop')
    console.log(isRunning) 

  }

  function reset (){
     setElapsedTime(0)
    setIsRunning(false)
    clearInterval(intervalIdRef.current);
    console.log('reset')
    console.log(isRunning) 

  }

  function formatTime (){

    let hours = Math.floor(elapsedTime / (1000*60*60))
    let minutes = Math.floor(elapsedTime / (1000*60) % 60)
    let seconds= Math.floor(elapsedTime / (1000) % 60)
    let milliseconds = Math.floor((elapsedTime % 1000 ) / 10)


   return `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`
  }

  function padZero(number) {
    return number < 10 ? `0${number}` : number; 
 }


return(

<div className="stop-watch">

  <div className="display">{formatTime()}</div>

  <div className="controls">
    <button className="start-button" onClick={start}>Start</button>
    <button className="stop-button" onClick={stop}>Stop</button>
    <button className="reset-button" onClick= {reset}>Reset</button>
  </div>




</div>

)


}

export default StopWatch; 