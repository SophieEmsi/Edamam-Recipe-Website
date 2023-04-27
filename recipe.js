var button = document.getElementById("search-button");
var search = document.getElementById("search-input");

button.addEventListener("click", function(event) {
  event.preventDefault();
  var searchValue = search.value;
  window.location.href = "recipes.html?q=" + searchValue;
});

$(document).ready(function() {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var searchValue = urlParams.get('q');
  
  getRecipeData(searchValue).then(function(data) {
    displayRecipeData(data);
  });

  //Favourite button:

  // var icon = $("#icon")
  // var likeButton = $("#icon-btn");

  // likeButton.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   console.log(e.target.className)
  // })

  // var likeBtn = document.querySelectorAll("#icon-btn");
  // let getHearts = document.querySelectorAll('#icon') //get all elements

  // getHearts.forEach(function(span) {
  //   span.addEventListener('click', function(e) {
  //     if (e.target.style.color == 'red') {
  //       e.target.style.color = 'grey';
  //     } else {
  //       e.target.style.color = 'red';
  //     }
  //   });
  // })
  
  // var icon = document.getElementById("icon");

  // icon.addEventListener("click", function(event) {
  //   event.preventDefault();
    
  //   icon.style.color = 'red';

  // });

});



async function getRecipeData(searchValue) {
  var response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=dc308d27&app_key=4b945e27454211b058c8f59d82bef0cd&q=${searchValue}`);
  var data = await response.json();
  console.log(data);
  return data;
}

function displayRecipeData(data) {
  var recipeCards = $('#recipe-cards');
  var cardTemplate = $('#card-template');

  recipeCards.empty(); // Remove any existing cards

  var row = $('<div class="row"></div>');
  recipeCards.append(row);

  for (var i = 0; i < data.hits.length; i++) {
    var card = cardTemplate.clone().removeAttr('id').removeAttr('style');
    var recipe = data.hits[i].recipe;

    card.find('.recipe-title').html(recipe.label);
    card.find('.recipe-image').attr('src', recipe.image);
    card.find('.cuisine').html(recipe.cuisineType.join(" / "));

    card.find('#recipe-button').attr('data-url', recipe.url).on('click', function() {
      var url = $(this).data('url');
      window.open(url, '_blank');
    });

    row.append($('<div class="col"></div>').append(card));
    card.removeClass('d-none');

    if ((i + 1) % 5 === 0) {
      row = $('<div class="row"></div>');
      recipeCards.append(row);
    }
  }
}



