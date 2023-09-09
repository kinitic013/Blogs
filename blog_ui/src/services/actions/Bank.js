import { inc, dec , incByAmt } from "../constants";


export function increment(){
  return { type: inc};
};
export function decrement()
{
    return {type : dec};
};
export function incrementByAmount(amt)
{
  return {type : incByAmt , payload : amt}
};
