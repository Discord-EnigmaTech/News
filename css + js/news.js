// Function to generate a card element based on the provided data
function generateCard(data) {
    return `
    <a href="${data.link}" target="_blank">
        <div class="card">
            <div class="card-banner">
                <p class="category-tag ${data.category.toLowerCase()}">${data.category}</p>
                <img class="banner-img" src="${data.bannerImageUrl}" alt="">
            </div>
            <div class="card-body">
                <p class="blog-hashtag">${data.hashtags.join(' ')}</p>
                <h2 class="blog-title">${data.title}</h2>
                <p class="blog-description">${data.description}</p>

                <div class="card-profile">
                    <img class="profile-img" src="${data.profileImageUrl}" alt="">
                    <div class="card-profile-info">
                        <h3 class="profile-name">${data.profileName}</h3>
                        <p class="profile-followers">${data.profileFollowers}</p>
                    </div>
                </div>
            </div>
        </div>
    </a>
    `;
}

// Function to load and render the cards from the JSON data
function renderCards() {
    fetch("../json/news.json")
        .then(response => response.json())
        .then(data => {
            const wrapper = document.querySelector('.wrapper');
            data.forEach(item => {
                const cardHTML = generateCard(item);
                wrapper.insertAdjacentHTML('beforeend', cardHTML);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Call the renderCards function to load and display the cards
renderCards();
