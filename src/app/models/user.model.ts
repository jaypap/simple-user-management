
import { Address } from './address.model';
import { Company } from './company.model';

export class User {
    public id: number;
    public name: string;
    public username: number;
    public email: string;
    public address: Address;
    public phone: string;
    public website: string;
    public company: Company;

    constructor() {
        this.id = 0;
        this.address = new Address();
    }
}
