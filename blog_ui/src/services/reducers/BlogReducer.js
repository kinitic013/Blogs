import {produce} from "immer"
import initialBlogList from "../../data/BlogList";
import {add , subtract , update , set} from "../constants";

export function blogReducer( state = {bloglist : initialBlogList } , action)
{
    switch(action.type){
        case add :
            {
                const val = produce(state.bloglist,(draft)=>{
                    draft.push(action.payload);
                });
                return { bloglist : val };
            }
        case subtract :
            {
                const val = state.bloglist.filter((value)=> value._id !== action.payload.id);
                return { bloglist : val };
            }
        case update :
            {
                const val = produce(state.bloglist, (draft)=>{
                    const element = draft.find((val)=>val._id === action.payload._id);
                    element.Head = action.payload.Head;
                    element.Body = action.payload.Body
                    });
                return { bloglist : val };
            }
        case set :
            {
                return {bloglist : action.payload.newArray};
            }
        default:
            return state
    }
}