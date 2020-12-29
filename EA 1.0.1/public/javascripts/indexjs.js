var contentContainer = document.getElementById('ct-ctn');
var searchIcon = document.getElementById("search-icon");

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
                console.log(data);
           
            });
        }
    });
}
function a()
{
    fetch('http://localhost:8000/search',{
        method: 'get'
    })
    .then(response => {
        if (response.status == 200) {
            response.json().then(data => {
                
            });
        }
    });
}