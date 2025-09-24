# Episode 2 - Deploying the backend application
- Now we will be deploying the backend application.

- In this we will first connect to our AWS Instance.
```cmd
    ssh -i "devTinder-secret.pem" ubuntu@ec2-54-196-145-100.compute-1.amazonaws.com
```

- We will go to the backend project in the Instance and install the dependencies.
```cmd
    npm install
```

- The password in the backend for connecting the project to the database should be protected.
- In the MongoDB, in the Network Access Tab the IP address for the AWS Instance should be mentioned.
- We should not allow all the IPs to access the Database.
- After adding our IP, the Instance or Server will be able to access the database.
- Now run the backend on the Instance.
- Now we will have to enable the port 3000 for the Backend using the Inbound rules in the security.


## How to run the backend on the Instance Server Forever?
- The backend service will stop after sometime, so will be installing the pm2 package to avoid this.

- To run the backend server on the System forever, pm2 package should be installed on the Server.
```cmd
    npm install pm2 -g
```

- To start the pm2 process we will run the command
```cmd
    pm2 start npm -- start
```

- This will run the process via the Process Manager, 24 X 7 in the background.
- Now we do not have to worry about the Backend running forever.

### How to check if the application is not running?
- We will be checking the pm2 logs and the command to check the logs is:
```cmd
    pm2 logs
```
- To clear the log use the command.
```cmd
    pm2 flush
```

- To list down all the apps
```cmd
    pm2 list
```

- To delete the app:
```cmd
    pm2 delete <app_name>
```

- To stop the app use the command:
```cmd
    pm2 stop <app_name>
```

- To give the custom name to our application
```cmd
    pm2 start npm --name "devTinder-Backend" -- start
```

## Mismatch between the IPs of the Frontend and the Backend
- Frontend = https://54.196.145.100/
- Backend = https://54.196.145.100/3000

- If we have a domain name = devTinder.com => 54.196.145.100

- Frontend = devTinder.com
- Backend = devTinder.com:7777 => devTinder.com/api

- This path of the port is mapped to the /api.

## How to map the path of 3000 to /api using the nginx?
- The request first goes to the nginx first then the api is returned.
- Nginx is also called as a load balancer, because it balances the load of the application by residing in the middle of the request and the api.
- Configuration of the nginx is accessed using the command
```cmd
    sudo nano /etc/nginx/sites-available/default
```
- Change the configuration.
- Restart the nginx using the command
```cmd
    sudo systemctl restart nginx
```

## How to uninstall nginx?
- The following commands will help in removing the nginx from the system completely.
```cmd
    sudo systemctl stop nginx
    sudo systemctl disable nginx

    sudo apt purge nginx nginx-common -y

    sudo rm -rf /etc/nginx
    sudo rm -rf /var/www/html
    sudo rm -rf /var/log/nginx
```

- Use the following configuration to map the localhost to /api
```js
    server_name 54.196.145.100;

    #Proxy all /api requests to Node app on port 3000
    location /api/ {
            proxy_pass http://localhost:3000/;

            #Optional headers (good practice)
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
    }
```

- Now in the frontend application we will have to change the URL of the application.
```js
// export const BASE_URL = "http://localhost:3000";
export const BASE_URL = "/api";
```

- Now we will push the code to github.
