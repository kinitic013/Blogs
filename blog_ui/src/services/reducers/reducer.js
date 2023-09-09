import { inc,dec } from "../constants";

export function amount(state ={ rupee : 0},action)
{
    switch(action.type){
        case inc :
            {
                const val=state.rupee+1;
                return { rupee : val };
            }
        case dec :
            {
                const val=state.rupee-1;
                return { rupee : val };
            }
        default:
            return state
    }
}

export function jail(state = { time : 0},action)
{
    switch(action.type)
    {
        case "murder":
            {
                return {time : state+1};
            }
        default:
            return state;
    }
}