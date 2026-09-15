/*
 * 이메일 신청 — 서버 없이 구글폼으로 보낸다. 외부 라이브러리 없음.
 *
 * 자바스크립트가 꺼져 있어도 폼 자체는 동작한다(구글폼 페이지로 이동해 그쪽 감사 화면).
 * 켜져 있으면 페이지를 떠나지 않고 같은 자리에서 감사 문구로 바뀐다.
 */
(function () {
  var forms = document.querySelectorAll("[data-signup]");
  if (!forms.length) return;

  function showDone() {
    /* 두 폼은 한 쌍이다 — 한쪽에 넣으면 둘 다 감사 상태로 바꾼다 */
    for (var i = 0; i < forms.length; i += 1) {
      var form = forms[i];
      if (form.dataset.done === "1") continue;
      form.dataset.done = "1";

      var done = document.createElement("p");
      done.className = "signup-done";
      done.setAttribute("role", "status");
      done.textContent = "✓ 등록됐습니다, 오픈 때 알려드릴게요";
      form.parentNode.replaceChild(done, form);

      var note = done.parentNode.querySelector(".signup-note");
      if (note) note.hidden = true;
      var err = done.parentNode.querySelector("[data-error]");
      if (err) err.hidden = true;
    }
  }

  function bind(form) {
    var input = form.querySelector('input[type="email"]');
    var error = form.parentNode.querySelector("[data-error]");

    form.addEventListener("submit", function (e) {
      var value = (input.value || "").trim();

      /* 브라우저 기본 검증만 쓴다. 형식이 틀리면 보내지 않는다 */
      if (!value || !input.checkValidity()) {
        e.preventDefault();
        input.setAttribute("aria-invalid", "true");
        if (error) error.hidden = false;
        input.focus();
        return;
      }

      input.removeAttribute("aria-invalid");
      if (error) error.hidden = true;

      /*
       * 다른 사이트로 보내는 것이라 브라우저가 응답을 읽지 못하게 막는다(no-cors).
       * 그래서 "보냈다"까지만 알 수 있고 접수 성공 여부는 확인할 수 없다.
       * 실패했을 가능성에 대비해 안내 문구에 문의 이메일을 함께 둔다.
       */
      if (window.fetch) {
        e.preventDefault();
        var body = new URLSearchParams();
        body.append(input.name, value);
        fetch(form.action, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        })
          .then(showDone)
          .catch(showDone);
      }
      /* fetch가 없는 아주 오래된 브라우저는 기본 동작(구글폼 페이지로 이동)에 맡긴다 */
    });

    input.addEventListener("input", function () {
      input.removeAttribute("aria-invalid");
      if (error) error.hidden = true;
    });
  }

  for (var i = 0; i < forms.length; i += 1) bind(forms[i]);
})();
