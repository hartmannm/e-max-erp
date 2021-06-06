import ICrypto from "../../../domain/infra/auth/i-crypto";
import * as bcrypt from "bcrypt";

export default class Crypto implements ICrypto {

  public encrypt(content: string): Promise<string> {
    return bcrypt.hash(content, bcrypt.genSaltSync());
  }

  public compare(encrypetdContent: string, contentToCompare: string): Promise<boolean> {
    return bcrypt.compare(contentToCompare, encrypetdContent);
  }

}
