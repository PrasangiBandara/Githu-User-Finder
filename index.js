// Define constants
const URL = 'https://api.github.com/users/';
const userInput = document.getElementById('input');
const userResult = document.getElementById('result');

// user search function
function findUser() {

    // user input
    const searchUser = userInput.value;
    
    //REST API
    const userUrl = URL + searchUser;
    const reposUrl = userUrl + '/repos';

    Promise.all([
        fetch(userUrl).then(response => response.json()),
        fetch(reposUrl).then(response => response.json())
    ])
    .then(data => {
        const user = data[0];
        const repos = data[1];

        // show details of user
        const details = `
            <h2>${user.login}</h2>
            <img src="${user.avatar_url}">
            <ul>
                <li><b>Name: </b> ${user.name || 'Not Available'}</li>
                <li><b>Bio: </b> ${user.bio || 'Not Available'}</li>
                <li><b>Followers: </b> ${user.followers}</li>
                <li><b>Following: </b> ${user.following}</li>
            </ul>
        `;
        userResult.innerHTML = details;

        //all repositories
        const allRepos = repos.map(repo => `<li>${repo.name}</li>`).join('');
        const repoDetails = `
            <h3>Exsisting Repositories of ${user.name}</h3>
            <ul>${allRepos}</ul>
        `;
        userResult.innerHTML += repoDetails;

        //last 3 repositories
        const lastRepos = repos.slice(0, 3).map(repo => `<li>${repo.name}</li>`).join('');
        const lastRepoDetails = `
            <h3>Lastly used Repositories of ${user.name}</h3>
            <ul>${lastRepos}</ul>
        `;
        userResult.innerHTML += lastRepoDetails;

    })

    //error handling
    .catch(error => {
        const errorMessage = `
            <br><br><br>
            <h2>User is not found</h2>
        `;
        userResult.innerHTML = errorMessage;
    });

}