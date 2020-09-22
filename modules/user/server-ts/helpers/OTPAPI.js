var https = require('https');

function generateOTP() {
  // Declare a digits variable
  // which stores all digits
  var digits = '1234567891';
  let OTP = '';
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

export default mobile => {
  return new Promise(function(resolve, reject) {
    // To Do Move paramaters to settings
    var template = '727';
    var authkey = '266332AB38K4I6l55c80fe19';
    var sender = 'HMOVEN';
    var otp = generateOTP();
    var path = `/api/sendotp.php?template=${template}&authkey=${authkey}&sender=${sender}&mobile=${mobile}&otp=${otp}&otp_expiry=6&email=`;

    var options = {
      method: 'POST',
      hostname: 'control.msg91.com',
      port: null,
      path: path,
      headers: {}
    };

    var req = https.request(options, function(res) {
      var chunks = [];

      res.on('data', function(chunk) {
        chunks.push(chunk);
      });

      res.on('end', function() {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        resolve(otp);
      });

      res.on('error', function(error) {
        console.error(error);
        reject(error);
      });
    });

    req.end();

    resolve(otp);
  });
};
