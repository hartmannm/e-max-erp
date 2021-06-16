import IRoleRepository from "../../../domain/infra/database/i-role-repository";
import RoleSchema from "../../entities/schema/role-schema";
import mongoose from 'mongoose';
import Role from "../../entities/role";

export default class RoleRepository implements IRoleRepository {

  public async findById(id: string): Promise<Role> {
    const Role = mongoose.model('Role', RoleSchema);
    return Role.findById(id).exec()
      .then(role => role)
      .catch(() => null);
  }

  public async findAll(): Promise<Role[]> {
    const Role = mongoose.model('Role', RoleSchema);
    return Role.find().lean().exec().then(roles => roles as unknown as Role[]);
  }

}
