import AWS from "aws-sdk";

const sns = new AWS.SNS({
  region: "us-west-1",
});

console.log("beep", process.env.AWS_REGION);
sns
  .publish({
    Message: "Test! Test! Mic Check! 10DLC works!!!!",
    PhoneNumber: "+16096109803",
    MessageAttributes: {
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: "Transactional",
      },
    },
  })
  .promise()
  .then((result) => {
    console.log("✅ 10DLC works! BOOYACAH!!!!");
    console.log("Message ID:", result.MessageId);
  })
  .catch((err) => {
    console.error("❌ Still need to wait:", err.message);
  });
