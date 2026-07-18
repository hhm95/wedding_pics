var PASSWORD_HASH = "2801c4b84827abaf2fc70a2ecb19511c5b1e6b21cc4ced512ebe2ba769b8178b";
var SESSION_KEY = "wedding_auth_ok";

(function () {
  function unlock() {
    var gate = document.getElementById("auth-gate");
    if (gate) gate.remove();
    document.body.classList.remove("gate-open");
  }

  function sha256Hex(text) {
    var bytes = new TextEncoder().encode(text);
    return crypto.subtle.digest("SHA-256", bytes).then(function (buf) {
      return Array.prototype.map
        .call(new Uint8Array(buf), function (b) {
          return b.toString(16).padStart(2, "0");
        })
        .join("");
    });
  }

  // Đã nhập đúng trong phiên này rồi thì mở luôn
  try {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      unlock();
      return;
    }
  } catch (e) { /* sessionStorage bị chặn -> vẫn hỏi mật khẩu */ }

  var form = document.getElementById("auth-form");
  var input = document.getElementById("auth-input");
  var error = document.getElementById("auth-error");
  if (!form || !input) return;

  input.focus();

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    sha256Hex(input.value).then(function (hash) {
      if (hash === PASSWORD_HASH) {
        try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (e) {}
        unlock();
      } else {
        if (error) error.hidden = false;
        input.value = "";
        input.focus();
      }
    });
  });
})();
