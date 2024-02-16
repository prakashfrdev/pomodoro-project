const intialState={
    name:'pomodoro',
    timer:[],
    todoContent:[]
    
}

const reduce=(state=intialState,action)=>{
    // console.log(action);
    switch(action.type){
        case 'changed':
            return {...state,color:action.payload}
        case 'fullTask':
            return{...state,todoContent:[...state.todoContent,action.payload]}
        case 'taskDel':
            return{...state,todoContent:state.todoContent.filter((el,indx)=>{
                    return action.payload!==indx
            })}
        default:
            return state;
            
    }
   
}

export default reduce;
