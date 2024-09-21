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
        // skipping sub
        if(formattedAttrName !== 'Sub'){
            flattenedUser[formattedAttrName] = attr.Value;
        }
      }
    });

    delete cognitoUser["UserAttributes"] // deleting old User Attributes from User
    
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
  
    // returning the final object in the desired form
    return JSON.stringify({...flattenedUser, ...cognitoUser},null,3);
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
  

