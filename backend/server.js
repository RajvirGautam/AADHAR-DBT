const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Mock Aadhaar-User database
const mockUsers = {
  "123456789012": {
    name: "Rahul Sharma",
    dob: "2000-05-15",
    phone: "8269169453",
    status: "linked"
  },
  "987654321098": {
    name: "Priya Verma",
    dob: "1998-12-01",
    phone: "9111818531",
    status: "dbt_enabled"
  },
  "111122223333": {
    name: "Amit Kumar",
    dob: "2002-07-22",
    phone: "9000000000",
    status: "not_linked"
  }
};

// OTP store (for demo, always 000000)
let otpStore = {};

// Send OTP
app.post("/api/send-otp", (req, res) => {
  const { phone } = req.body;

  const user = Object.values(mockUsers).find(u => u.phone === phone);

  if (!user) {
    return res.status(400).json({ error: "Phone number not linked with any Aadhaar" });
  }

  otpStore[phone] = "000000"; // Hardcoded OTP
  res.json({ message: "OTP sent (use 000000)" });
});

// Verify OTP
app.post("/api/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore[phone] && otpStore[phone] === otp) {
    const user = Object.entries(mockUsers).find(([aadhaar, u]) => u.phone === phone);
    if (user) {
      const [aadhaar, userData] = user;
      return res.json({ aadhaar, ...userData });
    }
  }

  res.status(400).json({ error: "Invalid OTP" });
});

// Aadhaar Status Check (only for logged-in Aadhaar)
app.post("/api/check-status", (req, res) => {
  const { aadhaar, loggedInAadhaar } = req.body;

  if (aadhaar !== loggedInAadhaar) {
    return res.status(403).json({ error: "You can only check your own Aadhaar status" });
  }

  const user = mockUsers[aadhaar];
  if (!user) {
    return res.status(404).json({ error: "Aadhaar not found" });
  }

  res.json({ status: user.status });
});

const PORT = 6969;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));