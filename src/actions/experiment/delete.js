export const deleteExpRow = async (req, res, next) => {
  try {
    const { expID } = req.body;
    console.log(`delete ${expID}`);

    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};
