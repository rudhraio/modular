import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import config from "../../configs";
import BaseModel from "../base.model";
import { Businesses } from "./business.model";
import { Users } from "./users.model";


export enum UserTypes {
    ADMIN = 'admin',
    OWNER = 'owner',
    MANAGER = 'manager',
    STAFF = 'staff'
}

export enum InvitationStatusTypes {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected'
}


@Entity({ schema: config.database.schema, name: 'user_business' })
export class UserBusiness extends BaseModel {

    @Column({ type: "enum", enum: InvitationStatusTypes, default: InvitationStatusTypes.PENDING })
    status: string;

    @Column({ type: "enum", enum: UserTypes, default: UserTypes.STAFF })
    user_type: UserTypes;

    @ManyToOne(() => Users, (user) => user.id)
    @JoinTable()
    user: Users;

    @ManyToOne(() => Businesses, (business) => business.id)
    @JoinTable()
    business: Businesses;
}