import Role from '../models/role';

export const createRole = async (data: {name:string; description?:string})=>{
    const role = new Role(data);
    await role.save();
    return role;
};

export const getRoles = async ()=>{
    return Role.find({});
};  
export const updateRole = async (id: string, data: { name?: string; description?: string }) => {
    return await Role.findByIdAndUpdate(id, data, { new: true });
  };
  
  export const deleteRole = async (id: string) => {
    return await Role.findByIdAndDelete(id);
  };