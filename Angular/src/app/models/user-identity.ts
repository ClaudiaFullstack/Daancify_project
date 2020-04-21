import { User } from './user';

export class UserIdentity {
    token: string;
    user: User;


    constructor(item?: any) {
        this.token = item?.token ? item.token : '';
        this.user = item?.user ? item.user : null;
    }
}
