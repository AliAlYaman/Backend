exports.getProfile = async (req, res) => {
  try {
    const user = req.user; // Added by auth middleware
    res.json({
      id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};
