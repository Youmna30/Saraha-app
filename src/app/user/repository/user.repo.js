import User from "../model/user.model.js";

export async function updateUserByEmail( email, updatedData ) {
    return await User.findOneAndUpdate(
        { email },
        updatedData,
        { returnDocument: "after" }
    )

}