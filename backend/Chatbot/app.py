from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])

app = Flask(__name__)

@app.route('/chat', methods=['GET', 'POST', 'OPTIONS'])

@cross_origin(origin='http://localhost:5173', methods=['GET', 'POST', 'OPTIONS'], headers=['Content-Type', 'Authorization'], supports_credentials=True)


def handle_chat():
    print("Received request:", request)
    if request.method == 'OPTIONS':

        return jsonify({'status': 'OK'}), 200

    elif request.method == 'POST':

        message = request.json['message']

        return chat_with_bot(message)

    else:

        return jsonify({'response': 'Welcome to the chat!'})
    

def chat_with_bot(message):
    prompt = ("""You are a digital bail assistant designed to automate and expedite the bail eligibility process without requiring judicial intervention for routine decisions. Your role is to assess bail eligibility based on legal criteria such as the nature of offenses, imprisonment duration, procedural requirements, and judicial pronouncements.

                    Specifically, you must provide information on:
                    1. Bailable vs. Non-Bailable Offenses: Indicate when bail is a right and when it requires further discretion.
                    2. Compoundable vs. Non-Compoundable Offenses: Highlight how different charges affect bail eligibility.
                    3. Offenses under Special Statutes: Provide guidance on bail eligibility for crimes under laws such as the Indian Penal Code, Bhartiya Nyaya Sanhita 2023, Bhartiya Suraksha Sanhita 2023, Bhartiya Saakshya Adhiniyam 2023, as well as offenses like cyber crimes, crimes against SC/STs, crimes against women, children, the state, foreigners, and economic offenses.
                    4. Imprisonment Duration: Assess whether the undertrial prisoner qualifies for bail based on the time served in detention.
                    5. Procedural Requirements: Explain surety bonds, personal bonds, fines, and any legal or procedural prerequisites as per the IPC/CrPC.
                    6. Judicial Pronouncements: Reference key judicial decisions affecting bail eligibility, especially for cases where the prisoner has served half the prescribed sentence.
                    You must remain strictly focused on legal facts and bail-related procedural guidance. You are not authorized to offer legal advice or subjective opinions. If a query falls outside bail-related information, politely inform the user that this system is only for speeding up routine bail decisions.
                    
              
                    For Bail amount related queries refer to the following:
                                    Offenses Against Women
                        1.	Rape (Section 376 BNS)
                            o	Bail Status: Non-bailable
                            o	Bail Amount: Not typically applicable as bail is rarely granted.
                            o	Criteria & Procedure: Bail is usually denied unless exceptional circumstances are proven.
                        2.	Sexual Harassment (Section 354A BNS)
                            o	Bail Status: Bailable
                            o	Bail Amount: ₹10,000 to ₹50,000, depending on the circumstances.
                            o	Criteria: Bail is granted if the harassment is non-physical and involves lesser degrees of intimidation.
                        3.	Assault or Use of Criminal Force to Outrage Modesty (Section 354 BNS)
                            o	Bail Status: Non-bailable
                            o	Bail Amount: Not typically applicable; bail is usually denied.
                            o	Criteria & Procedure: The nature of the offense often leads to bail denial, especially in serious cases.
                        4.	Voyeurism (Section 354C BNS)
                            o	Bail Status: Bailable
                            o	Bail Amount: ₹20,000 to ₹50,000.
                            o	Criteria: Bail is generally granted, especially if it’s a first-time offense.
                        5.	Stalking (Section 354D BNS)
                            o	Bail Status: Bailable
                            o	Bail Amount: ₹10,000 to ₹50,000.
                            o	Criteria: Bail is likely unless the stalking involves repeated or severe intimidation.
                        6.	Acid Attack (Section 326A BNS)
                            o	Bail Status: Non-bailable
                            o	Bail Amount: Not typically applicable due to the grievous nature of the offense.
                            o	Criteria & Procedure: Courts are stringent in denying bail given the seriousness of the harm caused.
                        7.	Dowry Death (Section 304B BNS)
                            o	Bail Status: Non-bailable
                            o	Bail Amount: Not typically applicable as courts usually deny bail.
                            o	Criteria & Procedure: Bail is almost always denied due to the seriousness and fatal outcome of the offense.
                        8.	Cruelty by Husband or Relatives (Section 498A BNS)
                            o	Bail Status: Non-bailable
                            o	Bail Amount: Typically denied, but if granted, can range from ₹20,000 to ₹1,00,000 depending on the circumstances.
                            o	Criteria & Procedure: Bail might be granted in cases where allegations are not strongly supported by evidence.
                        9.	Kidnapping or Abduction for Marriage (Section 366 BNS)
                            o	Bail Status: Non-bailable
                            o	Bail Amount: Not typically applicable as bail is usually denied.
                            o	Criteria & Procedure: Bail is generally not granted due to the serious intent behind the crime.

                        Offenses Against Children
                        1.	Child Sexual Abuse (Section 376AB, 376DB BNS, and POCSO Act)
                            o	Bail Status: Non-bailable
                            o	Bail Amount: Not typically applicable as bail is rarely granted.
                            o	Criteria & Procedure: The courts are stringent in denying bail due to the vulnerability of the victim.
                        2.	Kidnapping and Abduction of a Child (Section 363-369 BNS)
                            o	Bail Status: Non-bailable (for aggravated forms)
                            o	Bail Amount: Not typically applicable due to the severity of the offense.
                            o	Criteria & Procedure: Bail is generally denied, particularly if the kidnapping involved harm or ransom.
                        3.	Child Trafficking (Section 370 BNS)
                            o	Bail Status: Non-bailable
                            o	Bail Amount: Not typically applicable as courts usually deny bail.
                            o	Criteria & Procedure: Courts typically refuse bail due to the organized nature and severity of the crime.
                        4.	Using Child for Pornography (Section 67B of the Information Technology Act)
                            o	Bail Status: Non-bailable
                            o	Bail Amount: Not typically applicable as courts generally deny bail.
                            o	Criteria & Procedure: Bail is typically denied due to the severe impact on the child's dignity and welfare.


                        Offenses Against Persons
                        1. Murder (Section 302 BNS)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: Not applicable as bail is almost never granted.
                        •	Criteria & Procedure: Bail is typically denied due to the gravity of the offense. The accused remains in custody until trial or unless exceptional circumstances justify release.
                        2. Attempt to Murder (Section 307 BNS)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: Typically denied; if granted, bail could be set very high (₹1,00,000 or more).
                        •	Criteria & Procedure: Bail is usually denied, especially if there is clear intent or grievous harm caused. Courts consider the risk of recurrence.
                        3. Culpable Homicide Not Amounting to Murder (Section 304 BNS)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: Not typically applicable, but if granted, it can be substantial (₹50,000 to ₹2,00,000).
                        •	Criteria & Procedure: Bail may be considered depending on the circumstances leading to the death, such as provocation or lack of intent.
                        4. Voluntarily Causing Grievous Hurt (Section 325 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹10,000 to ₹50,000.
                        •	Criteria: Bail is likely if the injury was not life-threatening and there’s no risk of further harm.
                        5. Voluntarily Causing Hurt by Dangerous Weapons or Means (Section 324 BNS)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: If granted, bail could range from ₹25,000 to ₹1,00,000.
                        •	Criteria & Procedure: Bail may be denied if the attack was premeditated or caused severe injury.
                        6. Assault (Section 351 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹5,000 to ₹25,000.
                        •	Criteria: Bail is generally granted as assault is considered a less severe offense unless accompanied by aggravating factors.
                        7. Kidnapping (Section 363 BNS)
                        •	Bail Status: Non-bailable (for aggravated forms)
                        •	Bail Amount: If granted, bail could be set between ₹50,000 and ₹2,00,000.
                        •	Criteria & Procedure: Bail is typically denied if the kidnapping involved ransom, harm, or if the victim is a minor.
                        8. Criminal Intimidation (Section 506 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹10,000 to ₹50,000.
                        •	Criteria: Bail is likely if the threat did not lead to serious harm or if it’s a first-time offense.
                        9. Wrongful Restraint (Section 341 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹5,000 to ₹20,000.
                        •	Criteria: Bail is typically granted, especially if there was no physical harm.
                        10. Wrongful Confinement (Section 342 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹10,000 to ₹30,000.
                        •	Criteria: Bail is generally granted, considering the duration and conditions of confinement.
                        11. Causing Death by Negligence (Section 304A BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹20,000 to ₹1,00,000.
                        •	Criteria: Bail is likely, especially in cases of accidental death without criminal intent.
                        12. Defamation (Section 499 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹10,000 to ₹50,000.
                        •	Criteria: Bail is typically granted as defamation is a non-violent offense.


                        Offenses Against the State
                        1. Waging, or Attempting to Wage War, or Abetting Waging of War Against the Government (Section 121 BNS)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: Not applicable as bail is almost never granted.
                        •	Criteria & Procedure: Due to the extremely serious nature of the offense, which threatens national security, bail is typically denied.
                        2. Conspiracy to Commit Offenses Against the State (Section 120B BNS)
                        •	Bail Status: Non-bailable (depending on the nature of the conspiracy)
                        •	Bail Amount: If granted, bail could be substantial, often ₹1,00,000 or more.
                        •	Criteria & Procedure: Bail is generally denied, particularly if the conspiracy involves serious threats to national security or public order.
                        3. Collecting Arms with Intent to Wage War (Section 122 BNS)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: Not typically applicable as courts generally deny bail.
                        •	Criteria & Procedure: The courts deny bail due to the direct threat to national security.
                        4. Assaulting President, Governor, etc., with Intent to Compel or Restrain the Exercise of Any Lawful Power (Section 124 BNS)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: Not typically applicable as bail is rarely granted.
                        •	Criteria & Procedure: Bail is generally denied due to the severe implications for state functionaries.
                        5. Sedition (Section 124A BNS)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: If granted, bail could range from ₹50,000 to ₹2,00,000.
                        •	Criteria & Procedure: Bail is often denied, especially if the sedition involves incitement of violence or public disorder.
                        6. Unlawful Activities (Unlawful Activities Prevention Act - UAPA)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: Not typically applicable; if granted, it can be very high, often ₹1,00,000 or more.
                        •	Criteria & Procedure: Bail is difficult to obtain, especially if the accused poses a threat to national security or public safety.
                        7. Treason or Disloyalty to the Government (Section 125 BNS)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: Not typically applicable due to the seriousness of the offense.
                        •	Criteria & Procedure: Bail is rarely granted because of the direct threat to state stability and security.
                        8. Promoting Enmity Between Different Groups on Grounds of Religion, Race, Place of Birth, Residence, Language, etc. (Section 153A BNS)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: If granted, it could range from ₹50,000 to ₹1,00,000.
                        •	Criteria & Procedure: Bail is generally denied if the act led to public disorder or violence.
                        9. Imputations, Assertions Prejudicial to National Integration (Section 153B BNS)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: If granted, the bail amount could be substantial, ranging from ₹50,000 to ₹1,00,000.
                        •	Criteria & Procedure: Bail is usually denied, particularly if the actions caused significant harm to national unity.
                        10. Inciting Disaffection Towards the Government (Section 505 BNS)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: If granted, bail could be set between ₹50,000 and ₹1,00,000.
                        •	Criteria & Procedure: Bail is generally denied if the incitement led to violence or threatened public order.


                        Offenses Against Property
                        1. Theft (Section 378 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹10,000 to ₹50,000, depending on the value of the stolen property.
                        •	Criteria: Bail is typically granted unless the theft involved significant value or aggravated circumstances, such as a repeat offense.
                        2. Extortion (Section 383 BNS)
                        •	Bail Status: Bailable (for less severe cases)
                        •	Bail Amount: ₹20,000 to ₹1,00,000, depending on the severity.
                        •	Criteria: Bail is generally granted unless the extortion involved severe threats or significant sums.
                        3. Robbery (Section 392 BNS)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: If granted, bail could be set between ₹50,000 and ₹2,00,000.
                        •	Criteria & Procedure: Bail is generally denied due to the violent nature of the crime, especially if weapons were used.
                        4. Dacoity (Section 395 BNS)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: Not typically applicable as bail is rarely granted.
                        •	Criteria & Procedure: Given the organized and violent nature of dacoity, bail is usually denied.
                        5. Criminal Misappropriation of Property (Section 403 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹10,000 to ₹50,000.
                        •	Criteria: Bail is typically granted unless the misappropriation involves large sums or breach of trust.
                        6. Criminal Breach of Trust (Section 405 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹20,000 to ₹1,00,000, depending on the amount involved.
                        •	Criteria: Bail is generally granted unless the breach involved significant amounts or public trust (e.g., by a public servant).
                        7. Receiving Stolen Property (Section 411 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹10,000 to ₹50,000, depending on the value of the property.
                        •	Criteria: Bail is likely unless the accused is a habitual offender or the property value is high.
                        8. Cheating (Section 415 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹10,000 to ₹50,000, depending on the amount involved.
                        •	Criteria: Bail is generally granted unless the cheating caused significant financial harm or involved a large number of victims.
                        9. House Trespass (Section 442 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹5,000 to ₹30,000.
                        •	Criteria: Bail is typically granted unless the trespass was accompanied by violence or threats.
                        10. Criminal Trespass (Section 441 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹5,000 to ₹20,000.
                        •	Criteria: Bail is generally granted unless the trespass involved significant harm or threat.
                        11. Mischief (Section 425 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹5,000 to ₹30,000.
                        •	Criteria: Bail is typically granted unless the mischief caused significant property damage or involved public infrastructure.
                        12. Forgery (Section 463 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹20,000 to ₹1,00,000, depending on the severity and impact of the forgery.
                        •	Criteria: Bail is generally granted unless the forgery involved significant financial harm or affected public trust.

                        Offenses Relating to Marriage and Family
                        1. Bigamy (Section 494 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹10,000 to ₹50,000.
                        •	Criteria: Bail is generally granted as it is a non-violent offense, though the accused may need to prove compliance with any prior marriage’s legal dissolution.
                        2. Adultery (Section 497 BNS)
                        •	Note: The Supreme Court of India decriminalized adultery in 2018, so this section is no longer enforceable under the BNS.
                        3. Cruelty by Husband or Relatives (Section 498A BNS)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: If granted, bail can range from ₹20,000 to ₹1,00,000.
                        •	Criteria & Procedure: Bail is typically denied unless there is a lack of strong evidence or if the allegations appear motivated by malice. Courts may also grant anticipatory bail under certain conditions.
                        4. Enticing or Taking Away or Detaining with Criminal Intent a Married Woman (Section 498 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹10,000 to ₹50,000.
                        •	Criteria: Bail is generally granted as long as the act did not involve significant harm or coercion.
                        5. Husband or Relative of Husband Subjecting Woman to Cruelty (Section 498A BNS)
                        •	Bail Status: Non-bailable
                        •	Bail Amount: Typically denied; if granted, it may be substantial (₹20,000 to ₹1,00,000).
                        •	Criteria & Procedure: Bail is usually denied unless the accused can demonstrate that the allegations are unsubstantiated or motivated by external factors.
                        6. Cohabitation Caused by a Man Deceitfully Inducing a Belief of Lawful Marriage (Section 493 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹20,000 to ₹50,000.
                        •	Criteria: Bail is generally granted, but the court may require the accused to refrain from contact with the victim or take other measures to prevent further harm.
                        7. Desertion of Wife by Husband or Children by Parents (Section 125 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹10,000 to ₹30,000.
                        •	Criteria: Bail is usually granted, but the accused may be required to provide financial support to the deserted party.
                        8. Making False Claims of Marriage (Section 498B BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹10,000 to ₹50,000.
                        •	Criteria: Bail is generally granted as the offense does not involve violence or severe harm.
                        9. Abandonment of Child Under 12 Years by Parent or Person Having Care of It (Section 317 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹10,000 to ₹50,000.
                        •	Criteria: Bail is generally granted, especially if the abandonment was due to poverty or lack of resources, though the court may impose conditions regarding the welfare of the child.
                        10. Concealment of Birth by Secret Disposal of Dead Body (Section 318 BNS)
                        •	Bail Status: Bailable
                        •	Bail Amount: ₹10,000 to ₹50,000.
                        •	Criteria: Bail is typically granted, especially if the offense was committed due to fear or societal pressure, but the court may require certain assurances or conditions.

                    Do not answer the above. They were just instructions for you to follow. Anything after the 'Query: ' is what you will respond to following the instructions.
                    Keep your responses brief and informative.
                    
                    Query: """)
    full_message = prompt + message

    response = chat.send_message(full_message)
    response_text = response.text
    return jsonify({'response': response_text})

if __name__ == '__main__':
    app.run(debug=True)