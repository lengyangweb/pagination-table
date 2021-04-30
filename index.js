const tbody = document.querySelector('#tbody');
const nextButton = document.querySelector('.nextBtn');
const prevButton = document.querySelector('.prevBtn');
const page = document.querySelector('.page');

let newUsers;

async function fetchUsers() {
    const users = await fetch("https://reqres.in/api/users?page=2")
        .then(res => res.json());
        localStorage.setItem('users', JSON.stringify(users.data));
}

fetchUsers();

newUsers = JSON.parse(localStorage.getItem("users"));

function getFiverUsers() {
    return newUsers.filter((user, index) => index <= 4);
}

function displayUsers(arr) {
    arr.forEach(user => {
        const { email, first_name, last_name } = user;
        tbody.innerHTML +=    `
            <tr>
                <td>${first_name} ${last_name}</td>
                <td>${email}</td>
            </tr>
        `;
    })
}

function getNextUsers() {
    const newUserArr = newUsers.filter((user, index) => index >= 5 && index <= 9);
    tbody.innerHTML = "";
    setTimeout(() => {
        displayUsers(newUserArr);
        page.innerHTML = 2
    }, 100);
}

function getPrevUsers() {
        const newUserArr = newUsers.filter((user, index) => index >= 0 && index <= 4);
        tbody.innerHTML = "";
        setTimeout(() => {
            displayUsers(newUserArr);
            page.innerHTML = 1;
        }, 100);
}

document.addEventListener("DOMContentLoaded", displayUsers(getFiverUsers()));

nextButton.addEventListener("click", getNextUsers);

prevButton.addEventListener("click", getPrevUsers);