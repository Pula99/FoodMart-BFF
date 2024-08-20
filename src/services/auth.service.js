import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand, GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import log4js from "log4js";

const logger = log4js.getLogger();

const client = new CognitoIdentityProviderClient({  region: "ap-south-1" }); 

const authenticateUser = async (email, password) => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: '7ephd0rjhc3m1ggmj6bh9e6b5e', 
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const response = await client.send(command);
    const { AccessToken, IdToken, RefreshToken } = response.AuthenticationResult;

    return {
      AccessToken,
      IdToken,
      RefreshToken,
    };

  } catch (error) {
    logger.error("Error occurred during authentication:", error);
    throw new Error(error.message);
  }
};

const getUserDetails = async (accessToken) => {
  const params = {
    AccessToken: accessToken,
  };

  try {
    const command = new GetUserCommand(params);
    const response = await client.send(command);
    logger.info("User details retrieved successfully");
    return response;
  } catch (error) {
    logger.error("Error occurred while getting user details:", error);
    throw new Error(error.message);
  }
};

const registerUser = async (userData) => {
    const { email, password, name,  address, mobileNumber } = userData;
    
    const params = {
      ClientId: '7ephd0rjhc3m1ggmj6bh9e6b5e',
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'name', Value: name },
        { Name: 'address', Value: address },
        { Name: 'phone_number', Value: mobileNumber },
      ],
    };
  
    try {
      const command = new SignUpCommand(params);
      const response = await client.send(command);
      return response;
    } catch (error) {
      logger.error("Error occurred during user registration:", error);
      throw new Error(error.message);
    }
  };
  

const authService = {
  authenticateUser,
  registerUser,
  getUserDetails
};

export default authService;
