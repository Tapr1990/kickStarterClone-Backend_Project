import { checkIsValidId, sanitizeUser } from "../sanitizers/userSanitizer";
import userModel from '../models/userModel';
import { idUserSchema } from '../schema/userSchema';
import { UserType } from '../types/userType';


export async function getUsersService(): Promise<UserType[]> {
    try {
        const users = await userModel.find();
        if(!users) {
            throw new Error("No Users found");
        }
            
        return users;

    } catch (err) {
        throw new Error(`Error! users not found: ${err.message}`);
        
    }

}

export async function createUserService(user: UserType): Promise<UserType> {

    const sanitizedUser = sanitizeUser(user);

    try {
       const newUser = await userModel.create(sanitizedUser);

       if(!user) {
            throw new Error("User not created");
            
       }
       return newUser;

    } catch (err) {
        throw new Error(`Error creating user: ${err.message}`);
        
    }
}

export async function getUserService(userID: string): Promise<idUserSchema> {

    checkIsValidId(userID);

    try {
        const user = await userModel.findById(userID);

        if(!user) {
            throw new Error("User not found");
        }
        return user;
            
    } catch (err) {
        throw new Error(`Error finding user: ${err.message}`);
        
    }
}

export async function updateUserService(userID: string, userBody: UserType): Promise<idUserSchema> {

    checkIsValidId(userID);
    const sanitizedUser = sanitizeUser(userBody);
    
    try {

        const updateUser = await userModel.findByIdAndUpdate(userID, sanitizedUser, {new: true});
        
        if(!updateUser) {
            throw new Error("User not found");
        }
        return updateUser;

    } catch (err) {
        throw new Error(`User not update: ${err.message}`);
        
    }
        
}

export async function deleteUserService(userID: string): Promise<void> {

    checkIsValidId(userID);
    
    try {

        const deletedUser = await userModel.findByIdAndDelete(userID);
    
        if(!deletedUser) {
            throw new Error("User not found");
        }
        return;

    } catch (err) {
        throw new Error(`User not deleted: ${err.message}`);
        
    }
        
}
