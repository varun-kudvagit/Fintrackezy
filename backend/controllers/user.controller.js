import HTTPSTATUS from "../constants/http.constant.js";
import getUserByIdService from "../services/user.service.js";

const getUserInfoController = async (req, res, next) => {
  try {
    let user = await getUserByIdService(req.user.id);
    return res.status(HTTPSTATUS.OK).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};
export default getUserInfoController;
