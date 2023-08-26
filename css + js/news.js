function generateAndRenderCards() {
    fetch("./json/news.json")
        .then(response => response.json())
        .then(data => {
            const wrapper = document.querySelector('.wrapper');
            data.forEach(item => {
                const cardHTML = `
                    <a href="${item.link}" target="_blank">
                        <div class="card">
                            <div class="card-banner">
                                <p class="category-tag ${item.category.toLowerCase()}">${item.category}</p>
                                <img class="banner-img" src="${item.bannerImageUrl}" alt="">
                            </div>
                            <div class="card-body">
                                <p class="blog-hashtag">${item.hashtags.join(' ')}</p>
                                <h2 class="blog-title">${item.title}</h2>
                                <p class="blog-description">${item.description}</p>
    
                                <div class="card-profile">
                                    <img class="profile-img" src="${item.profileImageUrl}" alt="">
                                    <div class="card-profile-info">
                                        <h3 class="profile-name">${item.profileName}</h3>
                                        <p class="profile-followers">${item.profileFollowers}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                `;
                wrapper.insertAdjacentHTML('beforeend', cardHTML);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Call the combined function to generate and render the cards
generateAndRenderCards();
