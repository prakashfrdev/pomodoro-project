export const  changeColor =(color)=>{
   return {type:'changed',payload:color}
   // console.log(color))
}
export const fullTask=(daily)=>{
   // console.log(daily);
   return{type:'fullTask',payload:daily}
}
export const taskdel=(ind)=>{
   return{type:'taskDel',payload:ind}
}