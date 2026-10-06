const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const getWareHouse = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req?.query?.page, 10) || 10);

    const limit = Math.min(100, parseInt(req?.query?.limit, 10) || 20);

    const search =
      typeof req?.query?.search === "string" ? req?.query?.trim() : "";

    const filter = {};

    if (search) {
      const escapeRegx = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      filter.name = { $regex: escapeRegx, $option: "i" };
    }
  } catch (error) {
    console.log("Error in getting ware house", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json("internal server error");
  }
};
