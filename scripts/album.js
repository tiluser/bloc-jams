// Example album
var albumPicasso = {
    title: "The Colors",
    artist: "Pablo Picasso",
    label: "Cubism",
    year: "1881",
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21' },
        { title: 'Magenta', duration: '2:15' }
    ]
};

// Another example album
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21' },
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15' }
    ]
};

var albumTesla = {
    title: 'Many Inventions',
    artist: 'Nikola Tesla',
    label: 'High Energy',
    year: '1891',
    albumArtUrl: 'assets/images/album_covers/02.png',
    songs: [
        { title: 'Tesla Coil', duration: '3:56' },
        { title: 'Tesla Turbine', duration: '2:33' },
        { title: 'Wireless Lighting', duration: '4:35' },
        { title: 'Remote Control', duration: '5:01' },
        { title: 'Railgun', duration: '2:59' },
        { title: '300 patents', duration: '4:30' }
    ]
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
           songItemNumber = $(event.target.parentElement).find('.song-item-number').text();
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
        if ($(this.parentElement).find('.song-item-number').html() === pauseButtonTemplate) {
            $(this.parentElement).find('.song-item-number').html(playButtonTemplate);
        }
        else {
            $(this.parentElement).find('.song-item-number').html(pauseButtonTemplate);
        }
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var setCurrentAlbum = function (album) {
    // #1
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
    $albumImage.attr('src', album.albumArtUrl);

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

    albumImage.addEventListener("click", function () {
        imageIndex++;
        if (imageIndex === albumImageList.length) {
            imageIndex = 0;
        }
        albumImage.setAttribute('src', albumImageList[imageIndex]);
    });
};

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
});
