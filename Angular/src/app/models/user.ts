export class User {
    user_id:number;
    user_name: string;
    name: string;
    last_name: string;
    email: string;
    phone: number;
    password: string;
    user_type: number; // me falta este con un select
    dance_style_id:number; // me falta este con un select
    avatar:string; // me faltan este


    constructor(item?: any) {
        this.user_id = item?.user_id ? item.user_id : '';
        this.user_name = item?.user_name ? item.user_name : '';
        this.name = item?.name ? item.name : '';
        this.last_name = item?.last_name ? item.last_name : '';
        this.email = item?.email ? item.email : '';
        this.phone = item?.phone ? item.phone : '';
        this.password = item?.password ? item.password : '';
        this.user_type = item?.user_type ? item.user_type : '';
        this.dance_style_id = item?.dance_style_id ? item.dance_style_id : '';
        this.avatar = item?.avatar ? item.avatar : '';
    }
}
