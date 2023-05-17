import User from "../model/user-model.js";

const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error("error while getting users");
  }
};

const getUserByEmail = async (pEmail) => {
  try {
    const user = await User.findOne({
      where: {
        email: pEmail,
      },
    });
    return user;
  } catch (error) {
    throw new Error("error while getting users");
  }
};

const createUser = async (pUser) => {
  try {
    // Check if user with provided email already exists
    const existingUser = await User.findOne({ where: { email: pUser.email } });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    // Create new user if email does not exist
    const newUser = await User.create(pUser);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteUserById = async (pUserId) => {
  return await User.destroy({
    where: {
      id: pUserId,
    },
  });
};

const updatedUsers = async (users) => {
  try {
    const result = await User.bulkCreate(users, {
      updateOnDuplicate: ["role"],
    });
    console.log(result); // Prints the updated rows
  } catch (error) {
    console.error(error);
  }
};

export default {
  getUsers,
  createUser,
  deleteUserById,
  getUserByEmail,
  updatedUsers,
};
