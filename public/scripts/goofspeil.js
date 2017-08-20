//on click, the card disappears
$('form[name="register"]').on("submit", function (e) {
        // Find all <form>s with the name "register", and bind a "submit" event handler

        // Find the <input /> element with the name "username"
        var username = $(this).find('input[name="username"]');
        if ($.trim(username.val()) === "") {
            // If its value is empty
            e.preventDefault();    // Stop the form from submitting
            $("#formAlert").slideDown(400);    // Show the Alert
        } else {
            e.preventDefault();    // Not needed, just for demonstration
            $("#formAlert").slideUp(400, function () {    // Hide the Alert (if visible)
                alert("Would be submitting form");    // Not needed, just for demonstration
                username.val("");    // Not needed, just for demonstration
            });
        }
    });

    $(".alert").find(".close").on("click", function (e) {
        // Find all elements with the "alert" class, get all descendant elements with the class "close", and bind a "click" event handler
        e.stopPropagation();    // Don't allow the click to bubble up the DOM
        e.preventDefault();    // Don't let any default functionality occur (in case it's a link)
        $(this).closest(".alert").slideUp(400);    // Hide this specific Alert
    });
});


$(document).ready(function() {
  var app = {
    cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    init: function() {
      app.shuffle();
    },
    shuffle: function() {
      var random = 0;
      var temp = 0;
      for (i = 1; i < app.cards.length; i++) {
        random = Math.round(Math.random() * i);
        temp = app.cards[i];
        app.cards[i] = app.cards[random];
        app.cards[random] = temp;
      }
      app.assignCards();
      console.log('Shuffled Card Array: ' + app.cards);
    },
    assignCards: function() {
      $('.card-prize-table').each(function(index) {
        $(this).attr('.card-prize-table', app.cards[index]);
      });
      app.clickHandlers();
    },
    clickHandlers: function() {
      $('.player-card-deck').on('click', function() {
        $(this).html('<p>' + $(this).data('cardValue') + '</p>').addClass('selected');
        app.checkMatch();
      });
    },
    checkMatch: function() {
      if ($('.selected').length === 2) {
        if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
          $('.selected').each(function() {
            $(this).animate({
              opacity: 0
            }).removeClass('unmatched');
          });
          $('.selected').each(function() {
            $(this).removeClass('selected');
          });
          app.checkWin();
        } else {
          setTimeout(function() {
            $('.selected').each(function() {
              $(this).html('').removeClass('selected');
            });
          }, 1000);
        }
      }
    },
    checkWin: function() {
      if ($('.unmatched').length === 0) {
        $('.container').html('<h1>You Won!</h1>');
      }
    }
  };
  app.init();
});
