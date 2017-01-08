var currentPage = document.getElementById('landingPageText');

$(document).ready(function() {
    $('.ui.menu .ui.dropdown').dropdown({
      on: 'hover'
    });
    $('.ui.menu a.item').on('click', function() {
        $(this)
          .addClass('active')
          .siblings()
          .removeClass('active');
    });
    $('#backStoryIcon').on('click', function() {
        $('#backStoryText')
          .removeClass('hidden');
        $('#landingPageText')
          .addClass('hidden');
    })
    $('#TI-83-RPG').on('click', function() {
        $('#backStoryText')
          .addClass('hidden');
        $('#landingPageText')
          .removeClass('hidden');
    })
  })
;
