import authService from "../services/auth.service.js";
import log4js from "log4js";

const logger = log4js.getLogger();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const authResult = await authService.authenticateUser(email, password);
    const userDetails = await authService.getUserDetails(authResult.AccessToken);

    const nameAttribute = userDetails.UserAttributes.find(attr => attr.Name === 'sub');
    const userId = nameAttribute ? nameAttribute.Value : '';

    res.json({
      AccessToken: authResult.AccessToken,
      RefreshToken: authResult.RefreshToken,
      UserDetails: userDetails,
      UserId: userId
    });
  } catch (error) {
    logger.error("error", error?.message);
    res.status(400).json({ error: error.message });
  }
};

const register = async (req, res) => {
    const { name,   email, address, mobileNumber, password } = req.body;
  
    try {
      const registerResult = await authService.registerUser({
        name,
        email,
        address,
        mobileNumber,
        password
      });
      res.json(registerResult);
    } catch (error) {
      logger.error("Error occurred during registration:", error?.message);
      res.status(400).json({ error: error.message });
    }
  };
  
  const authController = {
    login,
    register,
  };

export default authController;