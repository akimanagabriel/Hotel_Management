const { validationResult } = require("express-validator");
const prisma = require("../../config/prismaClient");
const jwt = require("jsonwebtoken");

class AuthController {
  //login
  async login(req, res) {
    try {
      // Validate request body (e.g., email and password)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find the user by email
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: "Invalid user email" });
      }

      // Compare the provided password with the hashed password from the database
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid user password" });
      }

      // Generate a JWT token
      const { password: hiddenPassword, ...authUser } = user;
      const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return res.json({ user: authUser, token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = new AuthController();
