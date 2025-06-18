import { GET_ALL_TWEETS, CREATE_TWEET, GET_ONE_TWEET, UPDATE_TWEET, DELETE_TWEET, } from '../tweets/tweet';

export interface ITweet {
    id: number;
    user_id: number;
    content: string;
    created_at: string;
    updated_At: string;
    image_url?: string[];
}

export interface ITweetForm {
    user_id: number;
    content: string;
    image_url?: string;
}

export interface TweetById {
    [id: number]: ITweet;
}

export interface TweetState {
    byId: TweetId;
    allTweets: ITweet[];
}

export interface ITweetActionCreator {
    type: string;
    payload: ITweet | ITweet[];
}

export interface TweetErrors {
    content?: string;
    image_url?: string;
}

interface Action<Type extends string, Payload> {
  type: Type;
  payload: Payload;
}

export type GetAllTweets = Action<typeof GET_ALL_TWEETS, ITweet[]>;
export type CreateTweet = Action<typeof CREATE_TWEET, ITweet>;
export type GetOneTweet = Action<typeof GET_ONE_TWEET, ITweet>;
export type UpdateTweet = Action<typeof UPDATE_TWEET, ITweet>;
export type DeleteTweet = Action<typeof DELETE_TWEET, number>;

export type TweetAction =
  | GetAllTweets
  | CreateTweet
  | GetOneTweet
  | UpdateTweet
  | DeleteTweet;
