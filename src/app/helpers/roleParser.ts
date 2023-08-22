import { Role } from "../interfaces/storage.interface";

export function roleMatcher(value: string): Role | null{
    if(value === 'worker'){
        return Role.WORKER;
    }else if(value === 'admin'){
        return Role.ADMIN;
    }
    return null;
}