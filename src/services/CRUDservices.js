import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstname,
        lastName: data.lastname,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.role,
      });

      resolve("created user successfully");
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync("B4c0//", salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
}

let getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let User = await db.User.findOne({
        where: { id: id },
        raw: true
      })
      if (User) {
        resolve(User);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
}

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let User = await db.User.findOne({
        where: { id: data.id },
      });
      if (User) {
        User.firstName = data.firstName;
        User.lastName = data.lastName;
        User.address = data.address;
        await User.save();
        resolve();
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  })
}

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserById: getUserById,
  updateUser: updateUser,
  deleteUserById: deleteUserById,
};
