import React from "react";
import "./style.css";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Timer from "../Component/Timer-Comp/Timer";
import Todo from "../Component/Todo-component/Todo";
import { fullTask, taskdel } from "../main/task/action";
import audioFile from "../assets/auds.mp3";

const Home = () => {
  let [second, setSecond] = useState(0);
  let [counter, setCounter] = useState(false);
  let [totalSet, setTotalSet] = useState(0);
  let [taskCount, setTaskCount] = useState(0);
  let [restCount, setRestCount] = useState(0);
  let [longRestCount, setLongRestCount] = useState(0);
  let [styles, setStyles] = useState("tasks");
  let [runTime, setRunTime] = useState(false);
  let [music, setMusic] = useState(false);
  let [todo, setTodo] = useState("");
  let dispatch = useDispatch();
  let setTimerStatus = (chan) => {
    switch (chan) {
      case "tasks":
        return setSecond(1500000), setStyles("tasks"), setCounter(true);
      case "rest":
        return setSecond(300000), setStyles("rest"), setCounter(false);
      case "longRest":
        return setSecond(1500000), setStyles("longRest"), setCounter(false);
    }
  };
  // let divides=
  // console.log(runTime);
  // console.log(styles),
  document.title = styles;
  useEffect(() => {
    let timeing;
    if (runTime) {
      timeing = setInterval(() => {
        setSecond((prev) => prev - 1000);
      }, 1000);
    }
    return () => {
      if (runTime) {
        clearInterval(timeing);
      }
    };
  }, [runTime]);
  // let Aud=('/assets/auds.mp3');
  // const audioElement = new Audio(Audios);
  let content = () => {
    //  Aud.play();
    setTimerStatus(styles);
    // setCounter(!counter)
    setRunTime(!runTime);
    // counter ? setStyles("rest") : setStyles("tasks");
    // setSecond(divides)
  };
  const reSetTime = () => {
    setTaskCount(1),
      setRestCount(0),
      setLongRestCount(0),
      setStyles("tasks"),
      setCounter(true),
      setSecond(1500000);
  };
  useEffect(() => {
    if (second <= 0) {
      setSecond(() => (counter ? 300000 : 1500000));
      setTotalSet(totalSet + 1);
      setCounter(!counter);
      counter ? setStyles("rest") : setStyles("tasks");
      // console.log(counter);
      // console.log(totalSet);
      if (totalSet % 8 == 0 && totalSet >= 8) {
        setSecond(20000);
        setStyles("longRest");
        setCounter(false);
        setLongRestCount(longRestCount + 1);
        // console.log(styles);
      }
      console.log(styles);

      // console.log(styles);
    }
  }, [second]);
  useEffect(() => {
    if (styles === "rest") {
      alert("take rest"), audioRef.current.play();
      setRestCount(restCount + 1);
    }
    if (styles === "tasks") {
      setTaskCount(taskCount + 1);
    }
  }, [styles]);

  // useEffect(() => {
  //   const times = setInterval(() => {
  //     setSecond((prev) => prev - 1000);
  //   }, 1000);
  //   return () => clearInterval(times);
  // }, [])
  // }
  let colorButton = useSelector((state) => state.reduce.color);
  // console.log(colorButton);

  // console.log(colorButton);
  //   console.log(second);
  // console.log(todo);

  //settter

  //  switch(chan){
  //   case 'task':

  //     case 'longRest':
  //       setSecond(1500000)
  // }

  const addList = () => {
    if (todo.length === 0) {
      return null;
    }
    dispatch(fullTask(todo));
    //  setTodoData([...todoData,todo])
    inputRef.current.focus();
    setTodo("");
  };
  let deleteTask = (ind) => {
    dispatch(taskdel(ind));
  };
  let collectionTask = useSelector((state) => state.reduce.todoContent);
  // console.log(collectionTask);
  // console.log(styles);
  let audioRef = useRef(null);
  let inputRef = useRef(null);
  const setterMus = () => {
    music ? audioRef.current.play() : audioRef.current.pause();
    setMusic(!music);
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>Pomodoro Timer</h1>
        <p>Made with React JS and {"\u2764"} by Suriyaprakash</p>
        <p
          className="restart-button"
          style={{ color: `${colorButton}` }}
          onClick={reSetTime}
        >
          Restart Session
        </p>
      </div>
      <div className="main-content">
        <div className="timer">
          <div className="status-header">
            <p
              style={{
                borderBottom: `3px solid ${
                  styles === "tasks" ? "#3C91E6" : "transparent"
                }`,
              }}
            >
              Task {taskCount}
            </p>
            <p
              style={{
                borderBottom: `3px solid ${
                  styles === "rest" ? "#AF3B6E" : "transparent"
                }`,
              }}
            >
              Rest {restCount}
            </p>
            <p
              style={{
                borderBottom: `3px solid ${
                  styles === "longRest" ? "#AF3B6E" : "transparent"
                }`,
              }}
            >
              Long Rest {longRestCount}
            </p>
          </div>
          <div className="stop-watch">
            <Timer data={second} currentStatus={styles} />
            <button
              className="click-button"
              style={{ backgroundColor: `${colorButton}` }}
              onClick={() => content(styles)}
            >
              {runTime ? <p>Stop</p> : <p>Start</p>}
            </button>
          </div>
        </div>
        <div className="todos">
          <h2>Tasks</h2>
          <input
            className="todo-int"
            type="text"
            onChange={(eve) => setTodo(eve.target.value)}
            ref={inputRef}
            value={todo}
          />
          <button className="todo-button" onClick={addList}>
            Add Task
          </button>
          <div className="tasks">
            {collectionTask.map((el, ind) => {
              return (
                <Todo task={el} key={ind} indexVal={ind} onClick={deleteTask} />
              );
            })}
          </div>
        </div>
      </div>
      <div className="musicplayer">
        <audio ref={audioRef} src={audioFile} />
        <p onClick={setterMus} className="play-button">
          {music ? (
            <i class="fa-solid fa-play" style={{ fontSize: "20px" }}></i>
          ) : (
            <i className="fa-solid fa-pause" style={{ fontSize: "20px" }}></i>
          )}
        </p>
        <p className="music-content">Alarm </p>
      </div>
    </div>
  );
};
export default Home;
