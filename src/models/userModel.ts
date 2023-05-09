import prisma from '../prisma/index';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { loginRequest, registerRequest, UpdatePassword } from '../interface/auth';
// import { Role } from '@prisma/client';

class UserModel {

    constructor() { }

    public async emailIsExist(email: string, withStatus: boolean, callback: Function): Promise<any> {
        try {
            let userData = await prisma.user.findUnique({
                where: { email }
            })
            if (userData === null) return callback(true, "AUTH0005", null);

            return callback(false, "AUTH0007", userData);

        } catch (error) {
            return callback(error, 'GEN0004', null)
        }
    }

    public async login(userData: loginRequest, callback: Function): Promise<any> {
        try {
            let userDetail = await prisma.user.findUnique({
                where: { email: userData.email },
                include :{
                    userProfile : true
                }
            });
            if (userDetail === null) {
                return callback(true, "AUTH0005", null);
            }
            const roleData = await prisma.role.findUnique({
                where: {
                    id: userDetail.roleId
                }
            })
            userDetail["roleData"] = roleData;
            userDetail = JSON.parse(JSON.stringify(userDetail));
            if (!bcrypt.compareSync(userData.password, userDetail.password)) {
                callback(true, "AUTH0006", null);
            } else {
                userDetail["password"] = null;
                return callback(false, "AUTH0007", userDetail);
            }

        } catch (error) {
            return callback(true, 'GEN0007', error);
        }
    }

    public async forgotPassword(emailID: string, callback: Function): Promise<any> {
        try {
            let userDetail = await prisma.user.findFirst({
                where: { email: emailID }
            });

            if (userDetail === null) {
                return callback(true, "AUTH0005", null);
            } else {
                userDetail = JSON.parse(JSON.stringify(userDetail))
                return callback(false, "AUTH0021", userDetail);
            }

        } catch (error) {
            return callback(true, 'GEN0007', error);
        }
    }

    public async registration(userData: registerRequest, callback: Function): Promise<any> {
        try {
            let error = true, roleId: string = '';
            const roleData: any | null = await prisma.role.findFirst({
                where: {
                    name: 'Customer'
                }
            });

            if (!roleData) {
                // create new role
                const roleInsert = await prisma.role.create({
                    data: {
                        name: 'Customer'
                    }
                })
                roleId = roleInsert.id;
            } else {
                roleId = roleData.id;
            }

            userData.password = await bcrypt.hashSync(userData.password, 10);
            userData.roleId = roleId;
            const userInsert = await prisma.user.create({
                data: userData
            })
            return callback(false);
        } catch (error) {
            return callback(true);
        }
    }

    public async updatePassword(userData: any, newPassword: string, callback: Function): Promise<any> {
        try {
            newPassword = await bcrypt.hashSync(newPassword, 10);
            let userDetailUpdated = await prisma.user.update({
                where: {
                    id: userData.userID,
                },
                data: {
                    password: newPassword,
                }
            });

            if (userDetailUpdated) {
                return callback(false, "AUTH0009", null);
            }
            return callback(true, "GEN0004", null);

        } catch (error) {
            return callback(true, "GEN0004", null)
        }
    }

    public async checkRole(user_id: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const UserRole = await prisma.user.findUnique({
                    where: {
                        id: user_id,
                    },
                    include: {
                        role: true
                    }
                })
                resolve(UserRole.role);
            } catch (error) {
                reject(error);
            }
        });
    }

    public async updateProfile(userID: string, userData: any, callback: Function): Promise<any> {
        try {
            let requiredEmail = await prisma.user.findFirst({
                select: {
                    email: true
                },
                where: {
                    id: userID
                }
            });
            let newUserData = {};
                newUserData['firstName'] = userData.firstName;
                newUserData['lastName'] = userData.lastName;
            
                await prisma.user.update({
                    where: {
                        email: requiredEmail.email
                    },
                    data: newUserData
                });
            
            let newUserProfileData = {};
                newUserProfileData['phone'] = userData.phone;
                newUserProfileData['address'] = userData.address;

                await prisma.userProfile.upsert({
                    where: {
                        userId: userID
                    },
                    update: newUserProfileData,
                    create: {
                        ...newUserProfileData,
                        user: {
                            connect: {
                                id: userID
                            }
                        },
                    }
                });

            let newProfile = await prisma.user.findUnique({
                where: { id: userID },
                include: {
                    userProfile: true
                }
            });

            return callback(false, "USER0010", newProfile);
        } catch (error){
            console.log(error)
            return callback(true, "GEN0004", error);
        }
    }

    public async updateUserAvatar( userID: string, filePath: string, callback: Function) {
        try {
            const findUser = await prisma.user.findUnique({
                where: {
                    id: userID,
                },
            });
            if (findUser != null) {
                let userProfileData = await prisma.userProfile.upsert({
                    where :{
                        userId : userID
                    },
                    update :{
                       avatar : filePath 
                    },
                    create: {
                        avatar : filePath,
                        user: {
                            connect: {
                                id: userID
                            }
                        },
                    }
                });
                let newProfile = await prisma.user.findUnique({
                    where: { id: userID },
                    include: {
                        userProfile: true
                    }
                });
                return callback(false, "USER0008", newProfile);
            } else {
                return callback(true, "USER0009", null);
            }
        } catch (error) {
            return callback(true, "GEN0004", error);
        }
    }
    
    public async getDashboardStats( callback: Function): Promise<any> {
        try {
            let statData = {};
            const ingredientData = await prisma.ingredient.count();
            statData["ingredientData"] = ingredientData;

            const ndaData = await prisma.formNda.count({
                where :{
                    NOT :{
                        status: 'accepted' 
                    }    
                }
            });
            statData["ndaData"] = ndaData;

            return callback(false, "GEN0006", statData);
        } catch (error) {
            return callback(true, "GEN0004", null);
        }
    }

    public async passwordIsExist(userData: UpdatePassword, callback: Function): Promise<any> {
		try {
			let userDetail = await prisma.user.findFirst({ 
                where: { id: userData.userId } 
            });
			if (userDetail === null) {
				return callback(true, 'VAL0004')
			}
				if (!bcrypt.compareSync(userData.password, userDetail.password)) {
					callback(true, "VAL0005");
				} else {
					callback(false, null);
				}
		} catch (error) {
			return callback(true, "GEN0004")
		}
	}

	public async changePassword(userData: UpdatePassword, callback: Function): Promise<any> {
		try {
			userData.password = await bcrypt.hashSync(userData.password, 10);
			let userDetailUpdated = await prisma.user.update({ 
				where: {
					id: userData.userId
				},
                data : {
                    password: userData.password
                } 
			});

			if (userDetailUpdated) {
				return callback(false, "AUTH0009", userDetailUpdated);
			}
			return callback(true, "GEN0007", null);

		} catch (error) {
			return callback(true, "GEN0004", null)
		}
	}

    public async getUserDetail(userID: string, callback: Function): Promise<any> {
        try {
            const userDetail = await prisma.user.findUnique({
                where: {
                    id: userID,
                },
                include: {
                    userProfile: true,
                    role: true
                }
            });
            if (!userDetail) {
                return callback(true, "USER0009", null);
            }
            return callback(false, "USER0011", userDetail);
        } catch (error) {
            return callback(true, "GEN0004", error);
        }
    }

}
export default new UserModel();