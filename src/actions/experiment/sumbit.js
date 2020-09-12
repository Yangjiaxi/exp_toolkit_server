export const registerExp = async (req, res, next) => {
  try {
    const { projID } = req.params;
    console.log(projID);

    const _id = "13212313123";

    res.json({ data: { _id }, type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const sumbitExpData = async (req, res, next) => {
  try {
    console.log(req.body);

    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};
