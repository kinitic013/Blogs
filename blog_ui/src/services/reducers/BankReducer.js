import { inc,dec, incByAmt} from "../constants";

export function amount(state ={ rupee : 0 },action)
{
    console.log(state);
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
        case incByAmt :
            {
                const val = state.rupee + action.payload;
                return {rupee : val};
            }
        default:
            return state
    }
}