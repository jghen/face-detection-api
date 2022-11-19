export const getProfile = (req, res, db) => {
  const { id } = req.params;

  db.select("*")
    .from("users")
    .where("id", id)
    .then((user) => {
      if (user.length) {
        return res.status(200).json(user[0]);
      }
      return res.status(404).json("user not found");
    })
    .catch((err) => res.status(400).json("Error getting user"));

};