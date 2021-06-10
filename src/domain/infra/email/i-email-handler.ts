import EmailData from "./email-data";

export default interface IEmailHandler {

  connectToServer(): Promise<void>;

  sendEmail(emailData: EmailData): Promise<void>;

}
