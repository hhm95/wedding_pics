document.addEventListener("DOMContentLoaded", function () {
  // ---- Lightbox gallery ----
  var figures = Array.prototype.slice.call(document.querySelectorAll(".gallery-grid figure"));
  var lightbox = document.querySelector(".lightbox");
  var lightboxImg = lightbox ? lightbox.querySelector("img") : null;
  var currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + figures.length) % figures.length;
    var img = figures[currentIndex].querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }

  figures.forEach(function (figure, index) {
    figure.addEventListener("click", function () {
      showImage(index);
      lightbox.classList.add("open");
    });
  });

  if (lightbox) {
    lightbox.querySelector(".lightbox-close").addEventListener("click", function () {
      lightbox.classList.remove("open");
    });
    lightbox.querySelector(".lightbox-prev").addEventListener("click", function () {
      showImage(currentIndex - 1);
    });
    lightbox.querySelector(".lightbox-next").addEventListener("click", function () {
      showImage(currentIndex + 1);
    });
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        lightbox.classList.remove("open");
      }
    });
    document.addEventListener("keydown", function (event) {
      if (!lightbox.classList.contains("open")) return;
      if (event.key === "Escape") lightbox.classList.remove("open");
      if (event.key === "ArrowLeft") showImage(currentIndex - 1);
      if (event.key === "ArrowRight") showImage(currentIndex + 1);
    });
  }

  // ---- Background music toggle ----
  var musicButtons = Array.prototype.slice.call(document.querySelectorAll(".music-btn"));

  musicButtons.forEach(function (button) {
    var audio = document.getElementById(button.dataset.audio);

    button.addEventListener("click", function () {
      var isPlaying = !audio.paused;

      musicButtons.forEach(function (otherButton) {
        var otherAudio = document.getElementById(otherButton.dataset.audio);
        otherAudio.pause();
        otherButton.classList.remove("playing");
      });

      if (!isPlaying) {
        audio.currentTime = 0;
        audio.play();
        button.classList.add("playing");
      }
    });
  });
});
