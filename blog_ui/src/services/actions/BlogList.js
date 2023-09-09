import {add , subtract} from "../constants"

export function increment(newBlog){
    return { type: add , payload : newBlog};
  };
export function decrement(id)
{
    return {type : subtract , payload : id};
};