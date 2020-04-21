export class DanceStyle {
  dance_style_id: number;
  dance_style_name: string;
  
constructor(item?: any) {
  this.dance_style_id = item?.dance_style_id ? item.dance_style_id : null;
  this.dance_style_name = item?.dance_style_name ? item.dance_style_name : '';
}
}
