import express, { Request, response, Response } from 'express';
import { OrderStore } from '../models/order';
import verifyAuthToken from '../middleware/verifyToken';

const order_store = new OrderStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    const orders = await order_store.index();
    res.json(orders);
};

const show = async (req:Request, res: Response) => {
    try {
        const order = await order_store.show(req.params.id);
        res.json(order);
    } catch (err) {
        res.status(400).json(err);
    }
}


const create = async (req: Request, res: Response) => {
    try {
        console.log("received user id:", req.body.user_id)
        const created = await order_store.create(Number(req.body.user_id));
        // console.log("created order++++++", created)
        res.json(created);
    } catch (err) {
        res.json(err);
    }
}

const addProduct = async (req: Request, res: Response) => {
    try {
        const order = await order_store.addProduct(
            req.body.number,
            Number(req.params.id),
            req.body.product_id
        );
        res.json(order);
    } catch (err) {
        res.status(400).json(err);
    }
}

const fetchUserOrders = async (req: Request, res: Response) => {
    try {
        const orders = await order_store.ordersByUser(Number(req.params.user_id));
        res.json(orders);
    } catch (err) {
        res.json(err);
    }
}

const order_routes = (app: express.Application): void => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders/:user_id', create);
    app.post('/orders/:id/add', addProduct);
    // Current Orders by user
    app.get('/orders/:user_id', verifyAuthToken, fetchUserOrders);
};

export default order_routes;