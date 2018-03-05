import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "images",
    Item: {
      imageId: uuid.v1(),
      blogId: data.blogId,
      createdAt: new Date().getTime(),
      smallImage: data.smallImage,
      mediumImage: data.mediumImage,
      largeImage: data.largeImage
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
