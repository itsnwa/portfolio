$(document).ready(function() {

  // Reveal project categories on hover
  $('.project').hover(function() {
    $('p.category', $(this)).slideToggle(100, 'linear').display(100, 'linear');
  });

  // Unwrap images from p tags
  $('.project-content p > img').unwrap().removeAttr('height').removeAttr('width');
  $('.project-content p > a > img').removeAttr('height').removeAttr('width').parent().unwrap();

  var feed = new Instafeed({
    get: 'user',
    userId: '781603',
    accessToken: '781603.1677ed0.b925883d446a42378ec690d6dc250db0',
    template: '<a href="{{link}}"><img src="{{image}}" /></a>',
    limit: 12
  });
  feed.run();

});
