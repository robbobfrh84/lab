# DynamoDB: Native Auth
This tutorial takes us through the steps of adding a native signUp/In to your web app with AWS, as well as Read/Write DyanmoDB access & user info console.

##### AWS Parts that will be used and built in the tutorial.
- User Pool - - - - - name: SignUp
- IdentityPool - - - -name: SignUpPool
- IAM Role - - - - - -name: Cognito_SignUpPoolAuth_Role

(not completely set up)
- IAM Role - - - - - -name: Cognito_SignUpPoolUnauth_Role  

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

### Integrating Idenity Pools
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

### Adding DynamoDB Tables
- create table, name = 'whetever',
  - Primary Partition key: if i don't know i call it 'data'
  - Copy **Amazon Resource Name (ARN)**

- User the Role you used for identiyPools, it was call "Cognito_SignUpPoolAuth_Role"
- Open arrow to the left of the policty name in the table.
- Click -> [{} JSON] and click -> [edit policy].
- add `"dynamodb:*",` to "Action" array to look like such. other actions may or may not be already included.

```JSON
"Action": [
    "dynamodb:*",
    "mobileanalytics:PutEvents",
    "cognito-sync:*",
    "cognito-identity:*"
],
```

- Also, add your table's **Amazon Resource Name (ARN)** to "resource"

```JSON
"Resource": [
    "arn:aws:cognito-identity:us-west-2:13452463457:identitypool/us-west-2:1234e37-7a62-1234-asdf-adsf21341b45",
    "**Amazon Resource Name (ARN)** Here"
]
```

- In your JS code: make sure to place your roleArn in the AWS.config.... object.
- Other than that check out the code and you really just need to...

`var ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' }); console.log('ddb :', ddb)`

At this point in the code, with the dyanmoDB functions, i kinda went rouge.
- start_dynamoDB() is an example

### dynamoDB-NativeAuth-browser.html Notes

There's a strange thing I noticed about how i add var names rather than declair var names, like
- It DID NOT like ... x
```javascript
var x = 'Name'
    data: {
      x: { Keys: [ {'ID': {N: '2'}},
    }
```
- It did like ... [x]
```javascript
var x = 'Name'
    data: {
      [x]: { Keys: [ {'ID': {N: '2'}},
    }
```


SECURITY ISSUES:
- Make note of security issues on BOTH aws-where-to-next.md beyond AND bobsguide.md
- This tutorial(all) is not set for security flow.
- Manly TABLES issues
- Reality 1:
  - It requires a deeper dive into access control with mainly TABLES.
  - Issue: a valid user could console.log functions and copy paste user name to get info.
- Reality 2:
  - How much of this CAN'T be done in the browser....?
  - like, when do we need to leverage a backend.
  - BUT, can we do function-like things with basic services....???????

--------------------------------------------------------------------------------
##### Notes

v v v v v ---- WHERE I LEFT OFF ---- v v v v

- Added batch get/write to native auth.

NEXT--->
- ~~1) Continue with link below, examples for BATCH, like what is that?~~
  - ~~Clean and claify code~~

- 2) go through fine-grained access control.
  - Here's where you can try to impliment the chart you drew.
  - ***Clean and claify code***


- 3) Continue to do basic CRUD operations, like edit, remove, and all the other fun stuff you did in the movies tutorial.


- 4) impliment Google
  - Might be best to have google+ be on its own then do a 3RD code base with all three.
    - So you'll have UnAuth, NativeAuth, Google+, & Un/Native/G+/FB
    - It's alot but walking through those well will be good review and the...


- 5) Clean organize push code and your base exploratoion with AWS... WILL...BE...DONE
  - Clean and clear dead tables, IAM Roles & policies, ID Pools, User Pools, S3 Buckets,
  - Make Directory Notes in bobsguide for all aws resources, include Route 54 stuff too.


- !!!! You know what would really be helpful. Your main question now is more about structure & flow. i.e. you wanna know the things twitter/facebook do. So just look for that, weather it dynamoDB, or MongoDB, or whatever, you just wanna... well... It's user data Architecture you're talking about, then!

- CHECK links below to rebuild tab window we closed...


--------------------------------------------------------------------------------
##### Links

*** closed tabs in window ***

Google developers: https://console.developers.google.com/apis/credentials?project=test1-180721

Medium Article about FB and Google+: https://medium.com/aws-activate-startup-blog/dynamic-websites-using-the-aws-sdk-for-javascript-in-the-browser-b3dd90c25b1e

AWS resource that looks like a good review for cognito with unauthenticated and authenticated users: https://aws.amazon.com/blogs/developer/authentication-in-the-browser-with-amazon-cognito-and-public-identity-providers/

DynamoDB docs for ddb methods: http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/api-permissions-reference.html

1.) DynamoDB > Reading and Writing Items in Batch in DynamoDB: http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-table-read-write-batch.html

2.) Using IAM Policy Conditions for Fine-Grained Access Control (DynamoDB) http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/specifying-conditions.html
