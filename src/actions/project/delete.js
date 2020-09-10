export const moveToTrash = async (req, res, next) => {
  try {
    const { projID } = req.params;
    console.log(`delete ${projID}`);

    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};
