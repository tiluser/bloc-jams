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

    // Updates the text of the h2 tags
    var updatePlayerBarSong = function () {
        $('.song-name').html(currentSongFromAlbum.title);
        $('.artist-song-mobile').html(currentSongFromAlbum.title);
        $('.main-controls .play-pause').html(playerBarPauseButton);
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
            currentlyPlayingSongNumber = songNumber;
            currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
      //      alert(currentSongFromAlbum.title);
            updatePlayerBarSong();
        }
        else if (currentlyPlayingSongNumber === songNumber) {
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
        }

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

    // #2
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
//    $albumImage.attr('src', album.albumArtUrl);
    $albumImage.setAttribute('src', album.albumArtUrl);

    // #3
//    albumSongList.innerHTML = '';
     $albumSongList.empty();

    // #4
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
    }
    // #5 - sets up code to toggle from one image to another
    albumImageList.push(albumPicasso.albumArtUrl);
    albumImageList.push(albumMarconi.albumArtUrl);
    albumImageList.push(albumTesla.albumArtUrl);

    var imageIndex = 0;
    for (var i = 0; i < albumImageList.length; i++) {
        if (album.albumArtUrl === albumImageList[i]) {
            imageIndex = i;
        }
    }

    $albumImage.addEventListener("click", function () {
        imageIndex++;
        if (imageIndex === albumImageList.length) {
            imageIndex = 0;
        }
        $albumImage.setAttribute('src', albumImageList[imageIndex]);
    });

};

var trackIndex = function (album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function () {
  /*
    var previousSongNumber;
    currentlyPlayingSongNumber = trackIndex(currentAlbum, currentSongFromAlbum);
    previousSongNumber = currentlyPlayingSongNumber;
    currentlyPlayingSongNumber++;
    if (currentlyPlayingSongNumber === currentAlbum.songs.length) {
        currentlyPlayingSongNumber = 0;
    }
    currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber];
*/
    /*
    if ($(this).find('.song-item-number').text() !== "" && $(this).find('.song-item-number').html() !== pauseButtonTemplate) {
        songItemNumber = parseInt($(this).find('.song-item-number').text());
        $(this).find('.song-item-number').html(playButtonTemplate);
    }
    */
    alert('');
};

var previousSong = function () {
  /*
    currentlyPlayingSongNumber = trackIndex(currentAlbum, currentSongFromAlbum);
    currentlyPlayingSongNumber--;
    if (currentlyPlayingSongNumber === -1) {
        currentlyPlayingSongNumber = currentAlbum.songs.length - 1;
    }
    currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber];
    */
      alert('');
};

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $('.main-controls .previous').addEventListener('click',function () { alert()});
    $previousButton.click(previousSong);
    $nextButton.click(function () { alert()} );
});
