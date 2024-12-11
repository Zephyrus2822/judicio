import axios from "axios";

const sendSms = async (req, res) => {
    const { Phone, message } = req.body;
    const apikey='436325AMLIjrh6UEl6759d056P1'
    const sender = "SENDERID"; // Approved sender ID
  const url = "https://api.msg91.com/api/v2/sendsms";

  const options = {
    method: 'POST',
    url: 'https://control.msg91.com/api/v5/flow',
    headers: {
      authkey: 'Enter your MSG91 authkey',
      accept: 'application/json',
      'content-type': 'application/json'
    },
    data: '{\n  "template_id": "EntertemplateID",\n  "short_url": "1 ",\n  "short_url_expiry": "5",\n  "realTimeResponse": "1 ", \n  "recipients": [\n    {\n      "mobiles": "",\n      "VAR1": "VALUE 1",\n      "VAR2": "VALUE 2"\n    }\n  ]\n}'
  };

  try {
    const { data } = await axios.request(options);
    console.log(data)
    res.status(200).json({ message: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to send SMS-${error}` });
  }
};

export default sendSms