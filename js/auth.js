/* =========================================================
   CỔNG MẬT KHẨU (đơn giản, phía trình duyệt)
   ---------------------------------------------------------
   Mật khẩu KHÔNG lưu plaintext — chỉ lưu hash SHA-256 bên dưới.
   Khi có người nhập, chuỗi nhập vào được hash rồi so với hash này.

   ĐỔI MẬT KHẨU: tạo hash SHA-256 của mật khẩu mới rồi thay vào
   PASSWORD_HASH. Có thể tạo hash bằng 1 trong 2 cách:
     - Terminal:  printf '%s' 'matkhaumoi' | sha256sum
     - Trình duyệt (Console F12):
         crypto.subtle.digest('SHA-256', new TextEncoder().encode('matkhaumoi'))
           .then(b => console.log([...new Uint8Array(b)]
             .map(x => x.toString(16).padStart(2,'0')).join('')));

   Lưu ý: đây chỉ là "rào nhẹ". Hash giúp giấu mật khẩu khỏi người
   xem source, nhưng site tĩnh nên vẫn có thể bị bypass và ẢNH VẪN
   truy cập trực tiếp qua URL. Không phải bảo mật thật.
   ========================================================= */
var PASSWORD_HASH = "2801c4b84827abaf2fc70a2ecb19511c5b1e6b21cc4ced512ebe2ba769b8178b"; // sha256("manhthao")
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
