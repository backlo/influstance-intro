/*
 * 슬라이드 넘기기 — 외부 라이브러리 없음.
 * CSS scroll-snap이 본체이고 이 파일은 보조다. 자바스크립트가 꺼져 있어도
 * 손가락·트랙패드로 넘길 수 있다.
 */
(function () {
  var track = document.getElementById("track");
  var prev = document.getElementById("prev");
  var next = document.getElementById("next");
  var count = document.getElementById("count");
  var dots = document.getElementById("dots").children;
  var slides = track.children;
  var total = slides.length;
  var index = 0;

  function render() {
    count.textContent = index + 1 + " / " + total;
    prev.disabled = index === 0;
    next.disabled = index === total - 1;
    for (var i = 0; i < dots.length; i += 1) {
      dots[i].className = i === index ? "on" : "";
    }
  }

  function go(n) {
    index = Math.max(0, Math.min(total - 1, n));
    /*
     * scrollTo({behavior:"smooth"})를 쓰지 않는다.
     * scroll-snap-type이 mandatory인 스크롤러에서는 부드러운 스크롤이 곧바로
     * 취소돼 화살표·키보드가 아무 동작도 하지 않는 브라우저가 있다.
     */
    track.scrollLeft = index * track.clientWidth;
    render();
  }

  next.addEventListener("click", function () {
    go(index + 1);
  });
  prev.addEventListener("click", function () {
    go(index - 1);
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  });

  /* 손가락·트랙패드로 넘겼을 때도 아래 표시가 따라오게 한다 */
  function sync() {
    var i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== index) {
      index = i;
      render();
    }
  }
  track.addEventListener("scroll", sync, { passive: true });
  track.addEventListener("touchend", sync, { passive: true });
  window.addEventListener("resize", function () {
    go(index);
  });

  render();
})();
