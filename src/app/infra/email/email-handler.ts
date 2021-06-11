import { createTransport, Transporter } from "nodemailer";
import EmailData from "../../../domain/infra/email/email-data";
import IEmailHandler from "../../../domain/infra/email/i-email-handler";
import configurations from "../config/configurations";

export default class EmailHandler implements IEmailHandler {

  private static transporter: Transporter;

  public async connectToServer(): Promise<void> {
    try {
      EmailHandler.transporter = createTransport({
        host: configurations.emailHost,
        port: configurations.emailPort,
        auth: {
          user: configurations.emailUser,
          pass: configurations.emailPassword,
        }
      });
      await EmailHandler.transporter.verify();
      console.log('Connected on email server');
    } catch (error) {
      console.log(`Error connecting to email: ${error.message}`);
    }
  }

  public async sendEmail(emailData: EmailData): Promise<void> {
    EmailHandler.transporter.sendMail({
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.content
    });
  }

}
