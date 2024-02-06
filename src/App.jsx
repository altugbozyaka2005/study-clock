import React from 'react'
import '/node_modules/@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [timeLeft, setTimeLeft] = React.useState(1500);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [activity, setActivity] = React.useState("session");

  let beepSound = new Audio('./src/assets/treatmelikewhitetee-timer.mov')

  React.useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime !== 0) {
            return prevTime - 1
          } else {
            clearInterval(interval)
            beepSound.play()
          }
        })
      }, 100)
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying])

  beepSound.onended = () => {
    setIsPlaying(false)
    let newActivity = activity === "session" ? "break" : "session";
    setActivity((prevActivity) => (prevActivity === "session" ? "break" : "session"))
    setTimeLeft(newActivity === "session" ? breakLength * 60 : sessionLength * 60)
  }

  React.useEffect(() => {
    setTimeLeft(activity === "session" ? sessionLength * 60 : breakLength * 60)
  }, [breakLength, sessionLength, activity])

  function playPauseTimer() {
    setIsPlaying(prevState => !prevState)
  }

  function incrementBreak() {
    if (breakLength < 60 && !isPlaying) {
      setBreakLength(prevState => prevState + 1)
    }
  }

  function decrementBreak() {
    if (breakLength > 1 && !isPlaying) {
      setBreakLength(prevState => prevState - 1)
    }
  }

  function incrementSession() {
    if (sessionLength < 60 && !isPlaying) {
      setSessionLength(prevState => prevState + 1)
    }
  }

  function decrementSession() {
    if (sessionLength > 1 && !isPlaying) {
      setSessionLength(prevState => prevState - 1)
    }
  }

  function reset() {
    setIsPlaying(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(1500);
    setActivity("session");
  }

  let minute = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  let second = (timeLeft % 60).toString().padStart(2, "0");


  return (
    <div className='clock-container'>
      <h1 className="main-title">Study Clock</h1>
      <div className='settings-container'>
        <div className='break-container'>
          <h2 id="break-label" className='break-text'>Break Length</h2>
          <div className='set-timer'>
            <button id="break-increment" onClick={incrementBreak}><i className='fa-solid fa-arrow-up'></i></button>
            <h3 id="break-length" className='break-time'>{breakLength}</h3>
            <button id="break-decrement" onClick={decrementBreak}><i className='fa-solid fa-arrow-down'></i></button>
          </div>
        </div>
        <div className='session-container'>
          <h2 id="session-label" className='session-text'>Session Length</h2>
          <div className='set-timer'>
            <button id="session-increment" onClick={incrementSession}><i className="fa-solid fa-arrow-up"></i></button>
            <h3 id="session-length" className='session-time'>{sessionLength}</h3>
            <button id="session-decrement" onClick={decrementSession}><i className='fa-solid fa-arrow-down'></i></button>
          </div>
        </div>
      </div>
      <div className='timer-container'>
        <h2 id="timer-label" className={`timer-text ${timeLeft <= 60 ? "red" : ""}`}>{activity === "session" ? "Session" : "Break"}</h2>
        <h1 id="time-left" className={`clock-display ${timeLeft <= 60 ? "red" : ""}`}>{`${minute}:${second}`}</h1>
      </div>
      <div className='buttons-container'>
        <div id="start_stop" className='play-pause' onClick={playPauseTimer}>
          <audio id="beep" src='./src/assets/treatmelikewhitetee-timer.mov'></audio>
          <i className='fas fa-play'></i>
          <i className='fas fa-pause'></i>
        </div>
        <i id="reset" className='fas fa-recycle' onClick={reset}></i>
      </div>
    </div>
  )
}

export default App
