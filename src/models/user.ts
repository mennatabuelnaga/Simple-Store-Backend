import Client from '../database';
import crud from '../crud/crud';
import bcrypt from 'bcrypt';

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    password: string;
};

export class UserStore {
    public index;
    public show;
    public destroy;
    public update;

    constructor() {
        const table = 'users';
        this.index = crud.index<User>(table);
        this.show = crud.show<User>(table);
        this.destroy = crud.destroy<User>(table);
        this.update = crud.update<User>(table);
    }

    async create(u: User): Promise<User> {
        const hash = await bcrypt.hash(
            u.password + process.env.PEPPER,
            Number(process.env.SALT_ROUND)
        );
        try {
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';
            const conn = await Client.connect();
            const result = await conn.query(sql, [
                u.first_name,
                u.last_name,
                hash,
            ]);

            const row = result.rows[0];
            conn.release();
            return row;
        } catch (err) {
            throw new Error(`Could not add a new row. Error: ${err}`);
        }
    }
}