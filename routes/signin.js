import { validateEmail, validatePassword } from "../utils/checkCredentials.js";

export const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  if ( validateEmail(email) === false || validatePassword(password) === false ) {
    return res.status(400).json("unable to sign in");
  }

  db.select("email", "hash")
    .from("login")
    .where("email", email)
    .then(async (data) => {
      const { hash } = data[0];
      const passwordMatch = await bcrypt.compare(password, hash);
      if (passwordMatch) {
        db.select("*")
          .from("users")
          .where("email", email)
          .then((user) => {
            return res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        return res.status(400).json("Wrong credentials");
      }
    })
    .catch((err) => {
      return res.status(400).json("Wrong credentials");
    });
};