interface loginRequest {
    email: string,
    password: string,
}

interface registerRequest {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    roleId: string
}

interface UpdatePassword{
    userId: string,
    password: string
}

export { loginRequest, registerRequest, UpdatePassword };
