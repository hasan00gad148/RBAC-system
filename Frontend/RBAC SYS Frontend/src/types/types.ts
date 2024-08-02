interface IFormInputs {
    username: string;
    email: string;
    password: string;
    phone: string;
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
    role: string;
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
    role:string,

    isLoggedIn: boolean
  }


export type { UserState, UserI, ApiResponseSuccess, ApiResponseFail, IFormInputs };
 