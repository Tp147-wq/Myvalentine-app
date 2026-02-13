let yesScale = 1;
let yesTexts = ["Có", "Đồng ý", ":))) em hong nhấn được đâu", "EM chọn nút này nò", "Đừng nhấn nút đó mò","Em chọn nút ở đây nè🫠"];
let yesIndex = 0;
let customTextWhenCovered = "Oi thoi chếch anh lỡ che mất òi😗 ";

/* --------------------------
   Đăng nhập / Thoát
--------------------------- */
function loginAction() {
  const usernameInput = document.getElementById("Vo Anh Thu");
  const passwordInput = document.getElementById("05052008");
  const messageBox = document.getElementById("messageBox");

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  const correctUser = "Vo Anh Thu";
  const correctPass = "05052008";

  // Chưa nhập gì
  if (username === "" && password === "") {
    messageBox.innerText = "Nhập tên và mật khẩu đi nè 🥺";
    return;
  }

  // Chưa nhập mật khẩu
  if (password === "") {
    messageBox.innerText = "Em quên nhập mk ó";
    passwordInput.focus();
    return;
  }

  // Đúng
  if (username === correctUser && password === correctPass) {
    messageBox.innerText = "";
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("letterBox").style.display = "block";
    return;
  }

  // Sai mật khẩu
  messageBox.innerHTML = `
    <div>
      Sai mật khẩu òi 😘 
      <br>
      <span id="hintToggle" style="color:pink; cursor:pointer; text-decoration:underline;">
        Gợi ý
      </span>
      <div id="hintText" style="display:none; margin-top:5px;">
        Gồm 8 chữ số, chính là ngày người dễ thương trước màn hình xuất hiện 💕
      </div>
    </div>
  `;

  passwordInput.value = "";
  passwordInput.focus();

  // Gắn sự kiện sau khi render
  const toggle = document.getElementById("hintToggle");
  const hint = document.getElementById("hintText");

  toggle.addEventListener("click", function () {
    hint.style.display =
      hint.style.display === "none" ? "block" : "none";
  });
}



function exitAction() {
  document.getElementById("customDialog").style.display = "block";
}
function confirmExit(choice) {
  document.getElementById("customDialog").style.display = "none";
  if (choice) {
    document.getElementById("letterBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
  }
}

/* --------------------------
   Nút Có / Không
--------------------------- */
function letterYes() {
  window.location.href = "valentine.html"; // sang trang Valentine
}

function letterNo() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  const rect = noBtn.getBoundingClientRect();
  const x = rect.left;
  const y = rect.top;

  // Khung Không chạy đi ngẫu nhiên
  const centerWidth = window.innerWidth * 0.5;
  const centerHeight = window.innerHeight * 0.5;

  const startX = (window.innerWidth - centerWidth) / 2;
  const startY = (window.innerHeight - centerHeight) / 2;

  noBtn.style.position = "absolute";
  noBtn.style.left = startX + Math.random() * (centerWidth - 140) + "px";
  noBtn.style.top = startY + Math.random() * (centerHeight - 60) + "px";


  // Khung Có nhảy tới vị trí cũ của Khung Không
  yesBtn.style.position = "absolute";
  yesBtn.style.left = x + "px";
  yesBtn.style.top = y + "px";

  // 👉 Khung Có tăng thêm 0.5 lần mỗi lần nhấn
  yesScale += 0.5;
  const maxWidth = window.innerWidth - 100;
  const maxHeight = window.innerHeight - 100;

  const newWidth = Math.min(yesScale * 100, maxWidth);
  const newHeight = Math.min(yesScale * 60, maxHeight);

  yesBtn.style.width = newWidth + "px";
  yesBtn.style.height = newHeight + "px";
  yesBtn.style.fontSize = Math.min(yesScale * 16, 48) + "px";

  if (yesIndex < yesTexts.length) {
    yesBtn.innerText = yesTexts[yesIndex];
    yesIndex++;
  }

  if (yesIndex === yesTexts.length) {
    yesBtn.style.width = (window.innerWidth - 50) + "px";
    yesBtn.style.height = (window.innerHeight - 100) + "px";
    yesBtn.style.left = "25px";
    yesBtn.style.top = "50px";

    yesBtn.innerText = customTextWhenCovered;
    yesBtn.style.backgroundColor = "lightyellow";
    yesBtn.style.borderColor = "orange";
    yesBtn.style.color = "darkred";
    noBtn.disabled = true;

    yesBtn.onclick = function() {
      window.location.href = "valentine.html"; // khi nút Yes phủ hết màn hình
    };
  }

  const yesRect = yesBtn.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();

  const fullyCovered =
    yesRect.left <= noRect.left &&
    yesRect.top <= noRect.top &&
    yesRect.right >= noRect.right &&
    yesRect.bottom >= noRect.bottom;

  if (fullyCovered) {
    yesBtn.innerText = customTextWhenCovered;
    yesBtn.style.backgroundColor = "lightyellow";
    yesBtn.style.borderColor = "orange";
    yesBtn.style.color = "darkred";
    noBtn.disabled = true;
  } else {
    if (yesIndex < yesTexts.length) {
      noBtn.disabled = false;
      yesBtn.style.backgroundColor = "white";
      yesBtn.style.borderColor = "red";
      yesBtn.style.color = "black";
    }
  }
}

/* --------------------------
   Hiệu ứng trái tim bay nền
--------------------------- */
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  const emojis = ["❤️","💕","💖","💜","💘","💞"];
  heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.bottom = "0px";
  document.querySelector(".hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 500);

document.getElementById("loginBox").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    loginAction();
  }
});
