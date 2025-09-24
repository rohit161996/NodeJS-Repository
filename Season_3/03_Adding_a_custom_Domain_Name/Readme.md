# Episode 3 - Adding a custom domain name
- Now we will add a custom domain name to the application.

## Buying the Domain Name: GoDaddy
- Now we will purchase a domain name from GoDaddy.
- Buy the domain name of your choice from GoDaddy.
- Now go to the Domain Tab.

## How to set DNS Mapping for our Domain Name?
- Then go to the DNS.

## Managing the Domain Name: CloudFlare
- Now after buying the domain name the TSL/SSL certificates are also to be taken care of.
- The TSL/SSL Certificates are taken care of with the help of the platform called cloudflare.
- GoDaddy can also take care of these things but cloudflare gives free services.

## Changing the nameservers
- Now we will change the name servers in the GoDaddy Website.
- We will copy the nameservers from the Cloudflare and copy them to the GoDaddy website.
- Point the nameservers to the Cloudflare.

- If cloudflare has the named servers then the cloudflare will be managing the DNS records.
- The domain name can be given from anyone but the DNS records will be maintained by cloudflare.

## Configure the SSL Certificate
- We will go to the cloudflare portal.
- Click on the SSL/TLS tab.
- Select the Flexible Radio Button.
- It will enable the https on our website.
- The full Radio Button will set the security amongst the browser & the cloudflare and amongst 
  the cloudflare and the origin server.


## Important Points to Remember to run the Website
1. **FrontEnd Configuration**
- It will work with the help of the following command.
```cmd
    sudo systemctl start nginx
    sudo systemctl enable nginx

    sudo scp -r dist/* /var/www/html/
```

2. **Backend Configuration**
- Change the nginx configuration file with the updated IP address. 
```cmd
    Change the nginx configuration file.
    ssh -i "devTinder-secret.pem" ubuntu@ec2-54-237-201-29.compute-1.amazonaws.com

    Change the IP address in the file using the command
    sudo nano /etc/nginx/sites-available/default

    Run the command to run the backend forever
    cd devTinder-Backend
    pm2 start src/app.js --name devtinder-backend
```

3. **Database Configuration**
- Add the IP address to the whitelist.
- In the MongoDB Browser add the IP address.


