const APIURL = 'https://api.github.com/users/';
const search = document.querySelector("#search");
const main = document.querySelector("#main");
document.querySelector("#form").addEventListener("submit", e => {
    e.preventDefault();
    let input = search.value;
    if (input && input.trim()) {
        //let user = getUser(input);
        //console.log(input)
        createUserCard(input);
    }
});
async function getData(url) {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.status);
    }
    return await response.json();
}
 function createUserCard(name) {
    getData(APIURL + name).then(user => {
        let userName = user.name || user.login;
        let userBio = user.bio;
        let cardHtml = `
            <div class="card">
                <img class="card-img" src="${user.avatar_url}" alt="">
                <div class="card-text">
                    <h2>${userName}</h2>
                    <p>${userBio}</p>
                    <ul>
                        <li>${user.followers} <strong>Followers</strong></li>
                        <li>${user.following} <strong>following</strong></li>
                        <li>${user.public_repos} <strong>Repos</strong></li>
                    </ul>
                    <div class="repo">
                        
                    </div>
                </div>
            </div>
            `
        main.innerHTML = cardHtml;
        if(user.public_repos > 0)addReposToCard(user.repos_url);
    }).catch(e => {
        let cardHtml = `<div class="card">
            <h2>${e.message}</h2>
        </div>`;
        main.innerHTML = cardHtml;
    });
}
function addReposToCard(url){
    const reposRoot = document.querySelector('.repo');
    getData(url).then(repos => {
        
        repos.forEach(repo => {
            let repoEle = document.createElement("a");
            repoEle.href = repo.html_url;
            repoEle.target = "_blank";
            repoEle.textContent = repo.name;
            reposRoot.appendChild(repoEle);
        });
    }).catch(e => {
        reposRoot.textContent = e.message;
    });
}