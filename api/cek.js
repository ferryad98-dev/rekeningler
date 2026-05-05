export default async function handler(req, res) {
  const { type, kode, nomor } = req.query;
  const API_KEY = process.env.API_KEY;

  let url = "";

  if (type === "bank") {
    url = `https://app.apivalidasi.my.id/api/bank?bank_code=${kode}&account_number=${nomor}`;
  } else {
    url = `https://app.apivalidasi.my.id/api/ewallet?ewallet_code=${kode}&phone_number=${nomor}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_KEY}`, // 🔥 ini penting
        "Content-Type": "application/json"
      }
    });

    const text = await response.text(); // debug dulu
    console.log(text);

    const data = JSON.parse(text);

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message
    });
  }
}
