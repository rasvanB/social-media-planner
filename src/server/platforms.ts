import { env } from "~/env.mjs";
import { TwitterApi } from "twitter-api-v2";

type TwitterClientConfig = {
  access_token: string;
  access_token_secret: string;
};

export const createTwitterClient = (config: TwitterClientConfig) => {
  return new TwitterApi({
    appKey: env.TWITTER_CLIENT_ID,
    appSecret: env.TWITTER_CLIENT_SECRET,
    accessToken: config.access_token,
    accessSecret: config.access_token_secret,
  });
};

export class TwitterClient {
  client: TwitterApi;

  constructor(config: TwitterClientConfig) {
    this.client = createTwitterClient(config);
  }

  async createImagePost(content: string) {
    const media_id = await this.client.v1.uploadMedia("image.png");
    await this.client.v1.tweet(content, {
      media_ids: media_id,
    });
  }
}
