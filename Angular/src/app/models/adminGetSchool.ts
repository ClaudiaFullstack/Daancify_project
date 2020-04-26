export class AdminGetSchool {
  dance_school_id: number;
  dance_school_name: string;

constructor(item?: any) {
  this.dance_school_id = item?.dance_school_id ? item.dance_school_id : null;
  this.dance_school_name = item?.dance_school_name ? item.dance_school_name : '';

}
}
