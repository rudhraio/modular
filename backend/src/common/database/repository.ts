import { AppDataSource } from ".";

export class Repo<T>  {

    private repo: any;
    private model: any;

    constructor(model: any) {
        this.repo = AppDataSource.getRepository(model);
        this.model = model;
    }

    async getAll(data: T) {
        const model = this.repo.find(data);
        return model || []
    }

    async getOne(data: T) {
        try {

            const model = this.repo.findOne(data);
            return model || undefined;
        } catch (err) {
            return undefined;
        }

    }

    async create(data: T) {
        const model = this.repo.create(data);
        return this.repo.save(model);
    }

    async update(data: T, conditions: object) {
        const result = await this.repo
            .createQueryBuilder()
            .update(this.model)
            .set(data)
            .where(conditions)
            .execute()
        return result;
    }

    async delete(data: T, conditions: object) {
        const result = await this.repo
            .createQueryBuilder()
            .update(this.model)
            .set({ deleted: true, ...data })
            .where(conditions)
            .execute()
        return result;
    }
}