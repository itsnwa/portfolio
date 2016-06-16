$(document).ready(function() {

  // Reveal project categories on hover
  $('.project').hover(function() {
    $('p.category', $(this)).slideToggle(100, 'linear').display(100, 'linear');
  });

});
