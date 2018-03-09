import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: `${process.env.TABLE_PREFIX}blogs`,
    Key: {
      blogId: event.pathParameters.id
    },
    UpdateExpression: "SET title = :title, subtitle = :subtitle, content = :content, category = :category, city = :city, #state = :state, country = :country, latitude = :latitude, longitude = :longitude",
    ExpressionAttributeValues: {
      ":title": data.title ? data.title : null,
      ":subtitle": data.subtitle ? data.subtitle : null,
      ":content": data.content ? data.content : null,
      ":category": data.category ? data.category : null,
      ":city": data.city ? data.city : null,
      ":state": data.state ? data.state : null,
      ":country": data.country ? data.country : null,
      ":latitude": data.latitude ? data.latitude : null,
      ":longitude": data.longitude ? data.longitude : null
    },
    ExpressionAttributeNames: {
      '#state': 'state'
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    callback(null, success({ status: true }));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
