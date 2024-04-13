







import { SET_PREVIEW_STATE } from "../action/previewAction"; 
const INITIAL_STATE = [];
const previewReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_PREVIEW_STATE:
            const  DT  = action.payload;
            // console.log(state)
          if(state && state.length>0 && state.some(q=>q?.id===DT?.id)){
            const index=state.findIndex(q=>q?.id===DT.id)
            state[index].value=DT.value

            return state;
          }
          else{
            return [...state,DT]  
          }
        
  
        default:
            return state;
    }
};
export default previewReducer;