
let IP_Address;

document.addEventListener("DOMContentLoaded",()=>{
    fetch("https://ipinfo.io/json") 
    .then(response => response.json())
    .then(data => {
        IP_Address = data.ip;
        document.getElementById("ip-container").innerHTML = `
            <h2>Your Current IP Address is <span>${data.ip}</span></h2>
            <button id="start-btn" onclick="fetchUserInfo()">Get Started</button>
        `
       console.log(`IP Address: ${data.ip}`)
    })
    .catch(error => {
        console.error("Error fetching IP address:", error);
    });

    
    
})
const fetchUserInfo = ()=>{
    fetch(`https://ipapi.co/${IP_Address}/json/`)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
    })
}