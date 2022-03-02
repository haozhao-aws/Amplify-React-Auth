import React, { useEffect } from "react";
import "./App.css";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
// Create service client module using ES6 syntax.
import AWS from "aws-sdk";
// import { ListBucketsCommand } from "@aws-sdk/client-s3";
// import { S3Client } from "@aws-sdk/client-s3";
// import { Credentials } from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";
// Create an Amazon S3 service client object.

function App() {
  // AWS.config.update({ region: "us-west-2" });

  // // Create S3 service object
  // s3 = new AWS.S3({ apiVersion: "2006-03-01" });

  // // Call S3 to list the buckets
  // s3.listBuckets(function (err, data) {
  //   if (err) {
  //     console.log("Error", err);
  //   } else {
  //     console.log("Success", data.Buckets);
  //   }
  // });

  // use auth module to get credentials
  async function run() {
    const credentials = await Auth.currentCredentials();
    console.log("credentials: %s", credentials.accessKeyId);
    const polly = new AWS.Polly({
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken,
      region: "us-west-2",
    });
    const data = await polly.listLexicons().promise();
    return data;
  }
  useEffect(() => {
    run().then((data) => console.log("Success", data.Lexicons));
  });
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <button onClick={signOut}> sign out</button>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
// export default withAuthenticator(App);
