const catApiURL = "https://api.thecatapi.com/v1/images/search"; 

const DOM = {
  resultsContainer: document.querySelector(".images"),
  searchBtn: document.querySelector(".button_container"),
  imageCount: document.querySelector("#image_count")
}

const resultsModel = {
  init: function (data) {
    this.breeds = data.breeds;
    this.id = data.id;
    this.url = data.url;
    this.width = data.width;
    this.height = data.height;
  }
};

function getImageCount() {
  return DOM.imageCount.value;
}

DOM.searchBtn.addEventListener("click", e => {
  clearImages();
  let count = getImageCount();
  for (let i = 0; i < count; i++) {
    fetchData(catApiURL)
      .then(res => {
        (res) ? processResponse(res) : processError();
      });
  }
});

function fetchData(url) {
  return fetch(url)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(res => {
      return res[0].url;
    })
    .catch(function (error) {
      console.log('There has been a problem with your fetch operation: ', error.message);
      processError();
    });

};

function processResponse(response) {
  const cat = Object.create(resultsModel);
  cat.init(response);
  generateImg(response);
};

function processError() {
  DOM.resultsContainer.innerHTML = `<h2>An error occured while fetching the data</h2>`
}

function clearImages() {
  DOM.resultsContainer.innerHTML = '';  
}

function generateImg(url) {
  DOM.resultsContainer.innerHTML += `<img src="${url}" alt="Random cat image">`
};