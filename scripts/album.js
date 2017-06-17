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
    return $(template);
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

// Find's the first parent node of the specified class
var findParentByClassName = function (currNode, parentClassName) {
    var classElements = document.getElementsByClassName(parentClassName);
    var upNode = currNode;
    while (true) {
        upNode = upNode.parentElement;
        if (upNode === null) {
            console.log("No parent found");
            return null;
        } else if (upNode.className === parentClassName) {
            return upNode;
        }
    }
};

// Get the song associated with the element
var getSongItem = function (element) {
    var elemClassName = element.className;
    var parentNode;

    switch(elemClassName) {
    case "song-item-number":
        songItem = element;
        break;

    case "song-item-title":
        parentNode = findParentByClassName(element,"album-view-song-item");
        songItem = parentNode.children[0];
        break;

    case "song-item-duration":
        parentNode = findParentByClassName(element,"album-view-song-item");
        songItem = parentNode.children[0];
        break;

    case "album-view-song-item":
        songItem = element.children[0];
        break;

    default:
        parentNode = findParentByClassName(element,"song-item-number");

        if (parentNode !== null) {
            songItem = parentNode;
        }  else {
            songItem = null;
        }
    }

    return songItem;
};

 // Elements we'll be adding listeners to
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

var clickHandler = function (targetElement) {

    var songItem = getSongItem(targetElement);

    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
  //      console.log("Currently playing song is " + currentlyPlayingSong);
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
};


window.onload = function () {
    setCurrentAlbum(albumPicasso);

    songListContainer.addEventListener('mouseover', function(event) {
    // Only target individual song rows during event delegation
    var songItem = getSongItem(event.target);
    var songItemNumber = songItem.getAttribute('data-song-number');
//    if ((event.target.parentElement.className === 'album-view-song-item') && (songItemNumber !== currentPlayingSong)) {
      if ((event.target.parentElement.className === 'album-view-song-item') && (songItemNumber !== currentlyPlayingSong)) {
        event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
      }
    });

    for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {

            // #1
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');
        //    alert("Song number is " + songItemNumber);
            // #2
            if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = songItemNumber;
            }
        //    alert("Currently playing song is " + currentlyPlayingSong);
       });

         songRows[i].addEventListener('click', function (event) {
             clickHandler(event.target);
         });
   }
}
