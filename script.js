
$(document).ready(function() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var searchValue = urlParams.get('value');


    getFooterRecipeData(searchValue).then(function(data) {
        displayFooterRecipeData(data);
    });
    
})


async function getFooterRecipeData(searchValue) {
    var response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=dc308d27&app_key=4b945e27454211b058c8f59d82bef0cd&q=${searchValue}`);
    var data = await response.json();
    console.log(data);
    return data;
  }

  function displayFooterRecipeData(data) {
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

  // nutritional analysis

  var button1 = document.getElementById("search-button");
  var search1 = document.getElementById("search-input");

button1.addEventListener("click", function(event) {
  event.preventDefault();
  var searchValue = search1.value;
  window.location.href = "recipes.html?q=" + searchValue;
});


var button2 = document.getElementById("analyse-btn");
var search = document.getElementById("exampleFormControlTextarea1");


button2.addEventListener("click",function(event){
    
    event.preventDefault();
    // window.location.href = "recipes.html";
   
    var searchValue = search.value;

    getNutritionalData(searchValue)  

});

function getNutritionalData(input){

  $("#tbodyid").remove();
  $("#theadid").remove();
    var inputArr=input.split(',')
    var table = $('<table>').addClass('center');
    var thead = $('<thead>').attr('id','theadid');
    var tbody = $('<tbody>').attr('id','tbodyid');
    var header = $('<tr>');
    var cell1 = $('<th>').text('Quantity');
    var cell2 = $('<th>').text('Unit');
    var cell3 = $('<th>').text('Food');
    var cell4 = $('<th>').text('Calories(Kcal)');
    var cell5 = $('<th>').text('Weight(g)');
    header.append(cell1).append(cell2).append(cell3).append(cell4).append(cell5);
    thead.append(header);
    table.append(thead);
    for (var j = 0; j < inputArr.length; j++) { 
     
      var q=encodeURI(inputArr[j]);
      //var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=2b0b36a4&app_key=84650e5de19523e1f4e7cbdcdd44b20b&nutrition-type=cooking&ingr="+q;
      getNutritionData(q).then(function (data) {      
      var row = $('<tr>');
      var cell1 = $('<td>').text(data.ingredients[0].parsed[0].quantity);
      var cell2 = $('<td>').text(data.ingredients[0].parsed[0].measure);
      var cell3 = $('<td>').text(data.ingredients[0].parsed[0].food);
      var cell4 = $('<td>').text(data.calories);
      var cell5 = $('<td>').text(data.ingredients[0].parsed[0].weight); 
      row.append(cell1).append(cell2).append(cell3).append(cell4).append(cell5);
      tbody.append(row);  
      });
    }
      table.append(tbody);
      $("#textarea").append(table);
};
async function getNutritionData(searchValue) {
  var response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=7a90e295&app_key=7821a60eb5eaebb2281fcee5e98ce537&nutrition-type=cooking&ingr=${searchValue}`);
  var data = await response.json();
  console.log(data);
  return data;
}

//News-Section:
getNewsData().then(function(data){
  displayNewsData(data);
})

async function getNewsData() {
  var response = await fetch("https://gnews.io/api/v4/search?q=nutrition&&lang=en&country=uk&apikey=0152e1a6f3f9d2a40b296c203f236659");
  const data = await response.json();
  console.log(data);
  return data;
  
}


function displayNewsData(data){
  document.getElementsByClassName('news-container')

  var newsImg = $("#news-img");
  var newstitle = $('.news-title');
  var description = $(".description");
  var newsBtn = $(".news-button")
  // var newsData = data.articles[2];
  
  var newsData = data.articles[Math.floor(Math.random()*data.articles.length)];

  newstitle.html(newsData.title);
  newsImg.attr('src', newsData.image);
  description.html(newsData.description);

  newsBtn.attr('data-url', newsData.url).on('click', function() {
    var url = $(this).data('url');
    window.open(url, '_blank');   
  });


}



//Image Carousel:

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const carousel = document.querySelector(".carousel-container");
const track = document.querySelector(".track");
let width = carousel.offsetWidth;
let index = 0;


next.addEventListener("click", function (e) {
  e.preventDefault();
  index = index + 1;
  next.style.right = "-34px";
  carousel.style.width = "800px"
  prev.classList.add("show");
  track.style.transform = "translateX(-70%)";
  if (track.offsetWidth - index * width < index * width) {
    next.classList.add("show");

  }

  
});
prev.addEventListener("click", function () {
  index = index - 1;
  next.style.right = "-34px";
  carousel.style.width = "70%"
  next.classList.remove("show");
  if (index === 0) {
    prev.classList.remove("show");
  }
  track.style.transform = "translateX(0px)";


});

getPopularRecipes().then(function(data){
    displayPopularRecipes(data);
})

  
  async function getPopularRecipes() {
    var response = await fetch("https://api.edamam.com/api/recipes/v2?type=public&app_id=dc308d27&app_key=4b945e27454211b058c8f59d82bef0cd&mealType=Dinner");
    const data = await response.json();
    console.log(data);
    return data;
}
  
