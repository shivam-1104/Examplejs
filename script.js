const accessKey = 'YOUR_API_KEY';

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Handle missing or empty results
        const results = data.results;
        if (!results || results.length === 0) {
            searchResults.innerHTML = `<p>No results found for "${inputData}".</p>`;
            showMore.style.display = "none";
            return;
        }

        if (page === 1) {
            searchResults.innerHTML = ""; // Reset the results for new searches
        }

        results.map((result) => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Image"; // Fallback for alt description
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description || "View Image";

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++;
        if (page > 1) {
            showMore.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
        searchResults.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
        showMore.style.display = "none";
    }
}

// Event listener for form submission
formEl.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload
    page = 1; // Reset page for new searches
    searchImages();
});

// Event listener for the "Show More" button
showMore.addEventListener("click", () => {
    searchImages();
});


















// const accessKey = 'YOUR_API_KEY';

// const formEl = document.querySelector("form");
// const inputEl = document.getElementById("search-input");
// const searchResults = document.querySelector(".search-results");
// const showMore = document.getElementById("show-more-button");

// let inputData = "";
// let page = 1;

// async function searchImages() {
//     inputData = inputEl.value;
//     const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     const results = data.results;

//     if (page === 1) {
//         searchImages.innerHTML = "";
//     }

//     results.map((result) =>{
//         const imageWrapper = document.createElement("div");
//         imageWrapper.classList.add("search-result");
//         const image = document.createElement('img');
//         image.src = result.urls.small;
//         image.alt = result.alt_description;
//         const imageLink = document.createElement("a");
//         imageLink.href = result.links.html;
//         imageLink.target = "_blank";
//         imageLink.textContent = result.alt_description;

//         imageWrapper.appendChild(image);
//         imageWrapper.appendChild(imageLink);
//         searchResults.appendChild(imageWrapper);

//     } );

//     page++;
//         if (page > 1) {
//             showMore.style.display = "block";
//         }


// }

// formEl.addEventListener("submit",(event) =>{
//     event.preventDefault();
//     page = 1;
//     searchImages();
// } );

// formEl.addEventListener("click",() =>{
//     searchImages();
// } );