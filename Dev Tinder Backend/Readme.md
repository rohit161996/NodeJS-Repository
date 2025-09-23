## Modifications Done
- The /signup API is modified.
- The user is saved in the database from the API.
- Then the token is created for the Signed Up user.
- 

```js

authRouter.post("/signup",
    async (req, res) => {
        try {
            /* Validating the data */
            validateSignUpData(req);

            /* Object Destructuring */
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

            const savedUser = await user.save();
            const token = await savedUser.getJWT();

            res.cookie("token", token, {
               expires: new Date(Date.now() + 8 * 360000 ),
            });

            res.json({
                message: "User Added Successfully",
                data: savedUser,
            });
        } catch (err) {
            res.status(400).send("ERROR:" + err.message);
        }
    }
);
```

- 