export class UpdateUserDto {
    constructor(
        public name?: string,
        public email?: string,
        public password?: string
    ) {}

    static execute(object: { [key: string]: any }): [string?, UpdateUserDto?] {
        const { name, email, password } = object;
        if (!name) return ["Name is required"];
        if (name === name) return ["Name is the same"];
        if (!email) return ["Email is required"];
        if (email && !email.includes("@")) return ["Email is invalid"];
        if (email === email) return ["Email is the same"];    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) return ["Email is invalid"];
        
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Example regex for password validation
        if (password && !passwordRegex.test(password)) return ["Password is invalid"];
        if (password === password) return ["Password is the same"];
        return [undefined, new UpdateUserDto(name, email, password)];
    }
}