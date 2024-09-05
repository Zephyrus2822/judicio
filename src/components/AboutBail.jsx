import React, { useState, useEffect } from "react";
import axios from "axios";

const AboutBail = () => {
  //   const [crimes, setCrimes] = useState([]);

  //   const fetchdata = async () => {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_DEV_URL}api/crimes`
  //     );
  //     console.log(response.data);
  //     setCrimes(response.data);
  //     console.log(crimes);
  //   };
  //   useEffect(() => {
  //     fetchdata();
  //   }, []);

  const crimebtn = [
    "Offences Against Women",
    "Offenses Against Children",
    "Offenses Against Persons",
    "Offenses Against the State",
    "Offenses Against Property",
    "Offenses Relating to Marriage and Family",
  ]
  const crimes = [
    {
      rape: {
        section: "376 BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount": "Not typically applicable as bail is rarely granted.",
        "Criteria & Procedure":
          "Bail is usually denied unless exceptional circumstances are proven.",
      },
      "Sexual Harassment": {
        section: "354A BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹10,000 to ₹50,000, depending on the circumstances.",
        "Criteria & Procedure":
          "Bail is granted if the harassment is non-physical and involves lesser degrees of intimidation.",
      },
      "Assault or Use of Criminal Force to Outrage Modesty": {
        Section: "354 BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount": "Not typically applicable; bail is usually denied.",
        "Criteria & Procedure":
          "The nature of the offense often leads to bail denial, especially in serious cases.",
      },
      Voyeurism: {
        Section: "354C BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹20,000 to ₹50,000.",
        Criteria:
          "Bail is generally granted, especially if it’s a first-time offense.",
      },
      Stalking: {
        Section: "354D BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹10,000 to ₹50,000.",
        Criteria:
          "Bail is likely unless the stalking involves repeated or severe intimidation.",
      },
      "Acid Attack": {
        Section: "326A BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount":
          "Not typically applicable due to the grievous nature of the offense.",
        "Criteria & Procedure":
          "Courts are stringent in denying bail given the seriousness of the harm caused.",
      },
      "Dowry Death": {
        Section: "304B BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount": "Not typically applicable as courts usually deny bail.",
        "Criteria & Procedure":
          "Bail is almost always denied due to the seriousness and fatal outcome of the offense.",
      },
      "Cruelty by Husband or Relatives": {
        Section: "498A BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount":
          "Typically denied, but if granted, can range from ₹20,000 to ₹1,00,000 depending on the circumstances.",
        "Criteria & Procedure":
          "Bail might be granted in cases where allegations are not strongly supported by evidence.",
      },
      "Kidnapping or Abduction for Marriage": {
        Section: "366 BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount": "Not typically applicable as bail is usually denied.",
        "Criteria & Procedure":
          "Bail is generally not granted due to the serious intent behind the crime.",
      },
    },

    {
      "Child Sexual Abuse": {
        Section: ["376AB", "376DB BNS", "POCSO Act"],
        "Bail Status": "Non-bailable",
        "Bail Amount": "Not typically applicable as bail is rarely granted.",
        "Criteria & Procedure":
          "The courts are stringent in denying bail due to the vulnerability of the victim.",
      },
      "Kidnapping and Abduction of a Child": {
        Section: "363-369 BNS",
        "Bail Status": "Non-bailable (for aggravated forms)",
        "Bail Amount":
          "Not typically applicable due to the severity of the offense.",
        "Criteria & Procedure":
          "Bail is generally denied, particularly if the kidnapping involved harm or ransom.",
      },
      "Child Trafficking": {
        Section: "370 BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount": "Not typically applicable as courts usually deny bail.",
        "Criteria & Procedure":
          "Courts typically refuse bail due to the organized nature and severity of the crime.",
      },
      "Using Child for Pornography": {
        Section: "67B of the Information Technology Act",
        "Bail Status": "Non-bailable",
        "Bail Amount":
          "Not typically applicable as courts generally deny bail.",
        "Criteria & Procedure":
          "Bail is typically denied due to the severe impact on the child's dignity and welfare.",
      },
    },

    {
      Murder: {
        Section: "302 BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount": "Not applicable as bail is almost never granted.",
        "Criteria & Procedure":
          "Bail is typically denied due to the gravity of the offense. The accused remains in custody until trial or unless exceptional circumstances justify release.",
      },
      "Attempt to Murder": {
        Section: "307 BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount":
          "Typically denied; if granted, bail could be set very high (₹1,00,000 or more).",
        "Criteria & Procedure":
          "Bail is usually denied, especially if there is clear intent or grievous harm caused. Courts consider the risk of recurrence.",
      },
      "Culpable Homicide Not Amounting to Murder": {
        Section: "304 BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount":
          "Not typically applicable, but if granted, it can be substantial (₹50,000 to ₹2,00,000).",
        "Criteria & Procedure":
          "Bail may be considered depending on the circumstances leading to the death, such as provocation or lack of intent.",
      },
      "Voluntarily Causing Grievous Hurt": {
        Section: "325 BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹10,000 to ₹50,000.",
        Criteria:
          "Bail is likely if the injury was not life-threatening and there’s no risk of further harm.",
      },
      "Voluntarily Causing Hurt by Dangerous Weapons or Means": {
        Section: "324 BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount":
          "If granted, bail could range from ₹25,000 to ₹1,00,000.",
        "Criteria & Procedure":
          "Bail may be denied if the attack was premeditated or caused severe injury.",
      },
      Assault: {
        Section: "351 BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹5,000 to ₹25,000.",
        Criteria:
          "Bail is generally granted as assault is considered a less severe offense unless accompanied by aggravating factors.",
      },
      Kidnapping: {
        Section: "363 BNS",
        "Bail Status": "Non-bailable (for aggravated forms)",
        "Bail Amount":
          "If granted, bail could be set between ₹50,000 and ₹2,00,000.",
        "Criteria & Procedure":
          "Bail is typically denied if the kidnapping involved ransom, harm, or if the victim is a minor.",
      },
      "Criminal Intimidation": {
        Section: "506 BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹10,000 to ₹50,000.",
        Criteria:
          "Bail is likely if the threat did not lead to serious harm or if it’s a first-time offense.",
      },
      "Wrongful Restraint": {
        Section: "341 BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹5,000 to ₹20,000.",
        Criteria:
          "Bail is typically granted, especially if there was no physical harm.",
      },
      "Wrongful Confinement": {
        Section: "342 BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹10,000 to ₹30,000.",
        Criteria:
          "Bail is generally granted, considering the duration and conditions of confinement.",
      },
      "Causing Death by Negligence": {
        Section: "304A BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹20,000 to ₹1,00,000.",
        Criteria:
          "Bail is likely, especially in cases of accidental death without criminal intent.",
      },
      Defamation: {
        Section: "499 BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹10,000 to ₹50,000.",
        Criteria:
          "Bail is typically granted as defamation is a non-violent offense.",
      },
    },
    {
      "Waging, or Attempting to Wage War, or Abetting Waging of War Against the Government":
        {
          Section: "121 BNS",
          "Bail Status": "Non-bailable",
          "Bail Amount": "Not applicable as bail is almost never granted.",
          "Criteria & Procedure":
            "Due to the extremely serious nature of the offense, which threatens national security, bail is typically denied.",
        },
      "Conspiracy to Commit Offenses Against the State": {
        Section: "120B BNS",
        "Bail Status":
          "Non-bailable (depending on the nature of the conspiracy)",
        "Bail Amount":
          "If granted, bail could be substantial, often ₹1,00,000 or more.",
        "Criteria & Procedure":
          "Bail is generally denied, particularly if the conspiracy involves serious threats to national security or public order.",
      },
      "Collecting Arms with Intent to Wage War": {
        Section: "122 BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount":
          "Not typically applicable as courts generally deny bail.",
        "Criteria & Procedure":
          "The courts deny bail due to the direct threat to national security.",
      },
      "Assaulting President, Governor, etc., with Intent to Compel or Restrain the Exercise of Any Lawful Power":
        {
          Section: "124 BNS",
          "Bail Status": "Non-bailable",
          "Bail Amount": "Not typically applicable as bail is rarely granted.",
          "Criteria & Procedure":
            "Bail is generally denied due to the severe implications for state functionaries.",
        },
      Sedition: {
        Section: "124A BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount":
          "If granted, bail could range from ₹50,000 to ₹2,00,000.",
        "Criteria & Procedure":
          "Bail is often denied, especially if the sedition involves incitement of violence or public disorder.",
      },
      "Unlawful Activities": {
        Section: "Unlawful Activities Prevention Act - UAPA",
        "Bail Status": "Non-bailable",
        "Bail Amount":
          "Not typically applicable; if granted, it can be very high, often ₹1,00,000 or more.",
        "Criteria & Procedure":
          "Bail is difficult to obtain, especially if the accused poses a threat to national security or public safety.",
      },
      "Treason or Disloyalty to the Government": {
        Section: "125 BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount":
          "Not typically applicable due to the seriousness of the offense.",
        "Criteria & Procedure":
          "Bail is rarely granted because of the direct threat to state stability and security.",
      },
      "Promoting Enmity Between Different Groups on Grounds of Religion, Race, Place of Birth, Residence, Language, etc.":
        {
          Section: "153A BNS",
          "Bail Status": "Non-bailable",
          "Bail Amount":
            "If granted, it could range from ₹50,000 to ₹1,00,000.",
          "Criteria & Procedure":
            "Bail is generally denied if the act led to public disorder or violence.",
        },
      "Imputations, Assertions Prejudicial to National Integration": {
        Section: "153B BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount":
          "If granted, the bail amount could be substantial, ranging from ₹50,000 to ₹1,00,000.",
        "Criteria & Procedure":
          "Bail is usually denied, particularly if the actions caused significant harm to national unity.",
      },
      "Inciting Disaffection Towards the Government": {
        Section: "505 BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount":
          "If granted, bail could be set between ₹50,000 and ₹1,00,000.",
        "Criteria & Procedure":
          "Bail is generally denied if the incitement led to violence or threatened public order.",
      },
    },
    {
      Theft: {
        Section: "378 BNS",
        "Bail Status": "Bailable",
        "Bail Amount":
          "₹10,000 to ₹50,000, depending on the value of the stolen property.",
        Criteria:
          "Bail is typically granted unless the theft involved significant value or aggravated circumstances, such as a repeat offense.",
      },
      Extortion: {
        Section: "383 BNS",
        "Bail Status": "Bailable (for less severe cases)",
        "Bail Amount": "₹20,000 to ₹1,00,000, depending on the severity.",
        Criteria:
          "Bail is generally granted unless the extortion involved severe threats or significant sums.",
      },
      Robbery: {
        Section: "392 BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount":
          "If granted, bail could be set between ₹50,000 and ₹2,00,000.",
        "Criteria & Procedure":
          "Bail is generally denied due to the violent nature of the crime, especially if weapons were used.",
      },
      Dacoity: {
        Section: "395 BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount": "Not typically applicable as bail is rarely granted.",
        "Criteria & Procedure":
          "Given the organized and violent nature of dacoity, bail is usually denied.",
      },
      "Criminal Misappropriation of Property": {
        Section: "403 BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹10,000 to ₹50,000.",
        Criteria:
          "Bail is typically granted unless the misappropriation involves large sums or breach of trust.",
      },
      "Criminal Breach of Trust": {
        Section: "405 BNS",
        "Bail Status": "Bailable",
        "Bail Amount":
          "₹20,000 to ₹1,00,000, depending on the amount involved.",
        Criteria:
          "Bail is generally granted unless the breach involved significant amounts or public trust (e.g., by a public servant).",
      },
      "Receiving Stolen Property": {
        Section: "411 BNS",
        "Bail Status": "Bailable",
        "Bail Amount":
          "₹10,000 to ₹50,000, depending on the value of the property.",
        Criteria:
          "Bail is likely unless the accused is a habitual offender or the property value is high.",
      },
      Cheating: {
        Section: "415 BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹10,000 to ₹50,000, depending on the amount involved.",
        Criteria:
          "Bail is generally granted unless the cheating caused significant financial harm or involved a large number of victims.",
      },
      "House Trespass": {
        Section: "442 BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹5,000 to ₹30,000.",
        Criteria:
          "Bail is typically granted unless the trespass was accompanied by violence or threats.",
      },
      "Criminal Trespass": {
        Section: "441 BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹5,000 to ₹20,000.",
        Criteria:
          "Bail is generally granted unless the trespass involved significant harm or threat.",
      },
      Mischief: {
        Section: "425 BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹5,000 to ₹30,000.",
        Criteria:
          "Bail is typically granted unless the mischief caused significant property damage or involved public infrastructure.",
      },
      Forgery: {
        Section: "463 BNS",
        "Bail Status": "Bailable",
        "Bail Amount":
          "₹20,000 to ₹1,00,000, depending on the severity and impact of the forgery.",
        Criteria:
          "Bail is generally granted unless the forgery involved significant financial harm or affected public trust.",
      },
    },
    {
      Bigamy: {
        Section: "494 BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹10,000 to ₹50,000.",
        Criteria:
          "Bail is generally granted as it is a non-violent offense, though the accused may need to prove compliance with any prior marriage’s legal dissolution.",
      },
      Adultery: {
        Section: "497 BNS",
        "Bail Status":
          "The Supreme Court of India decriminalized adultery in 2018, so this section is no longer enforceable under the BNS.",
      },
      "Cruelty by Husband or Relatives": {
        Section: "498A BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount": "If granted, bail can range from ₹20,000 to ₹1,00,000.",
        "Criteria & Procedure":
          "Bail is typically denied unless there is a lack of strong evidence or if the allegations appear motivated by malice. Courts may also grant anticipatory bail under certain conditions.",
      },
      "Enticing or Taking Away or Detaining with Criminal Intent a Married Woman":
        {
          Section: "498 BNS",
          "Bail Status": "Bailable",
          "Bail Amount": "₹10,000 to ₹50,000.",
          Criteria:
            "Bail is generally granted as long as the act did not involve significant harm or coercion.",
        },
      "Husband or Relative of Husband Subjecting Woman to Cruelty": {
        Section: "498A BNS",
        "Bail Status": "Non-bailable",
        "Bail Amount":
          "Typically denied; if granted, it may be substantial (₹20,000 to ₹1,00,000).",
        "Criteria & Procedure":
          "Bail is usually denied unless the accused can demonstrate that the allegations are unsubstantiated or motivated by external factors.",
      },
      "Cohabitation Caused by a Man Deceitfully Inducing a Belief of Lawful Marriage":
        {
          Section: "493 BNS",
          "Bail Status": "Bailable",
          "Bail Amount": "₹20,000 to ₹50,000.",
          Criteria:
            "Bail is generally granted, but the court may require the accused to refrain from contact with the victim or take other measures to prevent further harm.",
        },
      "Desertion of Wife by Husband or Children by Parents": {
        Section: "125 BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹10,000 to ₹30,000.",
        Criteria:
          "Bail is usually granted, but the accused may be required to provide financial support to the deserted party.",
      },
      "Making False Claims of Marriage": {
        Section: "498B BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹10,000 to ₹50,000.",
        Criteria:
          "Bail is generally granted as the offense does not involve violence or severe harm.",
      },
      "Abandonment of Child Under 12 Years by Parent or Person Having Care of It":
        {
          Section: "317 BNS",
          "Bail Status": "Bailable",
          "Bail Amount": "₹10,000 to ₹50,000.",
          Criteria:
            "Bail is generally granted, especially if the abandonment was due to poverty or lack of resources, though the court may impose conditions regarding the welfare of the child.",
        },
      "Concealment of Birth by Secret Disposal of Dead Body": {
        Section: "318 BNS",
        "Bail Status": "Bailable",
        "Bail Amount": "₹10,000 to ₹50,000.",
        Criteria:
          "Bail is typically granted, especially if the offense was committed due to fear or societal pressure, but the court may require certain assurances or conditions.",
      },
    },
  ];
  console.log(crimes);

  return (
    <main className="px-20 py-10">
      <h1 className="text-center text-2xl font-bold">Criminal Offenses </h1>
      <div className="crimes">
        <div className="offenses mb-5 text-xl font-semibold">
          {crimebtn.map((crimebtnn, i) => {
            return(
            <div key={i} className="btn mb-5">
              <button>{crimebtnn}</button>;
            </div>
            )
          })}
        </div>
        {crimes.map((crime,i) => (
          <div key={i} className="table px-5 text-xl ">
            
            <div className="table px-5 text-xl ">
              <div className="col1">{crime[0]}</div>
              <div className="col2">Section :671</div>
              <div className="col3">Bail Status : Non-bailable</div>
              <div className="col4">Bail Amount : 222000</div>
              <div className="col5">
                Procedure : Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Veritatis dolorem quam soluta totam optio quo. Temporibus
                alias reiciendis maiores eius.
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AboutBail;
