
function cardCreator(userObject){

  const cardContainer = document.createElement('div');
  const profilePicture = document.createElement('img');
  const cardInfoContainer = document.createElement('div');
  const nameHeader = document.createElement('h3');
  const username = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const profileLink = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  cardContainer.classList.add('card');
  profilePicture.src = userObject.avatar_url;
  cardInfoContainer.classList.add('card-info');
  nameHeader.classList.add('name');
  nameHeader.textContent = userObject.name;
  username.classList.add('username');
  username.textContent = userObject.login;
  location.textContent = `Location: ${userObject.location}`;  
  profile.textContent = 'Profile:';
  profileLink.href = userObject.url;
  profileLink.textContent = userObject.url;
  followers.textContent = `Followers: ${userObject.followers}`;
  following.textContent = `Following: ${userObject.following}`;
  bio.textContent = `Bio: ${userObject.bio}`;

  cardContainer.appendChild(profilePicture);
  cardContainer.appendChild(cardInfoContainer);
  cardInfoContainer.appendChild(nameHeader);
  cardInfoContainer.appendChild(username);
  cardInfoContainer.appendChild(location);
  cardInfoContainer.appendChild(profile);
  cardInfoContainer.appendChild(followers);
  cardInfoContainer.appendChild(following);
  cardInfoContainer.appendChild(bio);
  profile.appendChild(profileLink);

  return cardContainer;
}

const followersArray = ["msteele11101", "LeTanque", "ZIng178", "CarlosETurcios"];
const parentElement = document.querySelector('.cards');

axios
  .get("https://api.github.com/users/ccsmith13")
  .then(response => {
      console.log(response.data);
      const myData = response.data;
      parentElement.appendChild(cardCreator(myData));
      })
  .catch(error => {
  console.log ('The data was not returned', error);
});

function followerCardCreator(usernameArray){
  usernameArray.forEach((followerUsername)=>{
    axios
      .get(`https://api.github.com/users/${followerUsername}`)
      .then(response => {
          //console.log(response.data);
          const followerData = response.data;
          parentElement.appendChild(cardCreator(followerData));
          })
      .catch(error => {
      console.log ('The data was not returned', error);
    });
  });
};

followerCardCreator(followersArray);