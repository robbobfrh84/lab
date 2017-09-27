# DynamoDB: Native Auth
This tutorial takes use through the steps of adding a native signUp/In to your web app with AWS, as well as Read/Write DyanmoDB access & user info console.

### Add Cognito files to code base
create a folder (I called it /references).
& Copy and paste files content withe same name from github...
- references/aws-cognito-sdk.min.js = https://github.com/aws/amazon-cognito-identity-js/blob/master/dist/aws-cognito-sdk.min.js
- references/amazon-cognito-identity.min.js https://github.com/aws/amazon-cognito-identity-js/blob/master/dist/amazon-cognito-identity.min.js

Include in .html file as
```html
<script src="references/aws-cognito-sdk.min.js"></script>
<script src="references/amazon-cognito-identity.min.js"></script>
<script src="https://sdk.amazonaws.com/js/aws-sdk-2.100.0.min.js"></script>
```

### building a new User pool
Basic steps to follow for creating a user pool for native users to your app.
- sign into aws and go to cognito.
  - I actually had to search for it, but it's under [Mobile Services], but it's for web browsers as well.
  - click -> [ Manage your User Pools ]
  - click -> [ Create a user pool ]
  - call it whatever you want, not a big deal
  - click -> [ Review defaults ]
    - Here's where you can fine-tune a lot of features/varables you may want from you users when they sign up.
    - ... if you want. click -> * edit arrow * in the password box and UNcheck all the required password stuff
      - Just makes it easier to test when developing. So then click -> [ Save Changes ]
    - ALSO, toggle "User can sign up with verified email"
      - They still need to put a username, but can change/retrieve password with just email! I prefer it like this.
  - In the side nav, click "App Clients" and "Add an app client"
    - Pick an App client Name name... whatever
    - UNclick "Generate client secret"
    - click "Set attribute read and write permissions"
      - NOTE: new users don't need all this (only the darked out check boxes, should just be email)
      - It's just created in the object to add/edit later.
      - SO just leave it all as is for now...
    - Click -> [ Create App client ]
  - click -> [ Create Pool ]
  - NOTE: **App client id**, You'll need this in your JS code
  - go to "Pool details", in the side nav
    - NOTE: **Pool Id**, You'll need this in your JS code
  - go to "Users and groups", in the side nav, here's where we'll soon populate users! :-)
- As you add users, you'll see you can click their Usernames and Auto-confirm
  - could also make it so you ONLY can confirm on your end. admin style.

* Note: MFA = Multi-factor Authentication

### dynamoDB-NativeAuth-browser.html
Went Step by step through: http://docs.aws.amazon.com/cognito/latest/developerguide/tutorial-integrating-user-pools-javascript.html
And: https://github.com/aws/amazon-cognito-identity-js/
*Note: DON'T have to http-server*

Make sure and copy past *YOUR SPECIFIC* **App client id** and **Pool ID** When declaring dataPool object
```javascript
var poolData = {
  UserPoolId : 'us-west-2_lIwEq7e6O', // Your user pool id here
  ClientId : '5pnntp748hi65035ijm4nl7q4f' // Your client id here
}
```
### Adding DynamoDB Tables






















--------------------------------------------------------------------------------
##### Notes

##### Links
