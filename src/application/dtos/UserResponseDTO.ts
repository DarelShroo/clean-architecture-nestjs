export class UserResponseDTO {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromDomain(user: any): UserResponseDTO {
    return new UserResponseDTO(
      user.id,
      user.name,
      user.email, // user.email is a getter that returns string
      user.isActive,
      user.createdAt,
      user.updatedAt,
    );
  }
}
