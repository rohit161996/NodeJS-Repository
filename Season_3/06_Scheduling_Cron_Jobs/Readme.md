# Episode 6 - Scheduling Cron Jobs - Schedule Tasks
- We will send an email every morning at 8 a.m. who have received a friend request in the last day.
- To run the code after certain interval or schedule a job after a certain time cron job is used.

## Package Installation:
- We will be requiring a package named `node-cron`.
- Installation of the package
```cmd
    npm install node-cron
```
- The documentation of this package tells a lot about scheduling a cron job.

## File creation to write code
- We will write the cronjob in the backend code.
- Create a file named `utils/cronjob.js`
```js
    /* import the package using the require() */
    const cron = require("node-cron");

    /* Use the schedule API of the cron package to schedul the cron job */
    cron.schedule("* * * *", () => {
        console.log("Hello World" + new Date());
    });
```

## Loading the required file
- Load the cronjob in the project as soon as the project loads, so we will write the following statement in the `app.js` file.
```js
    require("./utils/cronjob");
```
- The callback function passed in the `cron.schedule()` will run every second, since the first argument passed is `* * * *...`.
- * means the job will run every second, minute, etc.
- To know what to pass in the argument to run a job at every 8 a.m. in the morning get the data from the `https://crontab.guru/` or use Chat GPT.

## Manage the cron job's date
- We can manage the date using some complex javascript or we can use a cute package.
- To manage the `Date` use the package `date-fns` package, it is a very light weight package to be used.
- Earlier the `moment.js` package was used for the `Date` functionality, it is a very heavy package.

- Install the package using the following command: 
```cmd
    npm install date-fns
```

## Sending the email
- Now with the help of the time stamp run a fetch query and get all the pending requests.
- Send the emails to the user with the help of the `sendEmail()` created in the `sendEmail.js` file.
- To send the emails to the people not listed in the sandbox, request for the production access in the Amazon SES.

```js
const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequestModel = require("../models/connectionRequest");
const sendEmail = require("./sendEmail");

cron.schedule("29 8 * * *", async () => {
    /* Send Email to all people who got a request the previous day. */
    try {
        /* subDays will get us the yesterday's date
         * startOfDay, endOfDay will get us the start and end of day with the help of yesterday's date
        */
        const yesterday = subDays(new Date(), 1);
        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday);

        /* Finding the pending requests with the help of filtering the date using the createdAt */
        const pendingRequest = await ConnectionRequestModel.find({
            status: "interested",
            createdAt: {
                $gte: yesterdayStart,
                $lt: yesterdayEnd,
            },
        }).populate("fromUserId toUserId");

        /* We will get the emailId with the help of the map and get 
           them in the set to get the unique ids, then convert the 
           email ids in the array using the spread operator
        */
        const listOfEmails = [...new Set(pendingRequest.map((req => req.toUserId.emailId)))];

        console.log(listOfEmails);

        for (email of listOfEmails) {
            /* Send the emails */
            try {
                const res = await sendEmail("New Friend Requests pending for " + toEmailId, "There are so many requests pending, please login to devTinder.in and accept or reject the requests").run();

                console.log(res);
            }
            catch (err) {
                console.log("ERROR:", err.message);
            }
        }

        if (listOfEmails.length === 0) {
            const res = await sendEmail("New Friend Requests pending, There are so many requests pending, please login to devTinder.in and accept or reject the requests").run();
            console.log(res);
        }

    } catch (err) {
        console.log("ERROR MESSAGE: " + err);
    }
});
```

- This for each loop is not a good way to send emails in a large scale application.
- It will run continously for lakhs of users.
- It works fine for 100s of users but not 100000s of users.

## For Lagre Scale Application:
- Queuing the requests, the bulk requests can be queued in the NodeJS process and can be send in batches.
- Sometimes the query can also take huge amount of time, so the query has to be paginated to scale the application.

## Packages to queue the requests:
- There is a package named `bee queue` which can be used in the Backend Application to queue the email ids and send the emails in batches.
- It does not block the backend code.

## Simpler way to send the emails:
- Hand over the emails to the Amazon SES it will handle the bulk requests.


- The sendEmail function can also be made dynamic.
