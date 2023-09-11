import { Column, Entity, JoinTable, ManyToOne } from "typeorm";
import BaseModel from "../base.model";
import { Users } from "./users.model";
import config from "../../configs";

export enum OTPType {
    SMS = "sms",
    MAIL = "mail"
}

export enum UtilityType {
    RESET = "reset",
    VERIFY = "verify",
    LOGIN = "login"
}

@Entity({ schema: config.database.schema, name: 'otp' })
export class OTP extends BaseModel {
    @Column()
    otp: string;

    @Column()
    to: string;

    @Column({ type: "enum", enum: OTPType, default: OTPType.MAIL })
    type: OTPType;

    @Column({ default: 10 })
    validity: number;

    @Column({ default: false })
    verified: boolean

    @Column({ default: 1 })
    count: number

    @Column({ type: "enum", enum: UtilityType, default: UtilityType.RESET })
    utility: UtilityType

    @ManyToOne(() => Users, (user) => user.id, { eager: true })
    @JoinTable()
    user: Users;
}