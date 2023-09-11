import {
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    BaseEntity,
    Entity,
    Column
} from 'typeorm';
import config from '../configs';


@Entity({ schema: config.database.schema })
export default abstract class BaseModel extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: true })
    active: boolean;

    @Column({ default: false })
    deleted: boolean

    @Column({ type: 'jsonb', default: {} })
    info: object

    @Column({ default: "NA" })
    created_by: string

    @Column({ default: "NA" })
    updated_by: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


}