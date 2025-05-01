export default interface UserTypes {
    name: any;
    id : string;
    username:string;
    gender:string;
    age:number;
    email:string;
    phone_no:string;
    bio:string;
    status:string;
    last_seen:Date;
    blocked_users:string[];
    updated_at:Date;
    created_at : Date;
    avatar_url : string;
}