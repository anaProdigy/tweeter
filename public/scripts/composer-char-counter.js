$(document).ready(function() {
  //count remained characters
  $(".new-tweet-text").on("input", function() {
    const numOfChars = $(this).val().length
    const left = 140 - numOfChars;
    const $counter = $(this).parent().find(".counter");
    $counter.text(left);
    //change color of number to red when less than 0 remained
    if (left < 0) {
      $counter.css("color", "#ff0000");
    }else{
      $counter.css("color", "");
    }
  });
});