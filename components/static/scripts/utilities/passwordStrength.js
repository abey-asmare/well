/**
 * this funciton will validate the password based on 
 * length, uppercase and lowercase letters, special characters and numbers.
 * it will give the strength score of 1 if the password contains atleast one uppercase, lowercase and it is 
 * exactly 8 characters long.
 * It will give extra strength score if:
 *      -> the password is more than 8 characters long (it will add the delta pass.length - 8 ) 
 *      -> the number of number litrals (it will add the amount of numbers in the password )
 *      -> the number of special characters (it will add the amount of special characters in the password)
 * 
 * besides the score, the password string has to have atleast one uppercase,lowercase and special characters
 * while maintaining atleast 8 characters long
 * 
 * so based on that analysis and score methodology the strengthScore must be atleast 5 units while 
 * passing all 'passesTest' attribute, this validation alone makes the score at medium, any failed 
 * test on 'passesTest' attribute makes our password weak and any additional effort to make the 
 * password long and or a character if that is not in alphabet makes the score strong
 * 
 * 
 */
export function checkPasswordStrength(password) {
  const strength = {
    strengthScore: 0,
    passesTest: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialcharacter: false,
    },
    keywords: ['weak', 'medium', 'strong'],
    description() {
        /**
         *  passesAll tests if all attributes in the passesTest(any test measure) passes
         */
        let passesAll = ()=>{
            for(let test in this.passesTest){
                if(!this.passesTest[test])
                    return false;
            }
            return true;
        }
      if (!passesAll()) { // if the score is less than five(any other field in our test is failed )
        return 'weak';
      } else if (passesAll() && this.strengthScore <= 5) {
        // if all of our test measure is passed(equals to 5)
        return 'medium';
      } else if(passesAll() && this.strengthScore > 6) {
        /**
         * if all of our test measure is passed(equals to 5) and there is additional effort to make sure it is more safe
         */
        return 'strong';
      }
    },
  };

  // Check password length
  if (password.length >= 8) {
    strength.strengthScore += 1;
    strength.strengthScore += password.length - 8;
    strength.passesTest.length = true;
  }

  // Check if the password has at least one lowercase letter
  if (password.match(/[a-z]/)) {
    strength.strengthScore += 1;
    strength.passesTest.lowercase = true;
  }

  // Check if the password has at least one uppercase letter
  if (password.match(/[A-Z]/)) {
    strength.strengthScore += 1;
    strength.passesTest.uppercase = true;
  }

  if (password.match(/\d/)) {
    strength.strengthScore += password.match(/\d/g).length;
    strength.passesTest.number = true;
  }

  // Check if the password has at least one special character
  if (password.match(/[^a-zA-Z\d]/)) {
    strength.strengthScore += password.match(/[^a-zA-Z\d]/g).length;
    strength.passesTest.specialcharacter = true;
  }

  return strength;
}