// NAVBAR ANIMATION
const nav = document.querySelector(".nav");
window.addEventListener("scroll", fixNav);

function fixNav() {
  if (window.scrollY > nav.offsetHeight + 150) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
}

// CARD
const header = document.getElementById("header");
const title = document.getElementById("title");
const excerpt = document.getElementById("excerpt");
const profile_img = document.getElementById("profile_img");
const name = document.getElementById("name");
const date = document.getElementById("date");

const animated_bgs = document.querySelectorAll(".animated-bg");
const animated_bg_texts = document.querySelectorAll(".animated-bg-text");

const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal-container");

setTimeout(getData, 2500);

function getData() {
  // header.innerHTML =
  //   '<img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80" alt="" />';
  // title.innerHTML = "Lorem ipsum dolor sit amet";
  //   excerpt.innerHTML =
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perferendis";

  animated_bgs.forEach((bg) => bg.classList.remove("animated-bg"));
  //animated_bg_texts.forEach((bg) => bg.classList.remove("animated-bg-text"));
}

// SMOOTH SCROLL
document.querySelectorAll('.nav a[href^="#"]').forEach((trigger) => {
  trigger.onclick = function (e) {
    e.preventDefault();
    let hash = this.getAttribute("href");
    let target = document.querySelector(hash);
    let headerOffset = 100;
    let elementPosition = target.offsetTop;
    let offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };
});

// VIDEO
function sizeTheVideo() {
  // - 1.78 is the aspect ratio of the video
  // - This will work if your video is 1920 x 1080
  // - To find this value divide the video's native width by the height eg 1920/1080 = 1.78
  var aspectRatio = 1.78;

  var video = $("#video iframe");
  var videoHeight = video.outerHeight();
  var newWidth = videoHeight * aspectRatio;
  var halfNewWidth = newWidth / 2;

  //Define the new width and centrally align the iframe
  video.css({
    width: newWidth + "px",
    left: "50%",
    "margin-left": "-" + halfNewWidth + "px",
  });
}

// --------------------------------------------MAIN FUNCITONALITY
const searchRecipeForm = document.querySelector(".search-form"),
  recipeInput = document.querySelector(".search-input"),
  recipeResults = document.querySelector(".recipe-results"),
  resultHeading = document.querySelector(".resultHeading");

let viewMoreBtn = document.querySelector(".view-more");

function searchRecipe(e) {
  e.preventDefault();

  // clear single meal
  recipeResults.innerHTML = "";

  // get search term
  let meal = recipeInput.value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      resultHeading.innerHTML = `<p class= my-2>Search results for <strong>${meal}</strong>:</p>`;

      if (!data.meals) {
        resultHeading.innerHTML = "<p class= my-2>No results found.</p>";
      } else {
        console.log("im in");
        recipeResults.innerHTML = data.meals
          .map(
            (meal) => `
        <div class="recipe-card">
        <div class="card-header animated-bg" id="header">
          <img
            src="${meal.strMealThumb}"
            alt="${meal.strMeal}"
          />
        </div>

        <div class="card-content">
          <h3 class="card-title  animated-bg-text" data-mealID="${
            meal.idMeal
          }" id="title">
            ${meal.strMeal}
          </h3>
          <div class="recipe-labels">
            <div class="recipe-label recipe-area">${meal.strCategory}</div>
            <div class="recipe-label recipe-category">${meal.strArea}</div>
          </div>
          <p class="card-excerpt" id="excerpt">
            <strong>Ingredients:</strong> ${(function getIngredientsList() {
              // Function for listing ingredients in recipe card
              const ingredients = [];
              for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`]) {
                  ingredients.push(meal[`strIngredient${i}`]);
                } else {
                  break;
                }
              }
              return ingredients.toString().trim();
            })()}
          </p>
          <a class="view-more" data-mealID="${
            meal.idMeal
          }" href="#ex1" onclick=getMealById(this)>View More</a>
        </div>
      </div>
        `
          )
          .join("");
      }
    });
  // clears input, should erase after page being load
  recipeInput.value = "";
}

// function moreDetails(e) {
// const measurements = [];

// const mealID = e.getAttribute("data-mealID");

// fetch(
//   `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${parseInt(mealID)}`
// )
//   .then((res) => res.json())
//   .then((data) => {
//     let mealRes = data.meals[0];
//     for (let i = 1; i <= 20; i++) {
//       if (mealRes[`strIngredient${i}`]) {
//         measurements.push(
//           `${mealRes[`strIngredient${i}`]} - ${mealRes[`strMeasure${i}`]}`
//         );
//       } else {
//         break;
//       }
//     }

//   modal.innerHTML = `<h3 class="recipe-heading">${mealRes.strMeal}</h3>
//   <div class="videoContainer" id="video">
//     <div class="container-vid">
//       <iframe
//         class="responsive-iframe"
//        src="${(function myFunction() {
//          var str = mealRes.strYoutube;
//          var res = str.split("=").slice(1);
//          var newLink = `https://www.youtube.com/embed/${res}`;
//          return newLink;
//        })()}"
//       ></iframe>
//     </div>
//     <p class="card-excerpt">
//       <strong class="color-dark">Ingredients:</strong> ${measurements
//         .map((m) => `<span>${m}</span>`)
//         .join("")}
//     </p>
//     <p class="card-excerpt">
//       <strong class="color-dark">Instructions:</strong> ${
//         mealRes.strInstructions
//       }
//     </p>
//     </p>
//   </div>`;
// }

// viewMoreBtn.addEventListener("click", function (e) {
//   e.preventDefault();
// });

// --------------------------FOR MODAL
function getMealById(e) {
  const mealID = e.getAttribute("data-mealID");

  fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${parseInt(mealID)}`
  )
    .then((res) => res.json())
    .then((data) => {
      let mealRes = data.meals[0];

      addMealToModal(mealRes);
    });
}

function addMealToModal(meal) {
  const measurements = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      measurements.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  modal.innerHTML = `<h3 class="recipe-heading">${meal.strMeal}</h3>
<div class="videoContainer" id="video">
  <div class="container-vid">
    <iframe
      class="responsive-iframe"
     src="${(function myFunction() {
       var str = meal.strYoutube;
       var res = str.split("=").slice(1);
       var newLink = `https://www.youtube.com/embed/${res}`;
       return newLink;
     })()}"
    ></iframe>
  </div>
  <p class="card-excerpt">
    <strong class="color-dark">Ingredients:</strong> ${measurements
      .map((m) => `<span>${m}</span>`)
      .join("")}
  </p>
  <p class="card-excerpt">
    <strong class="color-dark">Instructions:</strong> ${meal.strInstructions}
  </p>
  </p>
</div>`;
  console.log(meal.idMeal);
  document.querySelectorAll(".view-more");
  console.log(document.querySelector(`a[data-mealID="${meal.idMeal}"]`));
  document
    .querySelector(`a[data-mealID="${meal.idMeal}"]`)
    .setAttribute("rel", "modal:open");
  // --------------THIS TRIGGERS
  document.getElementById("open").click();
}

searchRecipeForm.addEventListener("submit", searchRecipe);

// ------------------------------FUNCTION ALERT
function functionAlert(msg, type) {
  console.log("alert clicked");
  var confirmBox = $("#confirm");
  var confirmBoxDOM = document.querySelector("#confirm");
  confirmBox.find(".message").text(msg);
  confirmBoxDOM.classList.add(type);
  console.log(confirmBox);

  confirmBox.show();

  setTimeout(() => {
    confirmBox.hide();
  }, 3000);
}
