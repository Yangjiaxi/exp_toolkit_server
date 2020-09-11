export const getExpInfo = async (req, res, next) => {
  try {
    const { expID } = req.params;
    console.log(`get ${expID}`);

    res.json({ data: {}, type: "success" });
  } catch (error) {
    return next(error);
  }
};
