import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: `${process.env.TABLE_PREFIX}categories`,
    Key: {
      categoryId: event.pathParameters.id
    },
    UpdateExpression: "SET content = :content",
    ExpressionAttributeValues: {
      ":content": data.content ? data.content : null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
