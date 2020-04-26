import { NumberValueAccessor } from '@angular/forms';

export class Class {
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
    level: number;
    dance_style_id: number;
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
        this.level = item?.level ? item.level : '';
        this.dance_style_id = item?.dance_style_id ? item.dance_style_id : '';
        this.teacher_id = item?.teacher_id ? item.teacher_id : '';
    }
}
