import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { User } from "./models/user.models.js";
import bcrypt from "bcryptjs";
import { Prisoner } from "./models/Prisoner.models.js";
import { updatedPrisoner } from "./models/updatePrisoner.models.js";
import { Applications } from "./models/application.models.js";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
const port = 3000;
dotenv.config();

const saltrounds = 4;

const hashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltrounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
const verifyPassword = async (passwordentered, storedpassword) => {
  const isMatch = await bcrypt.compare(passwordentered, storedpassword);
  return isMatch;
};

const dbconn = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Mongo DB connected Successfully : ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};
dbconn();

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const hashPassword = await hashedPassword(password);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    res.json("UserCreated");
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.findOne({ username: username }).then((user) => {
      if (user) {
        
        if (verifyPassword(password, user.password)) {
          res.json({
            success: true,
        message: "Success",
        user: user
          });

        } else {
          res.json("Password Incorrect");
        }
      } else {
        res.json("Invalid Credentials");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid Password or username" });
  }
});

app.post("/api/prisonerdets", async (req, res) => {
  
  try {
    const { name, fathername, adharnum, trialdate, crime, status, witness } =
      req.body;
   

    // Prisoner.findOneAndUpdate({prisonbefore:Prisoner.prisonbefore+prisonedbefore})
    await Prisoner.findOne({ AddharNum: adharnum }).then((user) => {
      if (user) {
        return res.json("Prisoner already exists");
      } else {
        Prisoner.create({
          Name: name,
          FathersName: fathername,
          AddharNum: adharnum,
          FIRdate: trialdate,
          Crime: crime,
          Witness: witness,
          status: status,
        })
          .then(() => res.json("Added"))
          .catch((err) => res.json(err));
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Every Field is Mandatory" });
  }
});

app.post("/api/updatedpriosonerdets",(req,res)=>{
  const { name, fathername, adharnum, trialdate, crime, status, witness } =
      req.body;
      
  try {
    
      updatedPrisoner.create({Name: name,
        FathersName: fathername,
        AddharNum: adharnum,
        FIRdate: trialdate,
        Crime: crime,
        Witness: witness,
        status: status,})
        .then(()=>res.json("Prisoner updated"))
   

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Updating prionser" });
  }
})

app.get("/api/getprisonerdets", async (req, res) => {
  try {
    const prionerdetails = await Prisoner.find();
    // const stocks = await Stocks.find({ Category }).sort({ Category: 1 });

    res.json(prionerdetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
app.get('/api/getprionerdets/:adharnum',(req,res)=>{
  console.log(req.params.adharnum)
})

app.post('/api/appliedforbail',(req,res)=>{
  const {Name,
    FatherName,
    adharnum,
    adharimageurl,
    voter,
    firdate,
    crime,

    bailstatus}=req.body
    
    try {
      Applications.create({
        Name,
        FathersName:FatherName,
        AddharNum:adharnum,
        AddharImage:adharimageurl,
        ElectionId:voter,
        Firdate:firdate,
        Crime:crime,
        Status:bailstatus,
      })
      .then(()=>res.json("apllied successfully"))
    } catch (error) {
      console.error(err);
    res.status(500).json({ message: "Server Error" });
    }
})

app.get('/api/applications',async(req,res)=>{
  try {
    const applied= await Applications.find()

    res.json(applied)
    
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" });
  }
})

app.get("/api/crimes", (req, res) => {
  res.json([
    {
      id: 1,
      crime: "rape",
      Section: "376 BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount": "Not typically applicable as bail is rarely granted.",
      duration:"13",
      Criteria:
        "Bail is usually denied unless exceptional circumstances are proven.",
    },
    {
      id: 1,
      crime: "Sexual Harassment",
      Section: "354A BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹10,000 to ₹50,000, depending on the circumstances.",
      duration:"13",
      Criteria:
        "Bail is granted if the harassment is non-physical and involves lesser degrees of intimidation.",
    },
    {
      id: 1,
      crime: "Assault or Use of Criminal Force to Outrage Modesty",
      Section: "354 BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount": "Not typically applicable; bail is usually denied.",
      duration:"13",
      Criteria:
        "The nature of the offense often leads to bail denial, especially in serious cases.",
    },
    {
      id: 1,
      crime: "Voyeurism",
      Section: "354C BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹20,000 to ₹50,000.",
      duration:"13",
      Criteria:
        "Bail is generally granted, especially if it’s a first-time offense.",
    },
    {
      id: 1,
      crime: "Stalking",
      Section: "354D BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹10,000 to ₹50,000.",
      duration:"13",
      Criteria:
        "Bail is likely unless the stalking involves repeated or severe intimidation.",
    },
    {
      id: 1,
      crime: "Acid Attack",
      Section: "326A BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount":
        "Not typically applicable due to the grievous nature of the offense.",
      duration:"13",
        Criteria:
        "Courts are stringent in denying bail given the seriousness of the harm caused.",
    },
    {
      id: 1,
      crime: "Dowry Death",
      Section: "304B BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount": "Not typically applicable as courts usually deny bail.",
      duration:"13",
      Criteria:
        "Bail is almost always denied due to the seriousness and fatal outcome of the offense.",
    },
    {
      id: 1,
      crime: "Cruelty by Husband or Relatives",
      Section: "498A BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount":
        "Typically denied, but if granted, can range from ₹20,000 to ₹1,00,000 depending on the circumstances.",
      duration:"13",
        Criteria:
        "Bail might be granted in cases where allegations are not strongly supported by evidence.",
    },
    {
      id: 1,
      crime: "Kidnapping or Abduction for Marriage",
      Section: "366 BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount": "Not typically applicable as bail is usually denied.",
      duration:"13",
      Criteria:
        "Bail is generally not granted due to the serious intent behind the crime.",
    },

    {
      id: 2,
      crime: "Child Sexual Abuse",
      Section: ["376AB", "376DB BNS", "POCSO Act"],
      "Bail Status": "Non-bailable",
      "Bail Amount": "Not typically applicable as bail is rarely granted.",
      duration:"13",
      Criteria:
        "The courts are stringent in denying bail due to the vulnerability of the victim.",
    },
    {
      id: 2,
      crime: "Kidnapping and Abduction of a Child",
      Section: "363-369 BNS",
      "Bail Status": "Non-bailable (for aggravated forms)",
      "Bail Amount":
        "Not typically applicable due to the severity of the offense.",
      duration:"13",
        Criteria:
        "Bail is generally denied, particularly if the kidnapping involved harm or ransom.",
    },
    {
      id: 2,
      crime: "Child Trafficking",
      Section: "370 BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount": "Not typically applicable as courts usually deny bail.",
      duration:"13",
      Criteria:
        "Courts typically refuse bail due to the organized nature and severity of the crime.",
    },
    {
      id: 2,
      crime: "Using Child for Pornography",
      Section: "67B of the Information Technology Act",
      "Bail Status": "Non-bailable",
      "Bail Amount": "Not typically applicable as courts generally deny bail.",
      duration:"13",
      Criteria:
        "Bail is typically denied due to the severe impact on the child's dignity and welfare.",
    },

    {
      id: 3,
      crime: "Murder",
      Section: "302 BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount": "Not applicable as bail is almost never granted.",
      duration:"13",
      Criteria:
        "Bail is typically denied due to the gravity of the offense. The accused remains in custody until trial or unless exceptional circumstances justify release.",
    },
    {
      id: 3,
      crime: "Attempt to Murder",
      Section: "307 BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount":
        "Typically denied; if granted, bail could be set very high (₹1,00,000 or more).",
      duration:"13",
        Criteria:
        "Bail is usually denied, especially if there is clear intent or grievous harm caused. Courts consider the risk of recurrence.",
    },
    {
      id: 3,
      crime: "Culpable Homicide Not Amounting to Murder",
      Section: "304 BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount":
        "Not typically applicable, but if granted, it can be substantial (₹50,000 to ₹2,00,000).",
      duration:"13",
        Criteria:
        "Bail may be considered depending on the circumstances leading to the death, such as provocation or lack of intent.",
    },
    {
      id: 3,
      crime: "Voluntarily Causing Grievous Hurt",
      Section: "325 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹10,000 to ₹50,000.",
      duration:"13",
      Criteria:
        "Bail is likely if the injury was not life-threatening and there’s no risk of further harm.",
    },
    {
      id: 3,
      crime: "Voluntarily Causing Hurt by Dangerous Weapons or Means",
      Section: "324 BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount": "If granted, bail could range from ₹25,000 to ₹1,00,000.",
      duration:"13",
      Criteria:
        "Bail may be denied if the attack was premeditated or caused severe injury.",
    },
    {
      id: 3,
      crime: "Assault",
      Section: "351 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹5,000 to ₹25,000.",
      duration:"13",
      Criteria:
        "Bail is generally granted as assault is considered a less severe offense unless accompanied by aggravating factors.",
    },
    {
      id: 3,
      crime: "Kidnapping",
      Section: "363 BNS",
      "Bail Status": "Non-bailable (for aggravated forms)",
      "Bail Amount":
        "If granted, bail could be set between ₹50,000 and ₹2,00,000.",
      duration:"13",
        Criteria:
        "Bail is typically denied if the kidnapping involved ransom, harm, or if the victim is a minor.",
    },
    {
      id: 3,
      crime: "Criminal Intimidation",
      Section: "506 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹10,000 to ₹50,000.",
      duration:"13",
      Criteria:
        "Bail is likely if the threat did not lead to serious harm or if it’s a first-time offense.",
    },
    {
      id: 3,
      crime: "Wrongful Restraint",
      Section: "341 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹5,000 to ₹20,000.",
      duration:"13",
      Criteria:
        "Bail is typically granted, especially if there was no physical harm.",
    },
    {
      id: 3,
      crime: "Wrongful Confinement",
      Section: "342 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹10,000 to ₹30,000.",
      duration:"13",
      Criteria:
        "Bail is generally granted, considering the duration and conditions of confinement.",
    },
    {
      id: 3,
      crime: "Causing Death by Negligence",
      Section: "304A BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹20,000 to ₹1,00,000.",
      duration:"13",
      Criteria:
        "Bail is likely, especially in cases of accidental death without criminal intent.",
    },
    {
      id: 3,
      crime: "Defamation",
      Section: "499 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹10,000 to ₹50,000.",
      duration:"13",
      Criteria:
        "Bail is typically granted as defamation is a non-violent offense.",
    },

    {
      id: 4,
      crime:
        "Waging, or Attempting to Wage War, or Abetting Waging of War Against the Government",
      Section: "121 BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount": "Not applicable as bail is almost never granted.",
      duration:"13",
      Criteria:
        "Due to the extremely serious nature of the offense, which threatens national security, bail is typically denied.",
    },
    {
      id: 4,
      crime: "Conspiracy to Commit Offenses Against the State",
      Section: "120B BNS",
      "Bail Status": "Non-bailable (depending on the nature of the conspiracy)",
      "Bail Amount":
        "If granted, bail could be substantial, often ₹1,00,000 or more.",
      duration:"13",
        Criteria:
        "Bail is generally denied, particularly if the conspiracy involves serious threats to national security or public order.",
    },
    {
      id: 4,
      crime: "Collecting Arms with Intent to Wage War",
      Section: "122 BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount": "Not typically applicable as courts generally deny bail.",
      duration:"13",
      Criteria:
        "The courts deny bail due to the direct threat to national security.",
    },

    {
      id: 4,
      crime:
        "Assaulting President, Governor, etc., with Intent to Compel or Restrain the Exercise of Any Lawful Power",
      Section: "124 BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount": "Not typically applicable as bail is rarely granted.",
      duration:"13",
      Criteria:
        "Bail is generally denied due to the severe implications for state functionaries.",
    },
    {
      id: 4,
      crime: "Sedition",
      Section: "124A BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount": "If granted, bail could range from ₹50,000 to ₹2,00,000.",
      duration:"13",
      Criteria:
        "Bail is often denied, especially if the sedition involves incitement of violence or public disorder.",
    },
    {
      id: 4,
      crime: "Unlawful Activities",
      Section: "Unlawful Activities Prevention Act - UAPA",
      "Bail Status": "Non-bailable",
      "Bail Amount":
        "Not typically applicable; if granted, it can be very high, often ₹1,00,000 or more.",
      duration:"13",
        Criteria:
        "Bail is difficult to obtain, especially if the accused poses a threat to national security or public safety.",
    },
    {
      id: 4,
      crime: "Treason or Disloyalty to the Government",
      Section: "125 BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount":
        "Not typically applicable due to the seriousness of the offense.",
      duration:"13",
        Criteria:
        "Bail is rarely granted because of the direct threat to state stability and security.",
    },

    {
      id: 4,
      crime:
        "Promoting Enmity Between Different Groups on Grounds of Religion, Race, Place of Birth, Residence, Language, etc.",
      Section: "153A BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount": "If granted, it could range from ₹50,000 to ₹1,00,000.",
      duration:"13",
      Criteria:
        "Bail is generally denied if the act led to public disorder or violence.",
    },
    {
      id: 4,
      crime: "Imputations, Assertions Prejudicial to National Integration",
      Section: "153B BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount":
        "If granted, the bail amount could be substantial, ranging from ₹50,000 to ₹1,00,000.",
      duration:"13",
        Criteria:
        "Bail is usually denied, particularly if the actions caused significant harm to national unity.",
    },
    {
      id: 4,
      crime: "Inciting Disaffection Towards the Government",
      Section: "505 BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount":
        "If granted, bail could be set between ₹50,000 and ₹1,00,000.",
      duration:"13",
        Criteria:
        "Bail is generally denied if the incitement led to violence or threatened public order.",
    },

    {
      id: 5,
      crime: "Theft",
      Section: "378 BNS",
      "Bail Status": "Bailable",
      "Bail Amount":
        "₹10,000 to ₹50,000, depending on the value of the stolen property.",
      duration:"13",
        Criteria:
        "Bail is typically granted unless the theft involved significant value or aggravated circumstances, such as a repeat offense.",
    },
    {
      id: 5,
      crime: "Extortion",
      Section: "383 BNS",
      "Bail Status": "Bailable (for less severe cases)",
      "Bail Amount": "₹20,000 to ₹1,00,000, depending on the severity.",
      duration:"13",
      Criteria:
        "Bail is generally granted unless the extortion involved severe threats or significant sums.",
    },
    {
      id: 5,
      crime: "Robbery",
      Section: "392 BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount":
        "If granted, bail could be set between ₹50,000 and ₹2,00,000.",
      duration:"13",
        Criteria:
        "Bail is generally denied due to the violent nature of the crime, especially if weapons were used.",
    },
    {
      id: 5,
      crime: "Dacoity",
      Section: "395 BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount": "Not typically applicable as bail is rarely granted.",
      duration:"13",
      Criteria:
        "Given the organized and violent nature of dacoity, bail is usually denied.",
    },
    {
      id: 5,
      crime: "Criminal Misappropriation of Property",
      Section: "403 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹10,000 to ₹50,000.",
      duration:"13",
      Criteria:
        "Bail is typically granted unless the misappropriation involves large sums or breach of trust.",
    },
    {
      id: 5,
      crime: "Criminal Breach of Trust",
      Section: "405 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹20,000 to ₹1,00,000, depending on the amount involved.",
      duration:"13",
      Criteria:
        "Bail is generally granted unless the breach involved significant amounts or public trust (e.g., by a public servant).",
    },
    {
      id: 5,
      crime: "Receiving Stolen Property",
      Section: "411 BNS",
      "Bail Status": "Bailable",
      "Bail Amount":
        "₹10,000 to ₹50,000, depending on the value of the property.",
      duration:"13",
        Criteria:
        "Bail is likely unless the accused is a habitual offender or the property value is high.",
    },
    {
      id: 5,
      crime: "Cheating",
      Section: "415 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹10,000 to ₹50,000, depending on the amount involved.",
      duration:"13",
      Criteria:
        "Bail is generally granted unless the cheating caused significant financial harm or involved a large number of victims.",
    },
    {
      id: 5,
      crime: "House Trespass",
      Section: "442 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹5,000 to ₹30,000.",
      duration:"13",
      Criteria:
        "Bail is typically granted unless the trespass was accompanied by violence or threats.",
    },
    {
      id: 5,
      crime: "Criminal Trespass",
      Section: "441 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹5,000 to ₹20,000.",
      duration:"13",
      Criteria:
        "Bail is generally granted unless the trespass involved significant harm or threat.",
    },
    {
      id: 5,
      crime: "Mischief",
      Section: "425 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹5,000 to ₹30,000.",
      duration:"13",
      Criteria:
        "Bail is typically granted unless the mischief caused significant property damage or involved public infrastructure.",
    },
    {
      id: 5,
      crime: "Forgery",
      Section: "463 BNS",
      "Bail Status": "Bailable",
      "Bail Amount":
        "₹20,000 to ₹1,00,000, depending on the severity and impact of the forgery.",
      duration:"13",
        Criteria:
        "Bail is generally granted unless the forgery involved significant financial harm or affected public trust.",
    },

    {
      id: 6,
      crime: "Bigamy",
      Section: "494 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹10,000 to ₹50,000.",
      duration:"13",
      Criteria:
        "Bail is generally granted as it is a non-violent offense, though the accused may need to prove compliance with any prior marriage’s legal dissolution.",
    },
    {
      id: 6,
      crime: "Adultery",
      Section: "497 BNS",
      "Bail Status":
        "The Supreme Court of India decriminalized adultery in 2018, so this section is no longer enforceable under the BNS.",
    },
    {
      id: 6,
      crime: "Cruelty by Husband or Relatives",
      Section: "498A BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount": "If granted, bail can range from ₹20,000 to ₹1,00,000.",
      duration:"13",
      Criteria:
        "Bail is typically denied unless there is a lack of strong evidence or if the allegations appear motivated by malice. Courts may also grant anticipatory bail under certain conditions.",
    },

    {
      id: 6,
      crime:
        "Enticing or Taking Away or Detaining with Criminal Intent a Married Woman",
      Section: "498 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹10,000 to ₹50,000.",
      duration:"13",
      Criteria:
        "Bail is generally granted as long as the act did not involve significant harm or coercion.",
    },
    {
      id: 6,
      crime: "Husband or Relative of Husband Subjecting Woman to Cruelty",
      Section: "498A BNS",
      "Bail Status": "Non-bailable",
      "Bail Amount":
        "Typically denied; if granted, it may be substantial (₹20,000 to ₹1,00,000).",
      duration:"13",
        Criteria:
        "Bail is usually denied unless the accused can demonstrate that the allegations are unsubstantiated or motivated by external factors.",
    },

    {
      id: 6,
      crime:
        "Cohabitation Caused by a Man Deceitfully Inducing a Belief of Lawful Marriage",
      Section: "493 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹20,000 to ₹50,000.",
      duration:"13",
      Criteria:
        "Bail is generally granted, but the court may require the accused to refrain from contact with the victim or take other measures to prevent further harm.",
    },
    {
      id: 6,
      crime: "Desertion of Wife by Husband or Children by Parents",
      Section: "125 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹10,000 to ₹30,000.",
      duration:"13",
      Criteria:
        "Bail is usually granted, but the accused may be required to provide financial support to the deserted party.",
    },
    {
      id: 6,
      crime: "Making False Claims of Marriage",
      Section: "498B BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹10,000 to ₹50,000.",
      duration:"13",
      Criteria:
        "Bail is generally granted as the offense does not involve violence or severe harm.",
    },

    {
      id: 6,
      crime:
        "Abandonment of Child Under 12 Years by Parent or Person Having Care of It",
      Section: "317 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹10,000 to ₹50,000.",
      duration:"13",
      Criteria:
        "Bail is generally granted, especially if the abandonment was due to poverty or lack of resources, though the court may impose conditions regarding the welfare of the child.",
    },
    {
      id: 6,
      crime: "Concealment of Birth by Secret Disposal of Dead Body",
      Section: "318 BNS",
      "Bail Status": "Bailable",
      "Bail Amount": "₹10,000 to ₹50,000.",
      duration:"13",
      Criteria:
        "Bail is typically granted, especially if the offense was committed due to fear or societal pressure, but the court may require certain assurances or conditions.",
    },
  ]);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
