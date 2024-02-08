const admin = require("firebase-admin");

class UsersService {
  //SignUp Service
  async saveUsers(req, res) {
    try {
      const data = req.body;
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error:
            'Invalid parameters. Make sure to provide "email" and "password".',
        });
      }

      const usersCollection = admin.firestore().collection("Users");

      // Check if a user with the same email already exists
      const existingUser = await usersCollection
        .where("data.email", "==", email)
        .get();

      if (!existingUser.empty) {
        return res
          .status(409)
          .json({ error: "User with this email already exists" });
      }

      await usersCollection.add({ data });
      console.log("req body", req.body);
      res.status(200).json({ message: "User Saved Successfully" });
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  //Login Service
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error:
            'Invalid parameters. Make sure to provide "email" and "password".',
        });
      }

      const usersCollection = admin.firestore().collection("Users");

      const checkUser = await usersCollection
        .where("data.email", "==", email)
        .where("data.password", "==", password)
        .get();

      if (checkUser.empty) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "Login Successful" });
      
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new UsersService();
