$(document).ready(function() {

  // Reveal project categories on hover
  $('.project').hover(function() {
    $('p.category', $(this)).slideToggle(100, 'linear').display(100, 'linear');
  });

  // Unwrap images from p tags
  $('.project-content p > img').unwrap().removeAttr('height').removeAttr('width');
  $('.project-content p > a > img').removeAttr('height').removeAttr('width').parent().unwrap();

});
