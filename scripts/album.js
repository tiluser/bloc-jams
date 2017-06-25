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
var currentSoundFile = null;
var currentVolume = 80;

var $oneButton = $('.main-controls .play-pause');
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

var setVolume = function (volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
}

// Slightly different versions of setSong are needed depending on where it's called.
// Pass a 1 for the version in the ClickHandler of CreateSongRow, a zero for the
// next and previous buttons on the navigation var.*
var setSongFactory = function (subOne) {
    var setSong = function(songNumber) {
        if (currentSoundFile) {
            currentSoundFile.stop();
        }
        currentlyPlayingSongNumber = parseInt(songNumber);
        currentSongFromAlbum = currentAlbum.songs[songNumber - subOne];
        currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
            formats: [ 'mp3' ],
            preload: true
        });
        setVolume(currentVolume);
    };
    return setSong;
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
    };

    var clickHandler = function () {
        var setSong = setSongFactory(1);
        if ($(this.parentElement).find('.song-item-number').html() === pauseButtonTemplate) {
            $(this.parentElement).find('.song-item-number').html(playButtonTemplate);
        }
        else {
            $(this.parentElement).find('.song-item-number').html(pauseButtonTemplate);
        }

        var songNumber = parseInt($(this).attr('data-song-number'));
        if (currentlyPlayingSongNumber !== songNumber) {
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            currentSoundFile.play();
        }
        else if (currentlyPlayingSongNumber === songNumber) {
            if (currentSoundFile.isPaused()) {
                $(this).html(pausedButtonTemplate);
                currentSoundFile.play();
            }
            else {
                $(this).html(playButtonTemplate);
                currentSoundFile.pause();
            }
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
      var songNumberInfo = [];
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

// Former next() and previous() methods are factored into a single function
// that returns a closure.
var nextPrevClickFactory = function (step) {
    var compareVal;
    var resetVal;

    if (step === 1) {
        compareVal = currentAlbum.songs.length;
        resetVal = 0;
    }
    else {
        compareVal = -1;
        resetVal = currentAlbum.songs.length - 1;
    }

    var gotoSong = function () {
        var prevSong = trackIndex(currentAlbum, currentSongFromAlbum);
        var currSong = trackIndex(currentAlbum, currentSongFromAlbum) + step;
        var setSong = setSongFactory(0);

        if (currSong === compareVal) {
            currSong = resetVal;
        }
        setSong(currSong);
        currentSoundFile.play();
        updatePlayerBarSong();

        // Array indexing is zero-based while the visible song numbers are not. Code
        // below takes care of the difference.
        var currSongCell = getSongNumberCell(currSong)[0];
        var prevSongCell = getSongNumberCell(prevSong)[0];
        var incPrevSong =  getSongNumberCell(prevSong)[1];

        $(currSongCell).html(pauseButtonTemplate);
        $(prevSongCell).html(incPrevSong);
    };
    return gotoSong;

};

var togglePlayFromPlayerBar = function () {
    var currSong;
    var currSongCell;
    var setSong = setSongFactory(0);
    if ($('.main-controls .play-pause').html() === playerBarPlayButton) {
        $('.main-controls .play-pause').html(playerBarPauseButton);
        currSong = trackIndex(currentAlbum, currentSongFromAlbum);
        if (currSong === -1) {
            currSong = 0;
            setSong(currSong);
        }
        currSongCell = getSongNumberCell(currSong)[0];
        $(currSongCell).html(pauseButtonTemplate);
        currentSoundFile.play();
    }
    else {
        $('.main-controls .play-pause').html(playerBarPlayButton);
        currSong = trackIndex(currentAlbum, currentSongFromAlbum);
        currSongCell = getSongNumberCell(currSong)[0];
        $(currSongCell).html(playButtonTemplate);
        currentSoundFile.pause();
    }
}

//var x = currentAlbum.songs.length;
$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    var nextSong = nextPrevClickFactory(1);
    var previousSong = nextPrevClickFactory(-1);
    var playPauseBarSelector = $('.main-controls .play-pause');
    $nextButton.click(nextSong);
    $previousButton.click(previousSong);
    playPauseBarSelector.click(togglePlayFromPlayerBar);
});
