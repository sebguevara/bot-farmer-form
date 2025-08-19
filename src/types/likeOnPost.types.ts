export type LikeOnPostSingle = {
    username: string;           
    posts_id: string[];         
  };
  
  export type LikeOnPostMultiple = {
    group_number: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "all"; 
    posts_id: string[];                                            
  };
  