// // Temporal dead zone

// console.log(x)
// var x = 20

// var x = 10

// function foo(){
//     console.log(x)
// }

// foo()


// 2nd
// 2 q's  1. Call back queue[ex. setTimeout] 2. Micro task queue[ex. Promise]
// Things to Learn [Call back queue, Micro task queue, Call stack, Promises, Mutation Observer]

// setTimeout(() => {
//     console.log('Timeot')
// }, 0)

// Promise.resolve().then(() => console.log('Promeis'))

// console.log('End')


// async function foo(){
//     return 'Hello'
// }

// const res = foo()
// res.then(msg => console.log(msg))

// console.log([] == []) // false

// const nums = [0,1,2,3,4,5]
// const nums1 = nums.filter(ele =>  ele<3).map(i => i+5)
// console.log(nums1)

// const str = 'hai i am karthik'
// const s = str.split(' ').map(ele => ele[0].toUpperCase()+ele.slice(1)).join(' ')
// console.log(s)

// const fun = () => {

// }

// console.log(typeof fun);

function flattenCognitoUser(cognitoUser) {
    const flattenedUser = {};
    
    // To format attribute names to TitleCase
    const toTitleCase = (str) =>
        str.split('_').map((word) => (word[0].toUpperCase() + word.slice(1)) // Here I used map but we can also use regex for conversion
        ).join('');
  
    // Process UserAttributes array and extract attributes
    cognitoUser.UserAttributes.forEach((attr) => {
      const [prefix, attrName] = attr.Name.includes(':')
        ? attr.Name.split(':')
        : ['', attr.Name];
  
      // To remove prefix and transform attribute name to TitleCase
      const formattedAttrName = toTitleCase(attrName);
  
      // To handle boolean values correctly
      if (attr.Value === 'true' || attr.Value === 'false') {
        flattenedUser[formattedAttrName] = attr.Value === 'true'; // returns a boolean value 
      } else if (formattedAttrName === 'Tags') {
        // To handle comma-separated tags and convert them to an array
        flattenedUser[formattedAttrName] = attr.Value.split(',');
      } else {
        flattenedUser[formattedAttrName] = attr.Value;
      }
    });
    delete cognitoUser["UserAttributes"]
    console.log("Cognito User :", cognitoUser)
    
    const givenName = flattenedUser.GivenName || '';
    const familyName = flattenedUser.FamilyName || '';
    const email = flattenedUser.Email || '';
    
    // If full name is available Display name will be that otherwise adding given name or email as Display name
    if (familyName && givenName) {
      flattenedUser.DisplayName = `${familyName}, ${givenName}`;
    } else if (givenName) {
      flattenedUser.DisplayName = givenName;
    } else {
      flattenedUser.DisplayName = email;
    }
  
    // Do not include 'sub' in the returned object (already omitted by not assigning it)
  
    return {...flattenedUser, ...cognitoUser};
  }
  
  // Example usage:
  const cognitoUser = {
    "Username": "00d23c55-51b4-49e3-a1ba-8e9b2685ab70",
    "UserAttributes": [
      {
        "Name": "sub",
        "Value": "00d23c55-51b4-49e3-a1ba-8e9b2685ab70"
      },
      {
        "Name": "email_verified",
        "Value": "true"
      },
      {
        "Name": "email",
        "Value": "sally@example.com"
      },
      {
        "Name": "given_name",
        "Value": "Sally"
      },
      {
        "Name": "family_name",
        "Value": "Slingshot"
      },
      {
        "Name": "custom:tags",
        "Value": "hockey,basketball,baseball"
      }
    ],
    "UserCreateDate": "2021-04-13T15:50:42.802Z",
    "UserLastModifiedDate": "2021-04-13T15:50:51.671Z",
    "Enabled": true,
    "UserStatus": "CONFIRMED"
  }

  ;
  
  const flattenedUser = flattenCognitoUser(cognitoUser);
  console.log(flattenedUser);
  

