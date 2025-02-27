let IP_Address;
let postal;
let timeZone;
let post_offices;

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://ipinfo.io/json")
    .then((response) => response.json())
    .then((data) => {
      IP_Address = data.ip;
      document.getElementById("ip-container").innerHTML = `
            <h2>Your Current IP Address is <span>${data.ip}</span></h2>
            <button id="start-btn" onclick="fetchUserInfo()">Get Started</button>
        `;
    })
    .catch((error) => {
      console.error("Error fetching IP address:", error);
    });
});

const fetchUserInfo = () => {
  document.getElementById("hero").style.display = "none";
  document.getElementById("data").style.display = "block";
  fetch(`https://ipinfo.io/${IP_Address}/geo`)
    .then((response) => response.json())
    .then((data) => {
      postal = data.postal;
      timeZone = data.timezone;
      document.getElementById("data-container").innerHTML = `
         <p>IP Address: <span>${IP_Address}</span></p>
            <div class="grid-row">
                <div class="grid-col"> <p>Lat: <span>${
                  data.loc.split(",")[0]
                }</span></p></div>
                <div class="grid-col"><p>City:  <span>${
                  data.city
                }</span></p></div>
                <div class="grid-col"><p>Organisation:  <span>${
                  data.org
                }</span></p></div>
                <div class="grid-col"><p>Long: <span>${
                  data.loc.split(",")[1]
                }</span></p></div>
                <div class="grid-col"><p>Region: <span>${
                  data.region
                }</span></p></div>
                <div class="grid-col"><p>Hostname: <span>${
                  data.hostname ? data.hostname : "No Hostname"
                }</span></p></div>
            </div>
        `;
      document.getElementById("map-item").innerHTML = `
        <iframe src="https://maps.google.com/maps?q=${data.loc.split(",")[0]},${data.loc.split(",")[1]}&z=15&output=embed" width="100%" height="100%" frameborder="0" style="border:0"></iframe>
        `;
      fetchPostOffice();
    });
};

const fetchPostOffice = () => {
  fetch(`https://api.postalpincode.in/pincode/${postal}`)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("userInfo").innerHTML = `
            <p>Time Zone: <span>${timeZone}</span></p>
            <p>Date And Time: <span>${new Date().toLocaleString("en-US", {
              timeZone: timeZone,
            })}</span></p>
            <p>Pincode: <span>${postal}</span></p>
            <p>Message: <span>${data[0].Message}</span></p>
        `;
      post_offices = data[0].PostOffice;
      renderPostOffice(post_offices);
    });
};


function searchPost(){
    let text = document.getElementById("search-post");
    console.log("search",text.value);
    console.log(post_offices.filter((item)=>item.Name.toLowerCase().includes(text.value.toLowerCase())));
    renderPostOffice(post_offices.filter((item)=>item.Name.toLowerCase().includes(text.value.toLowerCase()) || item.BranchType.toLowerCase().includes(text.value.toLowerCase()) ))
}

function renderPostOffice(officeList){
 let post_container = document.getElementById("post-container");
 post_container.innerHTML = ``
 officeList.map((postOffice)=>{
    post_container.innerHTML += `
         <div class="post"> 
            <p>Name: <span>${postOffice.Name}</span></p>
            <p>Branch Type: <span>${postOffice.BranchType}</span></p>
            <p>Delivery Status: <span>${postOffice.DeliveryStatus}</span></p>
            <p>District: <span>${postOffice.District}</span></p>
            <p>Division: <span>${postOffice.Division}</span></p>
        </div>
        `;
 })

}
