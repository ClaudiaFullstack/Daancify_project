export class SchoolDance {
    dance_school_id:number;
    owned_by_user_id:number;
    dance_school_name: string;
    address: string;
    description: string;
    phone_dance_school: number;
    email: string;


    constructor(item?: any) {
        this.dance_school_id = item?.dance_school_id ? item.dance_school_id : '';
        this.owned_by_user_id = item?.owned_by_user_id ? item.owned_by_user_id : '';
        this.dance_school_name = item?.dance_school_name ? item.dance_school_name : '';
        this.address = item?.address ? item.address : '';
        this.description = item?.description ? item.description : '';
        this.phone_dance_school = item?.phone_dance_school ? item.phone_dance_school : '';
        this.email = item?.email ? item.email : '';

    }
}