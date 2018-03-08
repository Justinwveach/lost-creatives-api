import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: "blogs",
//    ProjectionExpression: "blogId, title, subtitle",
    IndexName: "active-index",
    KeyConditionExpression: "#active = :active",
    ExpressionAttributeNames: {
      "#active": "active"
    },
    ExpressionAttributeValues: {
      ":active": "x"
    },
    Limit: 100,
    ScanIndexForward: false
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
  };

  if (event.pathParameters.summary) {
    params.ProjectionExpression = "blogId, title, subtitle";
  }

  if (event.pathParameters.limit) {
    params.Limit = event.pathParameters.limit;
  }

  try {
    const result = await dynamoDbLib.call("query", params);
    callback(null, success(result.Items));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
