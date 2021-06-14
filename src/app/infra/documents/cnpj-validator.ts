import ICnpjValidator from "../../../domain/infra/documents/i-cnpj-validator";
import { validate } from 'cnpj';

export default class CnpjValidator implements ICnpjValidator {

  public isCnpjValid(cnpj: string): boolean {
    return validate(cnpj);
  }


}
