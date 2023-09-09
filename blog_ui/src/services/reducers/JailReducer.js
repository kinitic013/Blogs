import { murder,theft} from "../constants";

export function jail(state = { time : 0} ,action)
{
    switch(action.type)
    {
        case murder:
            {
                return {time : state.time+10};
            }
        case theft :
            {
                return {time : state.time +1};
            }
        default:
            return state;
    }
}