const prisma = require("../config/prismaClient");



class UserController {
  // index
  async index(req, res) {
    try {
      const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          password: false,
          userType: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return res.json(users);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching users." });
    }
  }

  // create a user
  async create(req, res) {
    try {
      const user = await prisma.user.create({ data: req.body });
      return res.status(201).json(user);
    } catch (error) {
      if (error.code == "P2002")
        return res.status(500).send({ message: "An email already exist." });
      return res
        .status(500)
        .json({ message: "An error occurred while creating the user." });
    }
  }

  // view a single user
  async show(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred while fetching the user." });
    }
  }

  //   update user
  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const updatedUser = await prisma.user.update({
        where: { id },
        data: req.body,
      });
      return res.json(updatedUser);
    } catch (err) {
      if (err.code == "P2002")
        return res.status(400).json({ message: "An email already exists" });
      return res
        .status(500)
        .json({ message: "An error occurred while updating the user." });
    }
  }

  //   delete users
  async remove(req, res) {
    const { id } = req.params; // Use req.params to get the ID from the URL

    try {
      // Check if the user exists before attempting to delete
      const existingUser = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Delete the user
      await prisma.user.delete({ where: { id: parseInt(id) } });

      // Return a success message or appropriate response
      return res.json({ message: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "An error occurred while deleting the user." });
    }
  }
}

module.exports = new UserController();
