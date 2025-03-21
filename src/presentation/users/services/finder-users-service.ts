import { TypeUsers } from "../../../data/postgres/models/user-model";

export class FinderUsers {
    async execute(userId: string) {
        const users = await TypeUsers.findOne({
            select: ["id", "name", "email", "rol"],
            where: {
                status: true,
                id: userId,
            },
        });

        if (!users) {
            return { message: "User not found" };
        }

        return users;
    }
}