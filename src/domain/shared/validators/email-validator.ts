import InvalidEmailError from "../error/invalid-email-error";

export default class EmailValidator {

  private static readonly pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public static validate(email: string): void {
    if (!this.pattern.test(email)) {
      throw new InvalidEmailError();
    }
  }

}
