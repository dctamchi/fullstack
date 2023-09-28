import bcrypt, { hash } from 'bcryptjs';
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phone,
                gender: data.gender === '1' ? true: false,
                //image: DataTypes.STRING,
                roleId: data.roleId,
                //positionId: DataTypes.STRING,
            })
            resolve('ok create a new user');
            console.log('data form service');
            console.log(data);
            console.log(hashPasswordFromBcrypt);
        } catch (e) {
            reject(e)
        }
    })
    
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            console.log(hashPassword);
            resolve(hashPassword);
        } catch (e) {
            reject(e)
       }
        
    })
}

let getAllUsers = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                //raw:true,
            });
            if (user) {
                console.log(user.toJSON());   
                resolve(user)
            } else {
                resolve({})
            }
            
        } catch (e) {
            reject(e)
        }
    })
}

let updateUser = (data) => {
    console.log(data)
    return new Promise( async(resolve, reject) => {
        try {
            await db.User.update({ firstName: data.firstName,lastName:data.lastName, address: data.address, phoneNumber: data.phone }, {
                where: {
                    email: data.email,
                },
            });
            resolve(true)
        } catch (e) {
            resolve(false)
            reject(e)
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.User.destroy({
                where: {
                    id: id
                },
            });
            
            let data = getAllUsers()
            resolve(data)
        } catch (e) {

        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById: getUserInfoById,
    updateUser: updateUser,
    deleteUser: deleteUser,
}