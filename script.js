
const button = document.getElementById("loadBtn");
const button2 = document.getElementById("loadPost");
const userList = document.getElementById("userList");

button.addEventListener("click", getUsers);
button2.addEventListener("click", getPosts);

async function getUsers() {
    userList.textContent = "Loading users...";

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to load users");
        }

        const users = await response.json();
        userList.innerHTML = "";

        users.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";

            card.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>City: ${user.address.city}</p>
                <p>Zipcode: ${user.address.zipcode}</p>
            `;

            userList.appendChild(card);
        });
    } catch (error) {
        userList.textContent = "Error: " + error.message;
        console.error(error);
    }
}

async function getPosts() {
    userList.textContent = "Loading posts...";

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
            throw new Error("Failed to load posts");
        }

        const posts = await response.json();
        userList.innerHTML = "";

        posts.forEach(post => {
            const card = document.createElement("div");
            card.className = "user-card";

            const title = document.createElement("h3");
            title.textContent = post.title;

            const body = document.createElement("p");
            body.textContent = post.body;

            card.append(title, body);
            userList.appendChild(card);
        });

        console.log("Posts loaded:", posts);
    } catch (error) {
        userList.textContent = "Error: " + error.message;
        console.error(error);
    }
}
