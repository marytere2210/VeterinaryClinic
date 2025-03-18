import { TypeUsers } from "../../../data/postgres/models/user-model";

export class FinderUser {
    async execute(userId: string) {
        const user = await TypeUsers.findOne({
            select: ["id", "name", "email", "rol"],
            where: {
                status: true,
                id: userId,
            },
        });

        if (!user) {
            return { message: "User not found" };
        }

        return user;
    }
}