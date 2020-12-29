var contentContainer = document.getElementById('ct-ctn');
var searchIcon = document.getElementById("search-icon");
var abc= contentContainer.children;
var abcp = document.getElementsByClassName('card-text');


// for(let j=0; j<abc.length; j++)
// {
//     if (abc[j].tagName=='div')
//     abc[j].style.display='none';
// }
searchIcon.onclick= function()
{
    var x= document.getElementsByName("keyword")[0].value;
    fetch('http://localhost:8000/search',{
        // method: 'post',
        // body: JSON.stringify({keyword: x})
        method: 'get'
    })
    .then(response => {
        if (response.status == 200) {
            response.json().then(data => {
                // console.log(data);
                for (let i=0; i<abc.length; i++)
                {
                    abcp[i].innerHTML = data[i].phanloai + ' ' + data[i].quanhuyen;
                    // if (abc[i+1].tagName=='div')
                    // abc[i+1].style.display='block';
                }
            });
        }
    });
    
}

// function a()
// {
//     fetch('http://localhost:8000/search',{
//         method: 'get'
//     })
//     .then(response => {
//         if (response.status == 200) {
//             response.json().then(data => {
                
//             });
//         }
//     });
// }