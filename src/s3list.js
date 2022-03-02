// Create service client module using ES6 syntax.
import AWS from "aws-sdk";
// import { ListBucketsCommand } from "@aws-sdk/client-s3";
// import { S3Client } from "@aws-sdk/client-s3";
import { Credentials } from "@aws-amplify/core";

// Set the AWS Region.

// AWS.config.update({
//     accessKeyId: accessInfo.access_key,
//     secretAccessKey: accessInfo.secret_key,
//     region: 'us-west-2'
// });

// Create an Amazon S3 service client object.
function run() {
  const credentials = Credentials.get();
  const accessInfo = {
    secret_key: credentials.secretAccessKey,
    access_key: credentials.accessKeyId,
    session_token: credentials.sessionToken,
  };
  console.log("credentials: %s", credentials.secretAccessKey);
  const s3 = new AWS.S3({
    accessKeyId: accessInfo.access_key,
    secretAccessKey: accessInfo.secret_key,
    region: "us-west-2",
    apiVersion: "2006-03-01",
  });
  s3.listBuckets(function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });
  return "s3";
}

export default run;
