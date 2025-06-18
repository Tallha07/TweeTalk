import { GET_ALL_COMMENTS, CREATE_COMMENT, GET_ONE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, } from '../comments/comment';

export interface IComment {
    id: number;
    tweet_id: number;
    user_id: number;
    content: string;
    created_at: string;
    updated_at: string;
}

export interface ICommentForm {
    tweet_id: number;
    content: string;
}

export interface CommentById {
    [id: number]: IComment;
}

export interface CommentState {
    byId: { [id: number]: IComment };
    allComments: IComment[];
}

export interface ICommentActionCreator {
    type: string;
    payload: IComment | IComment[];
}

export interface CommentErrors {
    content?: string;
}

interface Action<Type extends string, Payload> {
  type: Type;
  payload: Payload;
}

export type GetAllComments = Action<typeof GET_ALL_COMMENTS, IComment[]>;
export type CreateComment = Action<typeof CREATE_COMMENT, IComment>;
export type GetOneComment = Action<typeof GET_ONE_COMMENT, IComment>;
export type UpdateComment = Action<typeof UPDATE_COMMENT, IComment>;
export type DeleteComment = Action<typeof DELETE_COMMENT, number>;

export type CommentAction =
  | GetAllComments
  | CreateComment
  | GetOneComment
  | UpdateComment
  | DeleteComment;
