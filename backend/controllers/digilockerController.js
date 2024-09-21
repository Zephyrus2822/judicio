const axios = require('axios');

// Function to initiate DigiLocker login
exports.initiateLogin = (req, res) => {
  const digilockerAuthUrl = `https://auth.digilocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=profile`;
  res.redirect(digilockerAuthUrl);
};

// Function to get access token and fetch documents
exports.fetchDocuments = async (req, res) => {
  const code = req.query.code;
  
  try {
    const tokenResponse = await axios.post('https://auth.digilocker.gov.in/public/oauth2/1/token', {
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    const accessToken = tokenResponse.data.access_token;

    // Use the access token to fetch user documents from DigiLocker
    const documentResponse = await axios.get('https://api.digilocker.gov.in/public/v1/fetch-documents', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const documents = documentResponse.data.documents;

    // Save document metadata to MongoDB
    documents.forEach(async (doc) => {
      const document = new Document({
        userId: req.user.id,
        documentType: doc.type,
        documentURL: doc.url,
        issuedBy: doc.issuedBy,
        issuedDate: doc.issuedDate,
      });
      await document.save();
    });

    res.json({ message: 'Documents saved', documents });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching documents from DigiLocker');
  }
};
