import IRole from "../../entities/i-role";

export default interface IRoleRepository {

  findById(id: string): Promise<IRole>;

  findAll(): Promise<IRole[]>

}
