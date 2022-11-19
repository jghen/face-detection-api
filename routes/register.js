export const handleRegister = async (req, res, db, bcrypt) => {
  const { validateEmail, validatePassword, validateName } = await import( "../utils/checkCredentials.js" );
  const { SALT_ROUNDS } = await import("../const/constants.js");
  const { email, name, password } = req.body;

  if (
    validateEmail(email) === false ||
    validateName(name) === false ||
    validatePassword(password) === false
  ) {
    return res.status(400).json("unable to register");
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);

  await db
    .transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then(async (loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0].email,
              name: name,
              joined: new Date(),
            })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch((err) => res.status(400).json("unable to register"));
};
