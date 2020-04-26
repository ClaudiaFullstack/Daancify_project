export class StudentClass {
    class_id: number;
    dance_school_id: number;
    class_name: string;
    location: string;
    description: string;
    modality: number;
    price: number;
    start_date: string;
    end_date: string;
    start_hour: string;
    end_hour: string;
    periodicity: string;
    dance_style_name: string;
    level: number;
    dance_style_id: number;
    user_id: number;
    user_name: string;
    name: string;
    last_name: string;
    email: string;
    phone: number;
    password: string;
    avatar: string;
    user_type: number;
    teacher_id: number;





    constructor(item?: any) {
        this.class_id = item?.class_id ? item.class_id : '';
        this.dance_school_id = item?.dance_school_id ? item.dance_school_id : '';
        this.class_name = item?.class_name ? item.class_name : '';
        this.location = item?.location ? item.location : '';
        this.description = item?.description ? item.description : '';
        this.modality = item?.modality ? item.modality : '';
        this.price = item?.price ? item.price : '';
        this.start_date = item?.start_date ? item.start_date : '';
        this.end_date = item?.end_date ? item.end_date : '';
        this.start_hour = item?.start_hour ? item.start_hour : '';
        this.end_hour = item?.end_hour ? item.end_hour : '';
        this.periodicity = item?.periodicity ? item.periodicity : '';
        this.level = item?.level ? item.level : "";
        this.dance_style_name = item?.dance_style_name ? item.dance_style_name : '';
        this.dance_style_id = item?.dance_style_id ? item.dance_style_id : '';
        this.user_id = item?.user_id ? item.user_id : '';
        this.user_name = item?.user_name ? item.user_name : '';
        this.name = item?.name ? item.name : '';
        this.last_name = item?.last_name ? item.last_name : '';
        this.email = item?.email ? item.email : '';
        this.phone = item?.phone ? item.phone : '';
        this.password = item?.password ? item.password : '';
        this.avatar = item?.avatar ? item.avatar : '';
        this.user_type = item?.user_type ? item.user_type : '';
        this.teacher_id = item?.teacher_id ? item.teacher_id : '';
    }
}
