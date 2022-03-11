const express = require("express");
const router = express.Router();
const user = require("../controllers/userAuthentication");
const validationMiddleware = require("../middlewares/validationMiddlewares");
const middleware = require("../middlewares/authMiddleware");

// Auth Routes

// user Login
router.post("/auth/login", ...validationMiddleware.login, user.userLogin);

router.post(
  "/auth/signup",
  ...validationMiddleware.register,
  user.userRegister
);
router.post("/auth/verify/email", user.verifyEmail);

router.post("/auth/password/forget", user.forgotPassword);

router.post("/auth/password/reset", user.resetPassword);

// Enables Two Factor Authenicator through Goole Authenticator
router.post("/auth/enable2fa", middleware.auth(), user.enable2FA);

// Verifies Token generated by google authenticator app
router.post("/auth/verify2fa", user.verify2FAtoken);

// Enables or disables Two Factor Authenticator through Google authenticator
router.put(
  "/auth/update2faStatus",
  middleware.auth(),
  user.updateGoogleAuthStatus
);

// user Update Password
router.put(
  "/auth/updatePassword",
  middleware.auth(),
  ...validationMiddleware.updatePassword,
  user.updatePassword
);

// user Update Email Verification Status
router.put(
  "/auth/updateEmailVerification",
  middleware.auth(),
  user.updateEmailVerificationStatus
);

// user Update SMS Verification Status
router.put(
  "/auth/updateSMSVerification",
  middleware.auth(),
  user.updateSMSVerificationStatus
);

// user Verify SMS/Email Verification code
router.post("/auth/verifyEmailSMSVerification", user.verifySMSAndEmailCode);

router.post("/auth/verifySMSVCode", user.verifySMSCode);

// other routes

module.exports = router;
