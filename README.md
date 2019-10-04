# Ethereum Oauth

Ethereum oauth is the code for an oauth 2 authorization server that authorizes ethereum accounts. It is built to be able to be used with applications like Rocket Chat and Discourse. It also integrates with ENS, so users can use ens names with a reverse registry in applications.

Getting started is easy. Go to https://chat.recoblix.com to see, and to ask any questions you have.

If you want to add it to an application you moderate, register your own key at https://ethereum-oauth.net/dashboard/ .

## Application specific instructions

### Discourse
Install the oauth plugin https://github.com/jvluso/discourse-oauth2-basic

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
