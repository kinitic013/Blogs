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
// const arr=[
//         { "Head" : "NAMAMAYI", "Body" : "Kudasi", "Vote" : -1, "__v" : 0 },
//         { "Head" : "NAMAMAYI", "Body" : "hehe", "Vote" : 0, "__v" : 0 },
//         {  "Head" : "dafd", "Body" : "HO", "Vote" : -2, "__v" : 0 }
// ];

// console.log(arr.sort(compareFunction));

module.exports = customSort;



