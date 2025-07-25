import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const templates = {
  welcome: (data) => ({
    subject: 'Welcome to Autoprofitor!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0EA5E9;">Welcome to Autoprofitor, ${data.name}!</h1>
        <p>Thank you for joining our platform. You're now ready to optimize your product pricing automatically.</p>
        <p>Get started by connecting your first store and let our AI do the work for you.</p>
        <a href="${process.env.FRONTEND_URL}/connect-store" style="background: #0EA5E9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Connect Your Store</a>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The Autoprofitor Team</p>
      </div>
    `
  }),
  
  'reset-password': (data) => ({
    subject: 'Reset Your Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0EA5E9;">Reset Your Password</h1>
        <p>Hi ${data.name},</p>
        <p>You requested to reset your password. Click the button below to create a new password:</p>
        <a href="${data.resetLink}" style="background: #0EA5E9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Reset Password</a>
        <p>This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>The Autoprofitor Team</p>
      </div>
    `
  }),

  'price-update': (data) => ({
    subject: 'Price Optimization Complete',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0EA5E9;">Price Optimization Complete</h1>
        <p>Hi ${data.name},</p>
        <p>We've successfully optimized pricing for ${data.productCount} products in your store.</p>
        <p><strong>Total Revenue Increase:</strong> ${data.revenueIncrease}</p>
        <p><strong>Average Profit Margin Improvement:</strong> ${data.profitImprovement}</p>
        <a href="${process.env.FRONTEND_URL}/products" style="background: #0EA5E9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">View Details</a>
        <p>Best regards,<br>The Autoprofitor Team</p>
      </div>
    `
  })
};

export const sendEmail = async ({ to, template, data }) => {
  try {
    const emailTemplate = templates[template](data);
    
    const mailOptions = {
      from: `"Autoprofitor" <${process.env.SMTP_USER}>`,
      to,
      subject: emailTemplate.subject,
      html: emailTemplate.html
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};