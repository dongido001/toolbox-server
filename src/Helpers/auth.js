import JWT from 'jsonwebtoken';

async function validate (decoded, request) {

    // var decoded = await JWT.verify(token, process.env.KEY);
    // console.log(decoded)
    console.log(decoded, request)
    // do your checks to see if the person is valid
    if (!decoded) { 
      return { isValid: false };
    }
    else {
      return { isValid: true };
    }
}

export default validate;