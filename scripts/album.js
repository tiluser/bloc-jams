// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing songs
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentArtistFromAlbum = null;

var $oneButton = $('.main-controls .play-pause');
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

var setSong = function(songNumber) {
    currentlyPlayingSongNumber = songNumber;
    currentSongFromAlbum = currentAlbum.songs[songNumber];
};

// Updates the text of the h2 tags
var updatePlayerBarSong = function () {
    $('.song-name').html(currentSongFromAlbum.title);
    $('.artist-song-mobile').html(currentSongFromAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var createSongRow = function(songNumber, songName, songLength) {
    var template =
      '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;
    var $row = $(template);
    var songItemNumber;
    var songItemNumbers = [];
    var onHover = function (event) {
        // Placeholder for function logic
       if ($(event.target.parentElement).find('.song-item-number').text() !== ""
              && $(event.target.parentElement).find('.song-item-number').html() !== pauseButtonTemplate) {
           songItemNumber = parseInt($(event.target.parentElement).find('.song-item-number').text());
           $(event.target.parentElement).find('.song-item-number').html(playButtonTemplate);
       }
    };

    var offHover = function (event) {
        // Placeholder for function logic
       if ($(event.target.parentElement).find('.song-item-number').html() !== pauseButtonTemplate) {
           $(event.target.parentElement).find('.song-item-number').html(songItemNumber);
       }
      // New code - checkpoint 19
  //     console.log("songNumber type is " + typeOf(songNumber) + "\n and currentlyPlayingSongNumber type is " + typeof(currentlyPlayingSongNumber));
    };

    var clickHandler = function () {
        if ($(this.parentElement).find('.song-item-number').html() === pauseButtonTemplate) {
            $(this.parentElement).find('.song-item-number').html(playButtonTemplate);
        }
        else {
            $(this.parentElement).find('.song-item-number').html(pauseButtonTemplate);
        }
        // New code - checkpoint 19
        var songNumber = parseInt($(this).attr('data-song-number'));
  //      console.log("songNumber type is " + typeOf(songNumber) + "\n and currentlyPlayingSongNumber type is " + typeof(currentlyPlayingSongNumber));
        if (currentlyPlayingSongNumber !== songNumber) {
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            // Behavior will be incorrect here unless currentSongFromAlbum is reset
            // to be one less than songNumber.
            currentSongFromAlbum = currentAlbum.songs[songNumber - 1]
        }
        else if (currentlyPlayingSongNumber === songNumber) {
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            setSong(null);
        }
        updatePlayerBarSong();
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var setCurrentAlbum = function (album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    var albumImageList = [];

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumSongList.empty();

    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
    }
    //  sets up code to toggle from one image to another
    albumImageList.push(albumPicasso.albumArtUrl);
    albumImageList.push(albumMarconi.albumArtUrl);
    albumImageList.push(albumTesla.albumArtUrl);

    var imageIndex = 0;
    for (var i = 0; i < albumImageList.length; i++) {
        if (album.albumArtUrl === albumImageList[i]) {
            imageIndex = i;
        }
    }

    $albumImage.click( function () {
        imageIndex++;
        if (imageIndex === albumImageList.length) {
            imageIndex = 0;
        }
    //    $albumImage.attr('src','assets/images/album_covers/03.png');
        $albumImage.attr('src', albumImageList[imageIndex]);
    });
};

var getSongNumberCell = function (number) {
      var songNumberInfo = []
      number++;
      if (number > currentAlbum.songs.length) {
          number = 1;
      }
      var songNumElement = '.song-item-number[data-song-number="' + number + '"]';
      songNumberInfo.push(songNumElement);
      songNumberInfo.push(number);
      return songNumberInfo;
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function () {
    var prevSong = trackIndex(currentAlbum, currentSongFromAlbum);
    var currSong = trackIndex(currentAlbum, currentSongFromAlbum) + 1;
    if (currSong === currentAlbum.songs.length) {
        currSong = 0;
    }
    setSong(currSong);
    updatePlayerBarSong();

    // Array indexing is zero-based while the visible song numbers are not. Code
    // below takes care of the difference.
    var currSongCell = getSongNumberCell(currSong)[0];
    var prevSongCell = getSongNumberCell(prevSong)[0];
    var incPrevSong =  getSongNumberCell(prevSong)[1];

    $(currSongCell).html(pauseButtonTemplate);
    $(prevSongCell).html(incPrevSong);
};

var previousSong = function () {
    var prevSong = trackIndex(currentAlbum, currentSongFromAlbum);
    var currSong = trackIndex(currentAlbum, currentSongFromAlbum) - 1;
    if (currSong === -1) {
        currSong = currentAlbum.songs.length - 1;
    }
    setSong(currSong);
    updatePlayerBarSong();
    // Array indexing is zero-based while the visible song numbers are not. Code
    // below takes care of the difference.
    var currSongCell = getSongNumberCell(currSong)[0];
    var prevSongCell = getSongNumberCell(prevSong)[0];
    var incPrevSong =  getSongNumberCell(prevSong)[1];

    $(currSongCell).html(pauseButtonTemplate);
    $(prevSongCell).html(incPrevSong);
};

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $nextButton.click(nextSong);
    $previousButton.click(previousSong);
});
