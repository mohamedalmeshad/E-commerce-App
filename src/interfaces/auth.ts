import { User } from "next-auth"

/********************* sign up interface *********************/
// user data send to api
export interface signupUserData {
    name: string
    email: string
    password: string
    rePassword: string
    phone: string
}

export interface SignupOrUpdatePasswordResponse {
    statusMsg?: string // if error
    message: string    // in both
    user?: User        // if success
    token?: string     // if success
}
/*************************************************************/

/********************* sign in interface *********************/
export interface signInData {
    email: string
    password: string
}
/*************************************************************/

/************* reset password data interface *****************/
export interface resetPasswordData {
    email: string
    newPassword: string
}
/*************************************************************/

/***************** Update Password interface *****************/
export interface UpdatePasswordData {
    currentPassword: string
    password: string
    rePassword: string
}
/*************************************************************/

/*************** Update User Profile interface ***************/
export interface UpdateUserProfileData {
    name: string
    email: string
    phone: string
}
export interface UpdateUserProfileDataResponse {

    message: string
    user?: User
    errors?: Errors
}
export interface Errors {
  value: string
  msg: string
  param: string
  location: string
}
/*************************************************************/

/***************** Update Password interface *****************/
export interface ForgotPasswordResponse{
    statusMsg? : string
    message : string
}
/*************************************************************/

