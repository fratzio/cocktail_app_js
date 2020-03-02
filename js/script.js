// Create IIFF for app
var cocktailRepository = (function() {
  // Cocktail repo
  var repository = [];

  /* External API */
  // can't get dumb of db so testing with a cocktails first
  var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=";

  /*
    PAYLOAD ITEMS
    .strDrink = name
    .strInsctructions = Instructions
    .strDrinkThumb = img url
    */

  //
  function loop() {
    var urls = ["a", "b", "c", "d"];
    for (var i = 0; i < urls.length; i++) {
      fetch(apiUrl + urls[i])
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          var payload = json.drinks;
          payload.forEach(function(item) {
            var cocktail = {
              name: item.strDrink,
              instructions: item.strInstructions,
              img: item.strDrinkThumb
            };
            // pushes cocktail to repository
            add(cocktail);
          });
        })
        .catch(function(e) {
          console.error(e);
        });
    }
  }

  function loopThroughPayloads() {
    var urls = ["a", "b", "c", "d"];
    for (var i = 0; i < urls.length; i++) {
      loadList(urls[i]);
    }
    console.log(repository);
  }

  // fetching the cocktail payload
  function loadList(letter) {
    newUrl = apiUrl.concat(letter);
    console.log(newUrl);
    return fetch(newUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        var payload = json.drinks;
        payload.forEach(function(item) {
          var cocktail = {
            name: item.strDrink,
            instructions: item.strInstructions,
            img: item.strDrinkThumb
          };
          // pushes cocktail to repository
          add(cocktail);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // fetching the cocktail payload
  function loadListNew() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        var payload = json.drinks;
        payload.forEach(function(item) {
          var cocktail = {
            name: item.strDrink,
            instructions: item.strInstructions,
            img: item.strDrinkThumb
          };
          // pushes cocktail to repository
          add(cocktail);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadListAjax() {
    $.ajax("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b", {
      dataType: "json"
    })
      .then(function(responseJSON) {
        var payl = responseJSON.drinks;
        payl.forEach(function(item) {
          var cocktail = {
            name: item.strDrink,
            instructions: item.strInstructions,
            img: item.strDrinkThumb
          };
          // pushes cocktail to repository
          add(cocktail);
        });
        console.log(repository);
      })
      .catch(function(err) {
        console.log("Caught an error:" + err.statusText);
      });
  }

  function loadListAjax2() {
    return $.ajax(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b",
      {
        dataType: "json",
        method: "GET"
      }
    )
      .then(function(responseJSON) {
        payl = responseJSON.drinks;
        payl.forEach(function(item) {
          var cocktail = {
            name: item.strDrink,
            instructions: item.strInstructions,
            img: item.strDrinkThumb
          };
          // pushes cocktail to repository
          add(cocktail);
        });
      })
      .catch(function(err) {
        console.log("Caught an error:" + err.statusText);
      });
  }

  // Adding them to the internal repo
  function add(cocktail) {
    repository.push(cocktail);
  }

  /*
    Client side functions
    */

  // function that displays cocktails as buttons on the page
  function addListItem(cocktail) {
    var $listItem = $("<li></li>");
    var $button = $(
      '<button class="customButton">' + cocktail.name + "</button>"
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
    $button.on("click", () => {
      //   showLoadingMessage();
      showDetails(cocktail);
    });
  }

  // function to show details of cocktail in modal
  function showDetails(cocktail) {
    showModal(cocktail.name, cocktail.instructions, cocktail.img);
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
  var $modalContainer = $("#modal-container");

  function showModal(title, url, text) {
    //Clear all existing modal content
    $modalContainer.empty();
    // create new modal
    var modal = $('<div class="modal"></div>');

    // Add new modal content
    // button
    var closeButtonElement = $(
      '<button class="modal-close">' + "close" + "</button>"
    );
    // close modal
    closeButtonElement.on("click", hideModal);

    // title
    var titleElement = $("<h1>" + title + "</h1>");
    // wrap body content in a div
    var bodyWrapper = $('<div class="body-element"></div>');
    // paragraph element
    var contentElement = $('<p class="modal-p">' + text + "</p>");

    // img
    var imgWrapper = $("<div></div>");
    var imgElement = $("<img>");
    imgElement.attr("src", url);

    // attach to DOM
    bodyWrapper.append(closeButtonElement);
    bodyWrapper.append(titleElement);
    bodyWrapper.append(contentElement);
    imgWrapper.append(imgElement);
    modal.append(bodyWrapper);
    modal.append(imgWrapper);
    $modalContainer.append(modal);

    // add class to show element
    $modalContainer.addClass("is-visible");
  }

  // hide modal
  function hideModal() {
    // grab modal (parent element)
    $modalContainer.removeClass("is-visible");
  }
  // closing modal with esc button
  $(window).on("keydown", e => {
    if (e.key === "Escape" && $modalContainer.hasClass("is-visible")) {
      hideModal();
    }
  });

  $modalContainer.on("click", e => {
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
    var result = repository.filter(word => word.name === nameSearch);
    if (result.length > 0) {
      console.log("Here is your Cocktail:" + "<br>");
      // return the complete object of the relative Cocktail
      Object.keys(result[0]).forEach(function(property) {
        console.log("<br>" + property + ": " + result[0][property]);
      });
      return "There's a match!";
    } else {
      return "There is no Cocktail with that name in the repo";
    }
  }

  // return complete repository

  function getALL() {
    return repository;
  }

  // return public methods in IIFE object

  return {
    getALL: getALL,
    loadList: loadList,
    loopThroughPayloads: loopThroughPayloads,
    add: add,
    loop: loop,
    search: search,
    addListItem: addListItem,
    showDetails: showDetails,
    loadListAjax2: loadListAjax2
    // showLoadingMessage: showLoadingMessage,
    // hideLoadingMessage: hideLoadingMessage
  };
})();

var $newList = $("ul");

// Creating list of cocktails and then load them to page
cocktailRepository.loadListAjax2().then(function() {
  cocktailRepository.getALL().forEach(function(cocktail) {
    console.log("hello");
    console.log(cocktail);
    cocktailRepository.addListItem(cocktail);
  });
});
