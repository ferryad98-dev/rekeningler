async function cek() {
  const type = document.getElementById("type").value;
  const kode = document.getElementById("kode").value;
  const nomor = document.getElementById("nomor").value;

  const res = await fetch(`/api/cek?type=${type}&kode=${kode}&nomor=${nomor}`);
  const data = await res.json();

  let hasil = "";

  if (!data.status) {
    hasil = "❌ Gagal";
  } else {
    if (type === "bank") {
      hasil = `
        Bank: ${data.data.bank_name} <br>
        Nama: ${data.data.account_name}
      `;
    } else {
      hasil = `
        Ewallet: ${data.data.ewallet_name} <br>
        Nama: ${data.data.account_name}
      `;
    }
  }

  document.getElementById("result").innerHTML = hasil;
}
