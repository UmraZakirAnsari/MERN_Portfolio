const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

// Transport setup
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

// Controller
const sendemailcontroller = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // validation
    if (!name || !email || !msg) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Send email
    await transporter.sendMail({
      to: "ansariumrazakir@gmail.com",
      from: "asdf.01qwerty.012@gmail.com" , // ✔️ verified hai — ye hi hona chahiye!
 // ✅ Must be verified in SendGrid
      subject: "Contact from Portfolio",
      html: `
        <h5>Contact Details:</h5>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Message:</strong> ${msg}</li>
        </ul>
      `
    });

    return res.status(200).send({
      success: true,
      message: "Your message sent successfully",
    });

  } catch (error) {
    console.error("❌ Email Error:", error.message);
    return res.status(500).send({
      success: false,
      message: "Send Email API error",
      error: error.message,
    });
  }
};

module.exports = { sendemailcontroller };
