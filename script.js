let lastClick = 0;

function detectBank(norek) {
  if (norek.startsWith("014")) return "014"; // BCA
  if (norek.startsWith("008")) return "008"; // Mandiri
  if (norek.startsWith("002")) return "002"; // BRI
  return "";
}

async function cek() {
  const now = Date.now();

  if (now - lastClick < 5000) {
    alert("Tunggu 5 detik!");
    return;
  }

  lastClick = now;

  const type = document.getElementById("type").value;
  let kode = document.getElementById("kode").value;
  const nomor = document.getElementById("nomor").value;

  if (!nomor || nomor.length < 6) {
    alert("Nomor tidak valid");
    return;
  }

  if (!kode && type === "bank") {
    kode = detectBank(nomor);
  }

  const resultBox = document.getElementById("result");
  const loader = document.getElementById("loader");
  const btn = document.getElementById("btn");

  resultBox.style.display = "none";
  loader.style.display = "block";
  btn.innerText = "Loading...";
  btn.disabled = true;

  try {
    const res = await fetch(`/api/cek?type=${type}&kode=${kode}&nomor=${nomor}`);
    const data = await res.json();

    loader.style.display = "none";
    resultBox.style.display = "block";
    btn.innerText = "Cek Sekarang";
    btn.disabled = false;

    if (!data.status) {
      resultBox.className = "result error";
      resultBox.innerHTML = "❌ Data tidak ditemukan / error";
      return;
    }

    if (type === "bank") {
      resultBox.className = "result success";
      resultBox.innerHTML = `
        <b>🏦 ${data.data.bank_name}</b><br><br>
        ${data.data.account_number}<br><br>
        <b id="nama">${data.data.account_name}</b><br><br>
        <button onclick="copyNama()">Copy Nama</button>
      `;
    } else {
      resultBox.className = "result success";
      resultBox.innerHTML = `
        <b>💳 ${data.data.ewallet_name}</b><br><br>
        ${data.data.phone_number}<br><br>
        <b id="nama">${data.data.account_name}</b><br><br>
        <button onclick="copyNama()">Copy Nama</button>
      `;
    }

  } catch (err) {
    loader.style.display = "none";
    resultBox.style.display = "block";
    resultBox.className = "result error";
    resultBox.innerHTML = "❌ Server error";
    btn.innerText = "Cek Sekarang";
    btn.disabled = false;
  }
}

function copyNama() {
  const nama = document.getElementById("nama").innerText;
  navigator.clipboard.writeText(nama);
  alert("Nama disalin!");
}
