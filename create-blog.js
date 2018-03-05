import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const date = new Date().getTime();

  const params = {
    TableName: "blogs",
    Item: {
      blogId: uuid.v1(),
      createdAt: date,
      modifiedAt: date,
      category: data.category,
      city: data.city,
      state: data.state,
      country: data.country,
      title: data.title,
      subtitle: data.subtitle,
      content: data.content,
      latitude: data.latitude,
      longitude: data.longitude
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
