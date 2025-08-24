# Authentication
- We will now store the password as encrypted in the database.

## Validation of the /signup
- /signup API will be improved in this Episode
1. The validation of the data should be done firstly in the /signup.
2. For the validation of the data a directory is created utils/.
3. In this a validation.js is created.

```js
const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not Valid!");
    }
    else if(firstName.length < 4 || firstName.length > 50){
        throw new Error("FirstName should be 4-50 characters");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not Valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not Valid");
    }
}

module.exports = {
    validateSignUpData,
}
```

```js
app.post("/signup",
    async (req, res) => {
        try {
            /* Validating the data */
            validateSignUpData(req);

            /* Encrypting the Password */
            const userObj = req.body;
            const user = new User(userObj);
            await user.save();
            res.send("User Added Successfully");
        } catch (err) {
            res.status(400).send("ERROR:" + err.message);
        }
    }
);
```

## Encryption of the password:
- The bcrypt library is used to encrypt the password and store the password in the database.
- https://www.npmjs.com/package/bcrypt
- npm install bcrypt

```js
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const myPlaintextPassword = 's0/\/\P4$$w0rD';
    const someOtherPlaintextPassword = 'not_bacon';
```

- The encryption level of the password is dependent on the saltRounds.
- If the number of saltRounds are more, the complexity of the password encryption increases.

### How the encryption works?
- For a password i.e. Rohit@123, we will have to define or generate a salt string.
- The salt is a random string -> "sdbashasjka21jn@NJK@NJjnskjc"
- If we do 10 saltRounds of the password with the salt string, we will get a decent strong password.
- 100 saltRounds will generate a stronger password but will take time to generate the password or encrypt the password and the decryption will also take time, so comparision will take time.

```js
    /* Encrypting the Password with 10 saltRounds the function should be await */
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
```

- We can generate the salt string using the bcrypt library code as well.
- The password will not be able to get converted in the plain text.
 
```js
app.post("/signup",
    async (req, res) => {
        try {
            /* Validating the data */
            validateSignUpData(req);

            const { firstName, lastName, emailId, password } = req.body;

            /* Encrypting the Password */
            const passwordHash = await bcrypt.hash(password, 10);
            console.log(passwordHash);

            const user = new User({
                firstName,
                lastName,
                emailId,
                password: passwordHash,
            });

            await user.save();
            res.send("User Added Successfully");
        } catch (err) {
            res.status(400).send("ERROR:" + err.message);
        }
    }
);
```

## API for the validation of the Credentials - /login API:
- The login API will check that the emailId and password are valid or not.
```js
app.post("/login",
    async (req, res) => {
        try {
            const { emailId, password } = req.body;

            /* 1. Check the email Id is valid or not? */
            const user = await User.findOne({ emailId: emailId });
            if (!user) {
                throw new Error("User with the Email id is not present in the Database");
            }

            /* 2. Check that the password is valid or not  */
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error("Password is not valid");
            }
            else{
                res.send("User Login Successfully");
            }

        } catch (err) {
            res.status(400).send("ERROR: " + err.message);
        }
    }
);
```
- Do not give specific details in the error messages.
