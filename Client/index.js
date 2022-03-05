//making it a bit easier to name endpoints
var baseUrl = 'http://localhost:4200'

//getting some HTML elements
const popup = document.querySelector(".popup")
const close = document.querySelector("#close-popup")

//making it so the popup appears after 2 seconds of the page loading
window.onload = function(){
    setTimeout(
        function open(){
            popup.style.display = "block"
        },
        2000
    )
};

//making it so you can see the button to close the popup once the checkbox is checked
function seeCloseButton(){
    const checkBox = document.querySelector("#terms");
    const button = document.querySelector("#close-popup");
    if(checkBox.checked == true){
        button.style.display = "block"
    } else {
        button.style.display = "none"
    }
}

//function to close the popup
close.addEventListener("click", () => {
    popup.style.display = "none"
});

//function to run when the form is submitted
const fight = (event) => {
    event.preventDefault();
    let challenger = {
        name: document.querySelector("#player-name").value,
        age: document.querySelector("#player-age").value,
        height: document.querySelector("#player-height").value,
        build: document.querySelector("#player-build").value,
        gender: document.querySelector("#player-gender").value,
        power: 0
    };
    axios.post(`${baseUrl}/api/info`, challenger)
    .then((res) => {
        const data = res.data;
        alert("Brutal! You took down " + res.data.finalResults + " toddlers!");
    })
    .catch((err) => console.log(err)); 
}

//function to see leaderboard results
const seeResults = (event) => {
    console.log('see results')
    event.preventDefault();
    axios.get(`${baseUrl}/api/results`)
    .then((res) => {
        const data = res.data;
        const leaderboardButton = document.querySelector("#see-leaderboard")
        console.log(res.data);
        for (let i = 0; i < data.length; i++) {
            let leaderboard = document.createElement("li");
            document.querySelector("ul").appendChild(leaderboard);
            let leaderboardEntry = document.createElement("span");
            leaderboardEntry.textContent = data[i];
            leaderboard.appendChild(leaderboardEntry);
            let deleteButton = document.createElement("button");
            deleteButton.idName = "delete";
            deleteButton.textContent = "delete";
            leaderboardEntry.appendChild(deleteButton);
            deleteButton.addEventListener("click", deleteResults);
        }
    })
    .catch((err) => console.log(err));
}

//function to delete leaderboard results
const deleteResults = (event) => {
    event.preventDefault();
    let entry = event.target.parentNode.firstChild.textContent;
    axios.delete(`${baseUrl}/api/results/${entry}`)
    .then((res) => {
        document.querySelector("li").textContent = "";
    })
    .catch((err) => console.log(err));
}

//getting the html elements and adding event listeners
document.querySelector("form").addEventListener("submit", fight);
let form = document.querySelector("form");
form.addEventListener("submit", fight);

document.querySelector("#see-leaderboard").addEventListener("click", seeResults)
let leaderboardButton = document.querySelector("#see-leaderboard")
leaderboardButton.addEventListener("click", seeResults);
