# Ethereum Oauth

Ethereum oauth is the code for an oauth 2 authorization server that authorizes ethereum accounts. It is built to be able to be used with applications like Rocket Chat and discourse.


## Setup the Authorization Server:

You can run your own instance of the authentication server or use mine. To use mine, contact me at jvluso@recoblix.com to add your client. To set up your own, you will need a server and a domain name:

clone the repository and install the dependencies
```
git clone https://github.com/Recoblix/ethereum-oauth.git
cd ethereum-oauth
npm i
```
Setup ssl. I recommend using Certbot and Let's Encrypt. Follow the instructions at https://medium.com/@yash.kulshrestha/using-lets-encrypt-with-express-e069c7abe625 .

Run your own ethereum node using geth or parity. 

Check the settings. Use your own node that you set up, point the https settings at the correct files, and permit the clients you want to permit. Eventually there will be a way to use a longer term database than the in-memory one. Finally start the server with `npm start`.

## Setup the application

### Discourse
Install the oauth plugin https://github.com/discourse/discourse-oauth2-basic

Instructions for installing Discourse plugins is at https://meta.discourse.org/t/install-plugins-in-discourse/19157

Enable oauth in admin/settings/login using the following settings:
```
oauth2 client id : <client id>
oauth 2 client secret : <client secret>
oauth2 authorize url : https://ethereum-oauth.net/dialog/authorize
oauth2 token url : https://ethereum-oauth.net/oauth/token
oauth2 user json url : https://ethereum-oauth.net/api/userinfo
oauth2 json user id path : user_id
oauth2 json username path : name
oauth2 json name path : name
oauth2 scope : openid
```
The callbackUrl for the client in the ethereum-oauth settings will be `<Discourse url>/auth/oauth2_basic/callback`

### Rocket Chat
Add a new custom oauth provider in the oauth settings in the administration tab (not the oauth apps settings). Use the following settings:
```
URL : https://ethereum-oauth.net
Token Path : /oauth/token
Token Sent Via : Payload
Identity Path : /api/userinfo
Authorize Path : /dialog/authorize
Scope : openid
Id : <client id>
Secret : <client secret>
Login Style : Popup
Username field : user_id
```
