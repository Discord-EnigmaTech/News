/*const apiKey = "c2fea2262e6d4202b7fd8532037e28ff";
const apiUrl = `https://newsapi.org/v2/top-headlines?country=fr&category=technology&apiKey=${apiKey}`;
const localJsonUrl = "./json/news.json";

// Function to fetch news data, update the HTML, and apply styles
async function updateNewsContent() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    renderNewsFromApi(data.articles);
  } catch (error) {
    console.error(
      "Error fetching news from API. Using local data:",
      error.message
    );
    // Fetch and render data from local JSON file
    fetch(localJsonUrl)
      .then((response) => response.json())
      .then((data) => renderNewsFromLocal(data))
      .catch((localError) => {
        console.error("Error fetching local data:", localError);
      });
  }
}

function renderNewsFromApi(articles) {
  // Update HTML content
  const newsContainer = document.getElementById("newsContainer");

  const categoryTags = ["Populaire", "Tech", "Internet"];

  // Clear existing content in the news container
  newsContainer.innerHTML = "";

  // Create a new div for each article
  articles.forEach((article) => {
    const articleDiv = document.createElement("div");
    const randomCategoryTag =
      categoryTags[Math.floor(Math.random() * categoryTags.length)];
    articleDiv.className = "card";

    // Add content to the article div
    articleDiv.innerHTML = `
      <a href="${article.url}" target="_blank">
        <div class="card-banner">
          <p class="category-tag ${randomCategoryTag.toLowerCase()}">${randomCategoryTag}</p>
          <img class="banner-img" src="https://source.unsplash.com/random/?technology${getRandomQueryParameter()}" alt="">
        </div>
        <div class="card-body">
          <h2 class="blog-title">${article.title}</h2>
          <div class="card-profile">
            <div class="card-profile-info">
              <h3 class="profile-name">${article.author}</h3>
              <p class="date">${article.publishedAt}</p>
            </div>
          </div>
        </div>
      </a>
    `;

    // Append the article div to the news container
    newsContainer.appendChild(articleDiv);
  });
}

// Function to generate a random query parameter
function getRandomQueryParameter() {
  // You can use a timestamp or any random string to ensure uniqueness
  return `&random=${Math.random().toString(36).substring(7)}`;
}

function renderNewsFromLocal(data) {
  // Update HTML content for local data
  const newsContainer = document.getElementById("newsContainer");

  // Clear existing content in the news container
  newsContainer.innerHTML = "";

  // Assuming the HTML structure for local data is different
  // Modify the rendering logic accordingly
  data.forEach((item) => {
    const cardHTML = `
      <a href="${item.link}" target="_blank">
        <div class="card">
          <div class="card-banner">
            <p class="category-tag ${item.category.toLowerCase()}">${
      item.category
    }</p>
            <img class="banner-img" src="${item.bannerImageUrl}" alt="">
          </div>
          <div class="card-body">
            <p class="blog-hashtag">${item.hashtags.join(" ")}</p>
            <h2 class="blog-title">${item.title}</h2>
            <p class="blog-description">${item.description}</p>
  
            <div class="card-profile">
              <img class="profile-img" src="${item.profileImageUrl}" alt="">
              <div class="card-profile-info">
                <h3 class="profile-name">${item.profileName}</h3>
                <p class="date">${item.date}</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    `;
    newsContainer.insertAdjacentHTML("beforeend", cardHTML);
  });
}

// Call the function to fetch news data and update the HTML
updateNewsContent();*/

const apiKey = "pub_354950e787697d57d1463fa7fed8e8714345e ";
const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=fr&category=technology`;
const localJsonUrl = "./json/news.json"; // Adjust the path accordingly

// Fetch data from the API
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    if (data.status === "success") {
      renderNewsFromJson(data.results);
    } else {
      console.error("Error fetching data from the API");
      // If there is an error, use local data
      fetch(localJsonUrl)
        .then((response) => response.json())
        .then((localData) => {
          renderNewsFromLocal(localData);
        })
        .catch((localError) => {
          console.error("Error fetching local data:", localError);
        });
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    // If there is an error, use local data
    fetch(localJsonUrl)
      .then((response) => response.json())
      .then((localData) => {
        renderNewsFromLocal(localData);
      })
      .catch((localError) => {
        console.error("Error fetching local data:", localError);
      });
  });

function renderNewsFromJson(articles) {
  // Update HTML content
  const newsContainer = document.getElementById("newsContainer");

  // Clear existing content in the news container
  newsContainer.innerHTML = "";

  // Array of possible category tags
  const categoryTags = ["populaire", "tech", "internet"];

  // Create a new div for each article
  articles.forEach((article) => {
    const articleDiv = document.createElement("div");
    const keywords = article.keywords || [];
    const randomCategoryTag =
      keywords.length > 0
        ? keywords[Math.floor(Math.random() * keywords.length)].toLowerCase()
        : categoryTags[Math.floor(Math.random() * categoryTags.length)];

    // Randomly select one of the values: "populaire", "tech", or "internet"
    const categoryOptions = ["populaire", "tech", "internet"];
    const randomCategoryClass =
      categoryOptions[Math.floor(Math.random() * categoryOptions.length)];

    articleDiv.className = "card";

    // Add content to the article div
    articleDiv.innerHTML = `
      <a href="${article.link}" target="_blank">
        <div class="card-banner">
          <p class="category-tag ${randomCategoryClass}-tag">${randomCategoryTag}</p>
          <img class="banner-img" src="${
            article.image_url
              ? article.image_url
              : `https://source.unsplash.com/random/?technology${getRandomQueryParameter()}`
          }" alt="">
        </div>
        <div class="card-body">
          <h2 class="blog-title">${article.title}</h2>
          <p class="description">${article.description}</p>
          <div class="card-profile">
            <img class="profile-img" src="${
              article.image_url
                ? article.image_url
                : `https://source.unsplash.com/random/?profile${getRandomQueryParameter()}`
            }" alt="">
            <div class="card-profile-info">
              <h3 class="profile-name">${article.source_id}</h3>
              <p class="date">${article.pubDate}</p>
            </div>
          </div>
        </div>
      </a>
    `;

    // Append the article div to the news container
    newsContainer.appendChild(articleDiv);
  });
}

function renderNewsFromLocal(data) {
  // Update HTML content for local data
  const newsContainer = document.getElementById("newsContainer");

  // Clear existing content in the news container
  newsContainer.innerHTML = "";

  // Assuming the HTML structure for local data is different
  // Modify the rendering logic accordingly
  data.forEach((item) => {
    const cardHTML = `
      <a href="${item.link}" target="_blank">
        <div class="card">
          <div class="card-banner">
            <p class="category-tag ${item.category.toLowerCase()}">${
      item.category
    }</p>
            <img class="banner-img" src="${item.bannerImageUrl}" alt="">
          </div>
          <div class="card-body">
            <p class="blog-hashtag">${item.hashtags.join(" ")}</p>
            <h2 class="blog-title">${item.title}</h2>
            <p class="blog-description">${item.description}</p>
  
            <div class="card-profile">
              <img class="profile-img" src="${item.profileImageUrl}" alt="">
              <div class="card-profile-info">
                <h3 class="profile-name">${item.profileName}</h3>
                <p class="date">${item.date}</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    `;
    newsContainer.insertAdjacentHTML("beforeend", cardHTML);
  });
}

// Function to generate a random query parameter
function getRandomQueryParameter() {
  // You can use a timestamp or any random string to ensure uniqueness
  return `&random=${Math.random().toString(36).substring(7)}`;
}
