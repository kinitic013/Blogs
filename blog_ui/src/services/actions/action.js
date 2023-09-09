import { inc, dec } from "../constants";


export function increment(){
  return { type: inc};
};
export function decrement()
{
    return {type : dec};
}
