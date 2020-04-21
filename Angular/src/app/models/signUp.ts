export class SignUp {
    class_id:number;
    user_id:number;



    constructor(item?: any) {
        this.class_id = item?.class_id ? item.class_id : '';
        this.user_id = item?.user_id ? item.user_id : '';


    }
}