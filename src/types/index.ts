export type LikeCommentPayload = {
  post_id: string;
  group_id: string;
  comment_username: string;
};

export type LikeCommentSinglePayload = {
  post_id: string;
  comment_username: string;
  username: string;
};

export type CommentPostPayload = {
  post_id: string;
  message: string;
  username: string;
};

export type LikePostPayload = {
  post_id: string;
  group_id: string;
};

export type LikePostSinglePayload = {
  post_id: string;
  username: string;
};

export type Response = {
  message: string;
  status: string;
  current_time: string;
};
