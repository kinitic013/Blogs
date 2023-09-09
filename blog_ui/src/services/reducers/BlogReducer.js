import {produce} from "immer"
import initialBlogList from "../../data/BlogList";
import {add , subtract} from "../constants";

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
                const val = produce(state.bloglist, (draft)=>{
                    const temp = draft.filter(function (value , index) {
                        return value.id !== action.payload.id;
                    });
                    draft = temp;
                })

                return { rupee : val };
            }
        default:
            return state
    }
}