function displayPopularRecipes(data){
    document.getElementsByClassName('card-container')

    var img1 = $(".recipe-image1");
    var cuisine1 = $('.cuisine1');
    var title1 = $('.recipe-title1');
    var link1 = $(".recipe-link1");
    var recipe1 = data.hits[15].recipe;
    // console.log(recipe1)
    title1.html(recipe1.label);
    img1.attr('src', recipe1.image);
    cuisine1.html(recipe1.cuisineType.join(" / "));

    link1.attr('data-url', recipe1.url).on('click', function() {
      var url = $(this).data('url');
      window.open(url, '_blank');
    });

    var img2 = $(".recipe-image2");
    var cuisine2 = $('.cuisine2');
    var title2 = $('.recipe-title2');
    var link2 = $(".recipe-link2");
    var recipe2 = data.hits[1].recipe;
    console.log(recipe2)
    title2.html(recipe2.label);
    img2.attr('src', recipe2.image);
    cuisine2.html(recipe2.cuisineType.join(" / "));

    link2.attr('data-url', recipe2.url).on('click', function() {
      var url = $(this).data('url');
      window.open(url, '_blank');
    });

    var img3 = $(".recipe-image3");
    var cuisine3 = $('.cuisine3');
    var title3 = $('.recipe-title3');
    var link3 = $(".recipe-link3");
    var recipe3 = data.hits[2].recipe;
    console.log(recipe3)
    title3.html(recipe3.label);
    img3.attr('src', recipe3.image);
    cuisine3.html(recipe3.cuisineType.join(" / "));

    link3.attr('data-url', recipe3.url).on('click', function() {
    var url = $(this).data('url');
    window.open(url, '_blank');
   });


    var img4 = $(".recipe-image4");
    var cuisine4 = $('.cuisine4');
    var title4 = $('.recipe-title4');
    var link4 = $(".recipe-link4");
    var recipe4 = data.hits[3].recipe;
    console.log(recipe4)
    title4.html(recipe4.label);
    img4.attr('src', recipe4.image);
    cuisine4.html(recipe4.cuisineType.join(" / "));

    link4.attr('data-url', recipe4.url).on('click', function() {
      var url = $(this).data('url');
      window.open(url, '_blank');
    });

    var img5 = $(".recipe-image5");
    var cuisine5 = $('.cuisine5');
    var title5 = $('.recipe-title5');
    var link5 = $(".recipe-link5");
    var recipe5 = data.hits[4].recipe;
    console.log(recipe5)
    title5.html(recipe2.label);
    img5.attr('src', recipe5.image);
    cuisine5.html(recipe5.cuisineType.join(" / "));

    link5.attr('data-url', recipe5.url).on('click', function() {
      var url = $(this).data('url');
      window.open(url, '_blank');
    });

    var img6 = $(".recipe-image6");
    var cuisine6 = $('.cuisine6');
    var title6 = $('.recipe-title6');
    var link6 = $(".recipe-link6");
    var recipe6 = data.hits[5].recipe;
    console.log(recipe6)
    title6.html(recipe6.label);
    img6.attr('src', recipe6.image);
    cuisine6.html(recipe6.cuisineType.join(" / "));

    link6.attr('data-url', recipe6.url).on('click', function() {
      var url = $(this).data('url');
      window.open(url, '_blank');
    });


    var img7 = $(".recipe-image7");
    var cuisine7 = $('.cuisine7');
    var title7 = $('.recipe-title7');
    var link7 = $(".recipe-link7");
    var recipe7 = data.hits[6].recipe;
    console.log(recipe7)
    title7.html(recipe7.label);
    img7.attr('src', recipe7.image);
    cuisine7.html(recipe7.cuisineType.join(" / "));

    link7.attr('data-url', recipe7.url).on('click', function() {
      var url = $(this).data('url');
      window.open(url, '_blank');
    });

    var img8 = $(".recipe-image8");
    var cuisine8 = $('.cuisine8');
    var title8 = $('.recipe-title8');
    var link8 = $(".recipe-link8");
    var recipe8 = data.hits[7].recipe;
    console.log(recipe8)
    title8.html(recipe8.label);
    img8.attr('src', recipe8.image);
    cuisine8.html(recipe8.cuisineType.join(" / "));

    link8.attr('data-url', recipe8.url).on('click', function() {
      var url = $(this).data('url');
      window.open(url, '_blank');
    });

    var img9 = $(".recipe-image9");
    var cuisine9 = $('.cuisine9');
    var title9 = $('.recipe-title9');
    var link9 = $(".recipe-link9");
    var recipe9 = data.hits[12].recipe;
    console.log(recipe9)
    title9.html(recipe9.label);
    img9.attr('src', recipe9.image);
    cuisine9.html(recipe9.cuisineType.join(" / "));

    link9.attr('data-url', recipe9.url).on('click', function() {
      var url = $(this).data('url');
      window.open(url, '_blank');
    });

    var img10 = $(".recipe-image10");
    var cuisine10 = $('.cuisine10');
    var title10 = $('.recipe-title10');
    var link10 = $(".recipe-link10");
    var recipe10 = data.hits[9].recipe;
    console.log(recipe10)
    title10.html(recipe10.label);
    img10.attr('src', recipe10.image);
    cuisine10.html(recipe10.cuisineType.join(" / "));

    link10.attr('data-url', recipe10.url).on('click', function() {
      var url = $(this).data('url');
      window.open(url, '_blank');
    });

}

//Subscribe
document.querySelector('.submit-email').addEventListener('mousedown', (e) => {
  e.preventDefault();
  document.querySelector('.subscription').classList.add('done');
});


  
