# Nginx Configuration
- There is a bug in the application that refreshing the page will lead to the 404 error on the connection page.
- This is due to the reason that in the nginx configuration in the AWS instance localhost /api/ is mapped to the port 7777.
- We need to make changes in the following configuration, since the other requests goes to this loaction.
- So for the single page application we have to make this URL to /index.html.
```js
location / {
    try_files $url /index.html
}
```

- Now restart the nginx.
```cmd
sudo systemctl restart nginx
```

- Our changes will be live on website.
- In the nginx configuration we can also write the domain name instead of the IP address in the file.


