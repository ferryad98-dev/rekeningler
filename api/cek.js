export default async function handler(req, res) {
  const { type, kode, nomor } = req.query;

  const API_KEY = process.env.API_KEY;

  const url = "https://app.apivalidasi.my.id/api/v3/validate";

  let body = {};

  if (type === "bank") {
    body = {
      type: "bank",
      bank_code: kode,
      account_number: nomor
    };
  } else {
    body = {
      type: "ewallet",
      ewallet_code: kode,
      phone_number: nomor
    };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": API_KEY
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message
    });
  }
}
