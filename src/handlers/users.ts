import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import verifyAuthToken from '../middleware/verifyToken';
import jwt from 'jsonwebtoken';

const user_store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    const users = await user_store.index();
    res.json(users);
};

const show = async (req: Request, res: Response) => {
    try {
        const user = await user_store.show(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}

const create = async (req: Request, res: Response) => {
    const user: User = {
        id: 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
    };
    
    try {
        const created = await user_store.create(user);
        const token = jwt.sign(
            { user: created },
            process.env.TOKEN_SECRET!
        );
        console.log(token);
        res.json(token);
        // res.json(created);
    } catch (err) {
        res.json(err);
    }
}

const delete_user =async (req: Request, res: Response) => {
    try {
        const user = await user_store.destroy(req.body.id);
        res.json(user);
    } catch (err) {
        res.json(err);
    }
}

const user_routes = (app: express.Application): void => {
    // Index [token required]
    app.get('/users', verifyAuthToken, index);
    // Show [token required]
    app.get('/users/:id', verifyAuthToken, show);
    // Create [returns token]
    app.post('/users', create);
    // Delete user
    app.delete('/users', delete_user);

};

export default user_routes;