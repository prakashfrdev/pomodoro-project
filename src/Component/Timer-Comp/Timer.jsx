import React, { useEffect } from "react";
import moment from "moment";
import { changeColor } from "../../main/task/action";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Progress, Space, ConfigProvider } from "antd";
const Timer = ({ data, currentStatus }) => {
  let totalTime = data;
  // console.log(currentStatus);
  const setPercentage = (status) => {
    switch (status) {
      case "tasks":
        return 1500000;
      case "rest":
        return 300000;
      case "longRest":
        return 1500000;
    }
  };
 
  let percent=setPercentage(currentStatus)
  // console.log(percent);
  let timePercentage = (totalTime / percent) * 100;
  const styleColor = (color) => {
    switch (color) {
      case "tasks":
        return "#3C91E6";
      case "rest":
        return " #AF3B6E";
      case "longRest":
        return "#CFF27E";
      default :
      return '#777'
    }
  };
  let heading=`${currentStatus}  ${moment.duration(totalTime).minutes()}:${moment.duration(totalTime).seconds()}`
  document.title=heading
  const dispatch = useDispatch();
  useEffect(()=>{
    const givenColor=styleColor(currentStatus)
     dispatch(changeColor(givenColor))
  // console.log(givenColor);

  },[currentStatus])
let colours=useSelector(state=>state.reduce.color)
  // console.log(colours);
  return (
    <div className="timer-component">
      <ConfigProvider
        theme={{
          components: {
            Progress: {
              // fontSize:'30px',
              circleTextColor: `${styleColor(currentStatus)}`,
            },
          },
        }}
      >
        <Space wrap style={{ fontWeight: "bolder", color: "red" }}>
          <Progress
            type="circle"
            strokeColor={`${colours}`}
            size={300}
            strokeWidth={2}
            percent={timePercentage}
            format={() =>
              `${moment.duration(totalTime).minutes()}:${moment
                .duration(totalTime)
                .seconds()}`
            }
          />
        </Space>
      </ConfigProvider>

      <p style={{ color: `${styleColor(currentStatus)}` }} className="current-status">
        {currentStatus}
      </p>
     
    </div>
  );
};

export default Timer;
