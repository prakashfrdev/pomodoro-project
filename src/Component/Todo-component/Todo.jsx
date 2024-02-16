import React from 'react'
import './style.css'
import { useSelector } from 'react-redux'
const Todo = ({task,onClick,indexVal}) => {
    // let color=useSelector(state=>state.reduce.color);
  return (
    <div className='todo-container'>
        <input type='checkbox'/>
        <p className='todo-input'>{task}</p>
        <i class="fa-solid fa-trash-can " style={{color:'black',fontSize: '20px',cursor:'pointer'}} onClick={()=>onClick(indexVal)}></i>
    </div>
  )
}

export default Todo;