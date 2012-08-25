(function() {

  $(document).ready(function() {
    $('#github').mouseover(function() {
      return $('.alt-text').text("GitHub");
    });
    $('#github').mouseout(function() {
      return $('.alt-text').html("&nbsp;");
    });
    $('#facebook').mouseover(function() {
      return $('.alt-text').text("Facebook");
    });
    $('#facebook').mouseout(function() {
      return $('.alt-text').html("&nbsp;");
    });
    $('#linkedin').mouseover(function() {
      return $('.alt-text').text("LinkedIn");
    });
    return $('#linkedin').mouseout(function() {
      return $('.alt-text').html("&nbsp;");
    });
  });

}).call(this);
