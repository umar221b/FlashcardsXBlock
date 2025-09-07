/* Javascript for FlashcardsXBlock. */
function FlashcardsXBlock(runtime, element, params) {
  /* Initializing the variables for displaying the current question
     and total questions.
  */
  var currentNumber = -1;
  var totalNumber = params.flashcards.length;
  $('.fc-container').hide();

  /* Show the answer of the question by cliking on the question */
  $('.fc-card').click(function () {
    $('.fc-card').toggleClass('is-flipped');
  });

  function next() {
    currentNumber++;
    $('.fc-card').removeClass('is-flipped');
    $('.fc-container').show();
    $('#fc-question').html(`${params.flashcards[currentNumber]["front"]}`);
    $('#fc-answer').html(`${params.flashcards[currentNumber]["back"]}`)
    $('#current-fc').html(`${currentNumber + 1}`);
    $('.next-btn').html('Next');
    if (currentNumber > 0)
      $('.prev-btn').removeAttr('disabled');
    /* If the student reaches the end say FINISHED and disable going further */
    if (currentNumber == totalNumber - 1) {
      $('.next-btn').html('You did it!');
      $('.next-btn').attr('disabled','disabled');
    }
  }

  function prev() {
    currentNumber--;
    $('.fc-card').removeClass('is-flipped');
    $('.fc-container').show();
    $('#fc-question').html(`${params.flashcards[currentNumber]["front"]}`);
    $('#fc-answer').html(`${params.flashcards[currentNumber]["back"]}`)
    $('#current-fc').html(`${currentNumber + 1}`);
    if (currentNumber < totalNumber)
      $('.next-btn').removeAttr('disabled');
    /* If the student reaches the beginning disable going back any further */
    if (currentNumber == 0) {
      $('.prev-btn').attr('disabled','disabled');
    }
  }

  $('.next-btn').click(next);
  $('.prev-btn').click(prev);
}