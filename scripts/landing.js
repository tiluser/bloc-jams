var foreach = function (collection, callback) {
    for (var i = 0; i < collection.length; i++) {
        callback(collection[i]);
    }
}

var pointsArray = document.getElementsByClassName('point');

var animatePoints = function (points) {

var revealPoint = function(point) {
//    var point = points[index];
    point.style.opacity = 1;
    point.style.transform = "scaleX(1) translateY(0)";
    point.style.msTransform = "scaleX(1) translateY(0)";
    point.style.WebkitTransform = "scaleX(1) translateY(0)";
  };

    foreach(pointsArray, revealPoint);
};

window.onload = function () {
    // Automatically animate the points on a tall screen where scrolling can't trigger the animation
    if (window.innerHieght > 950) {
        animatePoints(pointsArray);
    }
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    window.addEventListener("scroll", function(event) {
        console.log("Current offset from the top is " + sellingPoints.getBoundingClientRect().top + " pixels");
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
            animatePoints(pointsArray);
        }
    });
};
