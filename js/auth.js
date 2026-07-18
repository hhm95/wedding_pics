/* =========================================================
   CỔNG MẬT KHẨU (đơn giản, phía trình duyệt)
   ---------------------------------------------------------
   ĐỔI MẬT KHẨU: sửa dòng PASSWORD bên dưới, rồi lưu file.
   Lưu ý: đây chỉ là "rào nhẹ" để người lạ không xem được,
   KHÔNG phải bảo mật thật (site tĩnh nên không kiểm tra
   phía máy chủ được).
   ========================================================= */
var PASSWORD = "manhthao";      // <-- ĐỔI mật khẩu tại đây
var SESSION_KEY = "wedding_auth_ok";

(function () {
  function unlock() {
    var gate = document.getElementById("auth-gate");
    if (gate) gate.remove();
    document.body.classList.remove("gate-open");
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
    if (input.value === PASSWORD) {
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (e) {}
      unlock();
    } else {
      if (error) error.hidden = false;
      input.value = "";
      input.focus();
    }
  });
})();
