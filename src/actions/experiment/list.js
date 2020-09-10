export const getExpInfo = async (req, res, next) => {
  try {
    const { expID, projID } = req.body;
    console.log(`get ${expID} from ${projID}`);

    res.json({ data: {}, type: "success" });
  } catch (error) {
    return next(error);
  }
};
