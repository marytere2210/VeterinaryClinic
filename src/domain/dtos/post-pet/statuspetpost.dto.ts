export class StatusPetPostDto {
    constructor(
      public readonly status: "pending" | "approved" | "delivered" = "pending",
     
    ) {}
  
    static execute(object: { [key: string]: any }): [string?, StatusPetPostDto?] {
      const { status } = object;
  
      if (!status) return ["status required"];
      return [undefined, new StatusPetPostDto(status)];
    }
  }
  