async function cek() {
  const type = document.getElementById("type").value;
  const kode = document.getElementById("kode").value;
  const nomor = document.getElementById("nomor").value;

  const resultBox = document.getElementById("result");
  const loader = document.getElementById("loader");

  resultBox.style.display = "none";
  loader.style.display = "block";

  try {
    const res = await fetch(`/api/cek?type=${type}&kode=${kode}&nomor=${nomor}`);
    const data = await res.json();

    loader.style.display = "none";
    resultBox.style.display = "block";

    if (!data.status) {
      resultBox.className = "result error";
      resultBox.innerHTML = "❌ Data tidak ditemukan / error";
      return;
    }

    if (type === "bank") {
      resultBox.className = "result success";
      resultBox.innerHTML = `
        <b>🏦 ${data.data.bank_name}</b><br><br>
        <small>No Rekening</small><br>
        ${data.data.account_number}<br><br>
        <small>Nama Pemilik</small><br>
        <b>${data.data.account_name}</b>
      `;
    } else {
      resultBox.className = "result success";
      resultBox.innerHTML = `
        <b>💳 ${data.data.ewallet_name}</b><br><br>
        <small>No HP</small><br>
        ${data.data.phone_number}<br><br>
        <small>Nama Pemilik</small><br>
        <b>${data.data.account_name}</b>
      `;
    }

  } catch (err) {
    loader.style.display = "none";
    resultBox.style.display = "block";
    resultBox.className = "result error";
    resultBox.innerHTML = "❌ Server error";
  }
}
