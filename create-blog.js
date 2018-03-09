import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import dateFormat from "dateformat";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const date = new Date().getTime();
  const year = dateFormat(date, "yyyy");
  const month = dateFormat(date, "m");

  const params = {
    TableName: `${process.env.TABLE_PREFIX}blogs`,
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
      longitude: data.longitude,
      images: data.images,
      mainImage: data.mainImage,
      year: year,
      month: month,
      active: "x"
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
