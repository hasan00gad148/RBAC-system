interface IFormInputs {
    username: string;
    email: string;
    password: string;
    phone: string;
  }

interface IFormArticleInputs{
  title: string;
  content: string;
}
  
  interface ApiResponseFail {
    ok: false;
    message: string;
    error: string;
  }
  
  interface UserI {
    id: number;
    userName: string;
    password: string;
    email: string;
    phone: string;
    role_id: number;
    Role: {roleName: string};
    updatedAt: string;
    createdAt: string;
  }
  
  interface ApiResponseSuccess { 
    ok: true;
    user: UserI;
    token: string;
  }



  interface UserState{
    id: number,
    userName: string,
    email: string,
    phone: string,

    role_id:number,
    Role: {roleName: string},

    isLoggedIn: boolean
  }


  interface ArticleI{
    id: number
    title: string
    content: string
    createdAt: string
    updatedAt: string
    User?:{userName: string, email: string}
  }

export type { UserState, UserI, ApiResponseSuccess,
   ApiResponseFail, IFormInputs,ArticleI, IFormArticleInputs
  };
 