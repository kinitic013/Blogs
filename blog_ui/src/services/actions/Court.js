import { murder , theft } from "../constants";


export function kill(){
  return { type: murder};
};
export function steal()
{
    return {type : theft};
};
