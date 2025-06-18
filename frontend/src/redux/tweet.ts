import { ITweet, ITweetActionCreator, ITweetForm, TweetState } from "./types/tweet";

                    // action types

export const GET_ALL_TWEETS = "tweets/GET_ALL_TWEETS";
export const CREATE_TWEET = "tweets/CREATE_TWEET";
export const GET_ONE_TWEET = "tweets/GET_ONE_TWEETS";
export const UPDATE_TWEET = "tweets/UPDATE_TWEETS";
export const DELETE_TWEET = "tweets/DELETE_TWEETS";

                    // ACTION CREATORS

const getAllTweetsAction = (tweets: ITweet[]) => ({
    type: GET_ALL_TWEETS,
    payload: tweets,
})

const createTweetAction = (tweet: ITweet) => ({
    type: CREATE_TWEET,
    payload: tweet,
})

const getOneTweetAction = (tweet: ITweet) => ({
    type: GET_ONE_TWEET,
    payload: tweet,
})

const updateTweetAction = (tweet: ITweet) => ({
    type: UPDATE_TWEET,
    payload: tweet,
})

const deleteTweetAction = (tweetId: number) => ({
    type: DELETE_TWEET,
    payload: tweetId,
});

                    // thunks

// getalltweetsthunk
export const thunkGetAllTweets = (): any => async (dispatch: any) => {
    try {
        const res = await fetch("api/tweets");
        if (res.ok) {
            const data = await res.json();
            dispatch(getAllTweetsAction(data));
        } else {
            throw res;
        }
    } catch (err) {
        const error = err as Response;
        const errorMessages = await error.json();
        return errorMessages;
    }
};

// getonetweetthunk

export const thunkGetOneTweet = (tweetId: number): any => async (dispatch: any) => {
    try {
        const res = await fetch(`/api/tweets/${tweetId}`);
        if (res.ok) {
            const data = await res.json();
            dispatch(getOneTweetAction(data));
        } else {
            throw res;
        }
    } catch (err) {
        const error = err as Response;
        const errorMessages = await error.json();
        return errorMessages;
    }
};

// Createtweetthunk

export const thunkCreateTweet = (tweetData: ITweetForm): any => async (dispatch: any) => {
    try {
        const res = await fetch("/api/tweets",{
            method: "PODT",
            headers: { "Content-Tpes": 'application/json' },
            body: JSON.stringify(tweetData),
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(createTweetAction(data));
            return data;
        } else {
            throw res;
        }
    } catch (err) {
        const error = err as Response;
        const errorMessages = await error.json();
        return errorMessages;
    }
};

// update a tweet thunk

export const thunkUpdateTweet = (tweetId: number, tweetData: ITweetForm): any => async (dispatch: any) => {
    try {
        const res = await fetch(`/api/tweets/${tweetId}`, {
            method: "PUT",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(tweetData),
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(updateTweetAction(data));
            return data;
        } else {
            throw res;
        }
    } catch (err) {
        const error = err as Response;
        const errorMessages = await error.json();
        return errorMessages;
    }
};

// deletetweetthunk

export const thunkDeleteTweet = (tweetId: number): any => async (dispatch: any) => {
    try {
        const res = await fetch(`/api/tweets/${tweetId}`, {
            method: "DELETE",
            credentials: 'include',
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(deleteTweetAction(tweetId));
            return data;
        } else {
            throw res;
        }
    } catch (err) {
        const error = err as Response;
        const errorMessages = await error.json();
        return errorMessages;
    }
};

// reducer

const initialState: TweetState = {
    byId: {},
    allTweets: [],
};

export default function tweetReducer(
    state = initialState,
    action: ITweetActionCreator,
): TweetState {
    let newState = {...state,};
    let newById = { ...newState.byId };
    let allTweet = [...newState.allTweets];

    switch (action.type) {
        case GET_ALL_TWEETS:
            if (Array.isArray(action.payload)) {
                const tweets = action.payload;
                tweets.forEach(tweet => {
                    newState.byId[tweet.id] = tweet;
                });
                allTweet = action.payload;

                newState.byId = newById;
                newState.allTweets = allTweet;
                return newState;
            }
            return state;

        case GET_ONE_TWEET:
            if (!Array.isArray(action.payload)) {
                const tweet = action.payload;
                newById[tweet.id] = tweet;

                newState.byId = { ...newState.byId, [tweet.id]: tweet };
                newState.allTweets = [...newState.allTweets, tweet];
                
                return newState;
            }
            return state;

        case CREATE_TWEET:
            if (!Array.isArray(action.payload)) {
                const newTweet = action.payload;
                newState.allTweets = [...newState.allTweets, newTweet];
                newState.byId = { ...newState.byId, [newTweet.id]: newTweet };

                return newState;
            }
            return state;

        case UPDATE_TWEET:
            const newTweet= action.payload as ITweet;
            const index = allTweet.findIndex(t => t.id === newTweet.id);
            if (index !== -1) {
                newState.allTweets[index] =newTweet;
            } else return state;
            return newState;

        case DELETE_TWEET:
            if (typeof action.payload === 'number') {
                const tweetId = action.payload;
                delete newState.byId[tweetId];
                newState.allTweets = newState.allTweets.filter(tweet => tweet.id !== tweetId);
            }
            return newState;
            
        default:
            return state;


        
    }
}