export const createProject = async (req, res, next) => {
  try {
    console.log(req.body);
    const a = {
      title: "sdfsfs",
      appendix: "sfsfdsfsfsff",
      fields: [
        {
          name: "Status",
          jsonKey: "status",
          showInProj: true,
        },
        {
          name: "NDCG@5",
          jsonKey: "ndcg_5",
          showInProj: true,
        },
        {
          name: "MDD@5",
          jsonKey: "mrr_5",
          showInProj: true,
        },
      ],
    };
    res.json({ data: { _id: "131231332132" }, type: "success" });
  } catch (error) {
    return next(error);
  }
};
