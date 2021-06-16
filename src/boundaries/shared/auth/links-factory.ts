import configurations from "../../../app/infra/config/configurations";

export default class LinksFactory {

  public static createChangePasswordLink(): string {
    return `http://localhost:${configurations.port}/password/password-change`;
  }

}
