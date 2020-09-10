export const sumbitExpData = async (req, res, next) => {
  try {
    console.log(req.body);

    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};
