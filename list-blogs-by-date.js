import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {

  const params = {
    TableName: `${process.env.TABLE_PREFIX}blogs`,
    ProjectionExpression: "blogId, title, subtitle",
    IndexName: "active-createdAt-index",
    KeyConditionExpression: "#active = :active",
    ExpressionAttributeNames: {
      "#active": "active",
      "#year": "year"
    },
    ExpressionAttributeValues: {
      ":active": "x",
      ":year": event.pathParameters.year
    },
    Limit: 100,
    ScanIndexForward: false
  };

  if (event.pathParameters.month) {
    params.FilterExpression = "#year = :year and #month = :month";
    params.ExpressionAttributeValues[":month"] = event.pathParameters.month,
    params.ExpressionAttributeNames["#month"] = "month"
  } else {
    params.FilterExpression = "#year = :year"
  }

  try {
    const result = await dynamoDbLib.call("query", params);
    callback(null, success(result.Items));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
