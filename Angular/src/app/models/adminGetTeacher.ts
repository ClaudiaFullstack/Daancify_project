export class AdminGetTeacher {
  user_id: number;
  user_name: string;
  last_name: string;


constructor(item?: any) {
  this.user_id = item?.user_id ? item.user_id : null;
  this.user_name = item?.user_name ? item.user_name : '';
  this.last_name = item?.last_name ? item.last_name : '';

}
}
