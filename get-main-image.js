import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: `${process.env.TABLE_PREFIX}images`,
    //FilterExpression: "isMainImage = :isMainImage",
    IndexName: "imageId",
    KeyConditionExpression: "#b = :blogId",
    ExpressionAttributeNames: {
      "#b":"blogId"
    },
    ExpressionAttributeValues: {
      ":blogId": event.pathParameters.blogId
    },
    Limit: 1,
    Select: "ALL_ATTRIBUTES"
  };

  try {
    const result = await dynamoDbLib.call("query", params);

    if (result.Item) {
      // Return the retrieved item
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: "Image not found." }));
    }
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
