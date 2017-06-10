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

var createSongRow = function (songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
    +   '  <td class="song-item-number">' + songNumber + '</td>'
    +   '  <td class="song-item-title">'  + songName + '</td>'
    +   '  <td class="song-item-duration">' + songLength + '</td>'
    +   '</tr>'
    ;

    return template;
};

var setCurrentAlbum = function (album) {
    // #1
    var albumTitle = document.getElementsByClassName("album-view-title")[0];
    var albumArtist = document.getElementsByClassName("album-view-artist")[0];
    var albumReleaseInfo = document.getElementsByClassName("album-view-release-info")[0];
    var albumImage = document.getElementsByClassName("album-cover-art")[0];
    var albumSongList = document.getElementsByClassName("album-view-song-list")[0];
    var albumImageList = [];

    // #2
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    // #3
    albumSongList.innerHTML = '';

    // #4
    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
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

window.onload = function () {
    setCurrentAlbum(albumPicasso);
}