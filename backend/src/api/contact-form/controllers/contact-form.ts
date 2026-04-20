/**
 * contact-form controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::contact-form.contact-form",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        console.log(
          "--- Contact Form Submission Received (Built-in Email) ---",
        );

        // 1. Save data to database first
        const response = await super.create(ctx);
        console.log("Entry saved with ID:", response?.data?.id);

        // 2. Prepare background email task
        const { firstName, lastName, email, phone, message, howDidYouHear } =
          ctx.request.body.data;
        const fullName = `${firstName} ${lastName}`;
        const hrEmail = process.env.HR_EMAIL;

        // Background Email Execution via SMTP (nodemailer)
        const sendEmails = async () => {
          try {
            console.log("--- STARTING SMTP EMAIL DELIVERY ---");
            console.log(`[SMTP] Host    : ${process.env.SMTP_HOST}`);
            console.log(`[SMTP] Port    : ${process.env.SMTP_PORT}`);
            console.log(`[SMTP] Secure  : ${process.env.SMTP_SECURE}`);
            console.log(`[SMTP] User    : ${process.env.SMTP_USER}`);
            console.log(`[SMTP] From    : ${process.env.SMTP_FROM}`);
            console.log(`[SMTP] To HR   : ${hrEmail}`);
            console.log(`[SMTP] To User : ${email}`);

            if (!strapi.plugins["email"]) {
              console.error("[SMTP ERROR] email plugin NOT FOUND. Check plugins.ts");
              return;
            }

            // HR Email
            console.log("[SMTP] Sending HR Notification...");
            await strapi.plugins["email"].services.email.send({
              to: hrEmail,
              subject: `New Lead: ${fullName}`,
              text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nSource: ${howDidYouHear}\n\nMessage:\n${message}`,
              html: `<div><h2>New Lead</h2><p><b>Name:</b> ${fullName}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Source:</b> ${howDidYouHear}</p><p><b>Message:</b><br/>${message}</p></div>`,
            });
            console.log("[SMTP] ✔ HR email sent successfully.");

            // User Thank You Email
            console.log("[SMTP] Sending User confirmation...");
            await strapi.plugins["email"].services.email.send({
              to: email,
              subject: "Thank you for contacting Anarish Innovations",
              text: `Hi ${firstName},\n\nWe received your message and will get back to you soon.\n\nBest,\nAnarish Team`,
              html: `<div><h3>Thank you, ${firstName}!</h3><p>We've received your inquiry and our team will contact you shortly.</p><p>Best,<br/><b>ServitiumCRM Team</b></p></div>`,
            });
            console.log("[SMTP] ✔ User confirmation email sent successfully.");

            console.log("--- SMTP EMAIL DELIVERY COMPLETE ---");
          } catch (error) {
            console.error("[SMTP ERROR] Email delivery failed!");
            console.error("[SMTP ERROR] Message :", error.message);
            console.error("[SMTP ERROR] Code    :", error.code);
            console.error("[SMTP ERROR] Stack   :", error.stack);
            if (error.responseCode) {
              console.error("[SMTP ERROR] Response Code:", error.responseCode);
              console.error("[SMTP ERROR] Response     :", error.response);
            }
          }
        };

        // Trigger background task (DO NOT AWAIT to keep frontend responsive)
        sendEmails();

        // 3. Return response to user immediately
        return response;
      } catch (error) {
        console.error("Submission Error:", error);
        throw error;
      }
    },
  }),
);
