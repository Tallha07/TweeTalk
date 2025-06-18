import { IComment, ICommentForm, CommentState, ICommentActionCreator } from "./types/comment";

                            // action types

export const GET_ALL_COMMENTS = "comments/GET_ALL_COMMENTS";
export const CREATE_COMMENT = "comments/CREATE_COMMENT";
export const GET_ONE_COMMENT = "comments/GET_ONE_COMMENT"
export const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
export const DELETE_COMMENT = "comments/DELETE_COMMENT";

                            // action creators

const getAllCommentsAction = (comments: IComment[]) => ({
    type: GET_ALL_COMMENTS,
    payload: comments,
});

const createCommentsAction = (comment: IComment) => ({
    type: CREATE_COMMENT,
    payload: comment,
});

const getOneCommentAction = (comment: IComment) => ({
    type: GET_ONE_COMMENT,
    payload: comment,
});

const updateCommentAction = (comment: IComment) => ({
    type: GET_ALL_COMMENTS,
    payload: comment,
});

const deleteCommentAction = (commentId: number) => ({
    type: GET_ALL_COMMENTS,
    payload: commentId,
});

                            // thunks

// get all comments thunk

export const thunkGetAllComments = ():any => async (dispatch: any) => {
    try {
        const res = await fetch('/api/comments');
        if (res.ok) {
            const data = await res.json();
            dispatch(getAllCommentsAction(data));
        } else {
            throw res;
        }
    } catch (err) {
        const error = err as Response;
        const errorMessages = await error.json();
        return errorMessages;
    }
};

// get one comment thunk
export const thunkGetOneComment = (commentId: number): any => async (dispatch: any) => {
    try {
        const res = await fetch(`/api/comments/${commentId}`);
        if (res.ok) {
            const data = await res.json();
            dispatch(getOneCommentAction(data));
        } else {
            throw res;
        }
    } catch (err) {
        const error = err as Response;
        const errorMessages = await error.json();
        return errorMessages;
    }
};

// create a comment thunk
export const thunkCreateComment = (commentData: ICommentForm): any => async (dispatch: any) => {
    try {
        const res = await fetch('/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData),
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(createCommentsAction(data));
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

//update a comment thunk
export const thunkUpdateComment = (commentId: number, commentData: ICommentForm): any => async (dispatch: any) => {
    try {
        const res = await fetch(`/api/comments/${commentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData),
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(updateCommentAction(data));
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

// delete a comment thunk
export const thunkDeleteComment = (commentId: number): any => async (dispatch: any) => {
    try {
        const res = await fetch(`/api/comments/${commentId}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(deleteCommentAction(commentId));
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
const initialState: CommentState = {
    byId: {},
    allComments: [],
};

export default function commentReducer(
    state = initialState,
    action: ICommentActionCreator,
): CommentState {
    let newState = { ...state };
    let newById = { ...newState.byId };
    let allComment = [...newState.allComments];
    
    switch (action.type) {
        case GET_ALL_COMMENTS:
            if (Array.isArray(action.payload)) {
                const comments = action.payload;
                comments.forEach(comment => {
                    newState.byId[comment.id] = comment;
                });
                allComment = action.payload;

                newState.byId = newById;
                newState.allComments = allComment;
                return newState;
            }
            return state;

        case GET_ONE_COMMENT:
            if (!Array.isArray(action.payload)) {
                const comment = action.payload;
                newById[comment.id] = comment;

                newState.byId = { ...newState.byId, [comment.id]: comment };
                newState.allComments = [...newState.allComments, comment];
                return newState;
            }
            return state;

        case CREATE_COMMENT:
            if(!Array.isArray(action.payload)) {
                const newComment = action.payload;
                newState.byId = { ...state.byId, [newComment.id]: newComment };
                newState.allComments = [...state.allComments, newComment];
            }
            return newState;

        case UPDATE_COMMENT:
            if (!Array.isArray(action.payload)) {
                const updatedComment = action.payload;
                const index = allComment.findIndex(c => c.id === updatedComment.id);
                if (index !== -1) {
                    newState.byId = { ...state.byId, [updatedComment.id]: updatedComment }
                    newState.allComments[index] = updatedComment;
                }
            }
            return newState;

        case DELETE_COMMENT:
            if (typeof action.payload === 'number') {
                const commentId = action.payload;
                delete newById[commentId];
                newState.byId = newById
                newState.allComments = allComment.filter(c => c.id !== commentId);
            }
            return newState;

            default:
                return state;
    }
}