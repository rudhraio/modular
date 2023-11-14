import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import bcrypt from 'bcrypt';

import config from "../../configs";
import BaseModel from "../base.model";
import { UserBusiness } from "./user-business.model";
import { OTP } from "./otp.model";


@Entity({ schema: config.database.schema, name: 'users' })
export class Users extends BaseModel {
    @Column({ default: "USER" })
    first_name: string;

    @Column({ nullable: true })
    last_name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    image: string;

    @Column()
    email: string;

    @Column({ unique: true })
    username: string;

    @Column({ nullable: true })
    ccode: number;

    @Column({ nullable: true })
    phone_number: string;

    @Column({ default: "NA", nullable: true })
    password: string;

    @Column({ default: false })
    verified: boolean;

    @Column({ nullable: true })
    salt: string;

    @OneToMany(() => UserBusiness, userBusiness => userBusiness.user)
    userBusinesses: UserBusiness[];

    @OneToMany(() => OTP, otp => otp.user)
    otp: OTP[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, this.salt + config.saltKey);
        }
    }

    async comparePassword(password: string): Promise<boolean> {
        const hashedPassword = await bcrypt.hash(password, this.salt + config.saltKey);
        return hashedPassword === this.password;
    }
}