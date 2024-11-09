import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
      httpOnly: true, // Prevent XSS attacks
      sameSite: "strict", // Prevent CSRF attacks
      secure: process.env.NODE_ENV !== "development", // Secure in production
    });

  } catch (error) {
    console.error("Error generating token and setting cookie:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
