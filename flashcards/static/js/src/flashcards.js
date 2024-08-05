/* Javascript for FlashcardsXBlock. */
function FlashcardsXBlock(runtime, element, params) {
  /* Initializing the variables for displaying the current question
     and total questions.
  */
  var currentNumber = -1;
  var totalNumber = params.flashcards.length;

  /* Show the answer of the question by cliking on the question */
  $('#fc-question').click(function () {
    $('#fc-question').html(`${params.flashcards[currentNumber]["back"]}`)
  });

  $('.next-btn').click(function () {
    currentNumber++;
    $('#fc-question').html(`${params.flashcards[currentNumber]["front"]}`);
    $('#current-fc').html(`${currentNumber + 1}`);
    $('.next-btn').html('Nextt');
    /* If the student reaches the end say FINISHED and disable going further */
    if (currentNumber == totalNumber - 1) {
      $('.next-btn').html('You did it!');
      $('.next-btn').addClass('finished-btn').removeClass('next-btn').off('click');
    }
  });
}

