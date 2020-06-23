// Create IIFF for app
var cocktailRepository = (function () {
  // Cocktail repo
  var repository = [];

  /* External API */

  /*
    PAYLOAD ITEMS
    .strDrink = name
    .strInsctructions = Instructions
    .strDrinkThumb = img url
    */

  // Adding them to the internal repo
  function add(cocktail) {
    repository.push(cocktail);
  }

  // Async functions

  let alphabetArray = [
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=c',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=d',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=e',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=f',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=g',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=h',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=i',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=j',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=k',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=l',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=m',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=n',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=o',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=p',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=q',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=r',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=s',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=t',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=u',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=v',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=w',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=x',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=z',
  ];

  // function to loop through payload
  const callEndpoint = (url) => {
    console.log(url);
    // Add reject catch to this
    return new Promise(async (resolve, reject) => {
      let queryEndpoint = await fetch(url);
      let queryEndpointJson = await queryEndpoint.json();
      console.log(queryEndpointJson.drinks);
      // catch for empty payloads
      if (queryEndpointJson.drinks === null) {
        // add skip/continue here
        resolve(`Nothing in payl`);
      } else {
        for (i of queryEndpointJson.drinks) {
          var newObj = {};
          newObj.name = i.strDrink;
          newObj.instructions = i.strInstructions;
          if (i.strIngredient1 && i.strMeasure1) {
            newObj.ingred = 'test ' + i.strMeasure1 + ' ' + strIngredient1;
          }
          newObj.img = i.strDrinkThumb;
          // newArray.push(newObj);
          add(newObj);
          resolve(`Payload added to db`);
        }
      }
    }).catch(function (error) {
      console.error(error);
    });
  };

  const asyncFunc = async () => {
    const status = await Promise.all(
      alphabetArray.map(async (url) => callEndpoint(url))
    );
  };

  /*
    Client side functions
    */

  // function that displays cocktails as buttons on the page
  function addListItem(cocktail) {
    var $listItem = $('<li></li>');
    var $button = $(
      '<button class="customButton">' + cocktail.name + '</button>'
    );
    // Adding var to the new Button element
    // $button.text("yay");
    // console.log("name is " + $button.text());
    // Creating a css class for clicking on the button
    // $button.addClass(".customButton");
    // Add button to li item
    $listItem.append($button);
    // Add list element to the DOM via the ul parent
    $newList.append($listItem);
    // Add event listener to button element
    $button.on('click', () => {
      //   showLoadingMessage();
      showDetails(cocktail);
    });
  }

  // function to show details of cocktail in modal
  function showDetails(cocktail) {
    showModal(
      cocktail.name,
      cocktail.instructions,
      cocktail.ingred,
      cocktail.img
    );
    // hideLoadingMessage();
  }

  // loading icon function

  //   function showLoadingMessage() {
  //     // target loading class
  //     var $loading = $(".loading-message-class");
  //     // Add CSS style to show loading message
  //     $loading.addClass("shown");
  //   }

  //   function hideLoadingMessage() {
  //     // target loading class
  //     var $loading = $(".loading-message-class");
  //     // wait 2 seconds for visual's sake
  //     setTimeout(function() {
  //       // Add CSS style to hide loading message
  //       $loading.removeClass("shown");
  //     }, 500);
  //   }

  // Modal //
  // Show modal
  // grab modal container
  var $modalContainer = $('#modal-container');

  function showModal(title, text, ingred, url) {
    //Clear all existing modal content
    $modalContainer.empty();
    // create new modal
    var modal = $('<div class="modal"></div>');

    // Add new modal content
    // button
    var closeButtonElement = $(
      '<button class="modal-close">' + 'close' + '</button>'
    );
    // close modal
    closeButtonElement.on('click', hideModal);

    // title
    var titleElement = $('<h1>' + title + '</h1>');
    // wrap body content in a div
    var bodyWrapper = $('<div class="body-element"></div>');
    // paragraph element
    var contentElement = $('<p class="modal-p">' + text + '</p>');
    // instruc element
    var instruc = $('<p>' + ingred + '</p>');

    // img
    var imgWrapper = $('<div></div>');
    var imgElement = $('<img>');
    imgElement.attr('src', url);

    // attach to DOM
    bodyWrapper.append(closeButtonElement);
    bodyWrapper.append(titleElement);
    modal.append(instruc);
    bodyWrapper.append(contentElement);
    imgWrapper.append(imgElement);
    modal.append(bodyWrapper);
    modal.append(imgWrapper);
    $modalContainer.append(modal);

    // add class to show element
    $modalContainer.addClass('is-visible');
  }

  // hide modal
  function hideModal() {
    // grab modal (parent element)
    $modalContainer.removeClass('is-visible');
  }
  // closing modal with esc button
  $(window).on('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.hasClass('is-visible')) {
      hideModal();
    }
  });

  $modalContainer.on('click', (e) => {
    // listens to clicks on container
    var $target = e.target;
    if ($target === $modalContainer) {
      hideModal();
    }
  });

  /* 
    Server side function
    */

  // Adding cocktail to the repository

  // search for a Cocktail
  function search(nameSearch) {
    var result = repository.filter((word) => word.name === nameSearch);
    if (result.length > 0) {
      console.log('Here is your Cocktail:' + '<br>');
      // return the complete object of the relative Cocktail
      Object.keys(result[0]).forEach(function (property) {
        console.log('<br>' + property + ': ' + result[0][property]);
      });
      return "There's a match!";
    } else {
      return 'There is no Cocktail with that name in the repo';
    }
  }

  // return complete repository

  function getAll() {
    return repository;
  }

  // return complete repository

  function getTestArray() {
    return newArray;
  }
  // return public methods in IIFE object

  return {
    getAll: getAll,
    getTestArray: getTestArray,
    add: add,
    search: search,
    addListItem: addListItem,
    showDetails: showDetails,
    asyncFunc: asyncFunc,
    // showLoadingMessage: showLoadingMessage,
    // hideLoadingMessage: hideLoadingMessage
  };
})();

var $newList = $('ul');

cocktailRepository.asyncFunc().then(function () {
  cocktailRepository.getAll().forEach(function (cocktail) {
    cocktailRepository.addListItem(cocktail);
  });
});
