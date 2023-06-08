const compareFunction = (a, b) => {
    if(a.Vote<b.Vote)
    return 1;
    else
    return -1;
}


const customSort = function(arr)
{
    arr.sort(compareFunction);
    for(let i=0;i<arr.length;i++)
    {
        console.log(arr[i].Vote);
    }
    return arr;
} 

module.exports.customSort = customSort;



