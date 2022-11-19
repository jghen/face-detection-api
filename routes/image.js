export const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      return res.json(entries[0].entries);
    })
    .catch((err) => {
      return res.status(400).json("unable to get count");
    });
};
