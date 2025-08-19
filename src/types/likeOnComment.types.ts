export type LikeOnCommentSingle = {
    username: string;
    posts_id: string[];
    targets_username: string[];
  };
  
  export type LikeOnCommentMultiple = {
    group_number: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "all"; 
    posts_id: string[];                                             
    targets_username: string[];                                     
  };
  