export declare class SignUpDto {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
}
export declare class SignInDto {
    email: string;
    password: string;
}
export interface UserResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    token?: string | undefined;
}
export declare function createUserResponse(user: any): UserResponse;
