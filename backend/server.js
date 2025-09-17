const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Predefined users
const mockUsers = {
  "123456789013": { name: "Manish Verma", dob: "2000-05-15", phone: "1", isAADHARseeded: true, isDBTenabled: true },
  "123456789012": { name: "Rajvir Gautam", dob: "2000-05-15", phone: "8269169453", isAADHARseeded: true, isDBTenabled: true },
  "987654321098": { name: "Priya Verma", dob: "1998-12-01", phone: "9111818531", isAADHARseeded: true, isDBTenabled: false },
  "111122223333": { name: "Amit Kumar", dob: "2002-07-22", phone: "9000000000", isAADHARseeded: false, isDBTenabled: false },
};

// OTP store
let otpStore = {};

// Random names for fake users
const randomNames = ["Ananya Singh", "Rohit Mehra", "Sneha Gupta", "Karan Joshi", "Pooja Lal", "Vikram Rao", "Tanya Chauhan", "Ria Patel", "Aditya Jain", "Neha Sharma", "Sameer Roy", "Priyanka Das", "Aakash Verma", "Isha Nair", "Arjun Kapoor"];

function generateRandomAadhaar() {
  return String(Math.floor(100000000000 + Math.random() * 899999999999));
}

// Generate a fake user and **add to mockUsers immediately**
function generateRandomUser(phone) {
  const name = randomNames[Math.floor(Math.random() * randomNames.length)];
  const dob = `${Math.floor(1980 + Math.random() * 20)}-${String(Math.floor(1 + Math.random() * 12)).padStart(2,'0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2,'0')}`;
  const isAADHARseeded = Math.random() < 0.7;
  const isDBTenabled = isAADHARseeded ? Math.random() < 0.5 : false;
  const aadhaar = generateRandomAadhaar();

  const newUser = { name, dob, phone, isAADHARseeded, isDBTenabled };

  // ADD TO mockUsers so you can edit it later
  mockUsers[aadhaar] = newUser;

  return { aadhaar, ...newUser };
}

// Send OTP
app.post("/api/send-otp", (req, res) => {
  const { phone } = req.body;

  // Check if user exists
  let userEntry = Object.entries(mockUsers).find(([aadhaar, u]) => u.phone === phone);

  if (!userEntry) {
    // Create fake user
    const newUser = generateRandomUser(phone);
    userEntry = [newUser.aadhaar, newUser];
  }

  otpStore[phone] = ["0000", "1"];
  res.json({ message: "OTP sent (use 0000)" });
});

// Verify OTP
app.post("/api/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore[phone] && otpStore[phone].includes(otp)) {
    const userEntry = Object.entries(mockUsers).find(([aadhaar, u]) => u.phone === phone);
    if (userEntry) {
      const [aadhaar, userData] = userEntry;
      return res.json({ aadhaar, ...userData });
    }
  }

  res.status(400).json({ error: "Invalid OTP" });
});

// Check Aadhaar Status
app.post("/api/check-status", (req, res) => {
  const { aadhaar, loggedInAadhaar } = req.body;

  const user = mockUsers[aadhaar];
  if (!user) return res.status(404).json({ error: "Aadhaar not found" });

  const predefinedAadhaar = ["123456789012","987654321098","111122223333"];
  if (predefinedAadhaar.includes(aadhaar) && aadhaar !== loggedInAadhaar) {
    return res.status(403).json({ error: "You can only check your own Aadhaar status" });
  }

  res.json({ isAADHARseeded: user.isAADHARseeded, isDBTenabled: user.isDBTenabled });
});

const PORT = 6969;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));