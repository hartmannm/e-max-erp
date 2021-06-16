export default interface CreateUserInput {

  id?: string;
  cpf: string;
  name: string;
  email: string;
  roleId: string;
  phone: string;
  companyId: string;
  emailLink?: string;

}
