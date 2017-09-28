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
  - Helps so you don't have to fetch conferm codes from emails
  - could also make it so you ONLY can confirm on your end. admin style.

##### Custom attributes
Create Custom attributes for user's in User pool by...
- going to "Attributes" in side nav.
- scroll to bottom and click -> "Add another attribute"
  - NOTE: after creating the attribute it'll have it's name with a prefix of custom:, so it'll be like (custom:new)
- ALSO, you must go to "App clients" in the side nav. Click -> "add another app client", the click -> "Set attribute read and write permissions"
- Now, tobble you're custom attributes here.
- in the html file, I called the function updateAttributes()

*Note: MFA = Multi-factor Authentication*

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

Integrating Idenity Pools
- go to > Services (top nav) > Cognito and click -> [ Manage Federated Idenities ]
- click -> [ Create new Identity pool ]
- name it whatever *NewApp1*
- Open > v "Authenticated providers"
- Open Cognito Tab
- Add **User Pool ID** and **App client id** they you obtained from your user pool previously.
- Click -> [ Create Pool ]
- Open > v "View Details"
  - Under Authenticated "Role Summary", open > v "View Policy Document"
  - In the cody: Scroll down to "Resources": [ " * " ]
  - To get your arn for THIS identity pool, got to services > cognito > Manage Federated Identities
    - NOW, click your newly made pool, and click -> "Edit identity pool" in the upper right, below the top nav.
    - Find "Identity pool ID" and clikc -> (Show ARN) to the right. COPY COMPLETE **Identity Pool ARN**
  - Replace " * " With **Identity Pool ARN**
- Click -> "Allow"
- NOW, you can view the authenticateIdentityPool() in the .html to see how we added the **Identity Pool ARN** and the **User Pool ID** and **region** to the function.



v v v v v ---- WHERE I LEFT OFF ---- v v v v
- Finally got unstuck by the sign out/ back in issue with identity Pools
- SO NOW, i can move onto plugging tables in.
  - first stab, create a table and try to add it into the Role you've made as a reference and add db actions.
  - probably worth checking out how i did it with
      - FB
      - ... and UnAuth
  - Or, consider just finding the natural flow of the aws docs. you're kind of at a clean slate point and might be goot to review they're next steps.



##### AWS Parts
- User Pool - - - - - name: SignUp
- IdentityPool - - - -name: SignUpPool
- IAM Role - - - - - -name: Cognito_SignUpPoolAuth_Role

(not completely set up)
- IAM Role - - - - - -name: Cognito_SignUpPoolUnauth_Role  



--------------------------------------------------------------------------------

##### Notes

##### Links
