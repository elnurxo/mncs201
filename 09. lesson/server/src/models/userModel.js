let users = [
  {
    id: 1,
    username: "john_doe123",
    password: "John123", // In production, store hashed passwords instead
    email: "john@gmail.com",
    role: "Admin",
    isLoggedIn: false,
  },
  {
    id: 2,
    username: "jack_adams",
    password: "Jack123",
    email: "jack@gmail.com",
    role: "User",
    isLoggedIn: false,
  },
];

module.exports = {
  getAllUsers: () => users,

  getUserById: (id) => users.find((user) => user.id === id),

  register: (user) => {
    const lastId = users.length ? users[users.length - 1].id : 0;
    const newUser = { id: lastId + 1, isLoggedIn: false, ...user };
    users.push(newUser);
    return newUser;
  },

  updateUser: (id, updatedUser) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      return users[index];
    }
    return null;
  },

  deleteUser: (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      return users.splice(index, 1)[0]; // Return the deleted user
    }
    return null;
  },

  login: (username) => {
    const user = users.find((user) => user.username === username);
    if (user) {
      user.isLoggedIn = true;
      return { message: "Login successful", user };
    }
    return { message: "Invalid username or password" };
  },

  logout: (id) => {
    const user = users.find((user) => user.id === id);
    if (user && user.isLoggedIn) {
      user.isLoggedIn = false;
      return { message: "Logout successful" };
    }
    return { message: "User not logged in or does not exist" };
  },
};
