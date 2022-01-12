import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../middleware/verifyToken';

const product_store = new ProductStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    const products = await product_store.index();
    res.json(products);
};

const show = async (req: Request, res: Response) => {
    try {
        const product = await product_store.show(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(400).json(err);
    }
}

const create = async (req: Request, res: Response) => {
    const product: Product = {
        id: 1,
        name: req.body.name,
        price: req.body.price,
    };
    try {
        const created = await product_store.create(product);
        res.json(created);
    } catch (err) {
        res.json(err);
    }
}

const product_routes = (app: express.Application): void => {
    // Index
    app.get('/products', index);
    // Show
    app.get('/products/:id', show);
    // Create [token required]
    app.post('/products', verifyAuthToken, create);
};

export default product_routes;