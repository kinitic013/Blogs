import {add , subtract , update , set} from "../constants"

export function increment(newBlog){
    return { type: add , payload : newBlog};
  };
export function decrement(id)
{
    return {type : subtract , payload : {id : id}};
};
export function edit(newBlog)
{
  return {type : update , payload : newBlog};
}
export function reset(newBloglist)
{
  return {type : set , payload : newBloglist};
}