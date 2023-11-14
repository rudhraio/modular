import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import config from "../../configs";
import BaseModel from "../base.model";
import { UserBusiness } from "./user-business.model";

export enum BusinessPlan {
    FREE = "free",
    PAID = "paid"
}

@Entity({ schema: config.database.schema, name: 'businesses' })
export class Businesses extends BaseModel {

    @Column({ unique: true })
    business: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true, type: "text" })
    description: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    ccode: number;

    @Column({ nullable: true })
    phone_number: string;

    @Column({ type: 'jsonb', default: {} })
    social_links: object

    @Column({ nullable: true })
    address: string;

    @Column({ type: "enum", enum: BusinessPlan, default: BusinessPlan.FREE })
    plan: BusinessPlan;

    @OneToMany(() => UserBusiness, userBusiness => userBusiness.business)
    userBusinesses: UserBusiness[];
}