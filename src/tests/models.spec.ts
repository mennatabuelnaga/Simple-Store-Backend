import supertest from 'supertest';
import { OrderStore } from '../models/order';
import app from '../server';
const request = supertest(app);
const o_store = new OrderStore();

import { UserStore } from '../models/user';
import { ProductStore } from '../models/product';

const u_store = new UserStore();
const p_store = new ProductStore();



describe('User Model', () => {
    it('create method should add a record', async () => {
        //create user#1
        const result = await u_store.create({
            first_name: 'first1',
            last_name: 'last1',
            password: 'pass1',
        });
        console.log(result.id)
        expect(result.password).not.toEqual('password');
    });

    it('index method should return a list', async () => {
        //create user#2
        const usr = await u_store.create({
            first_name: 'first2',
            last_name: 'last2',
            password: 'passw2',
        });
        // console.log(usr);
        const result = await u_store.index();
        // one from endpoint test
        expect(result.length).toBeGreaterThan(1);
    });

    it('show method should return the correct model', async () => {
        const result = await u_store.show('1');
        expect(result.id).toEqual(1);
    });
});

describe('Order Model', () => {
    it('create an order', async () => {

        // let order = {
        //     current_status: "active",
        //     user_id: 1,
           
        // }
        let created_order = await o_store.create(1);
        expect(Number(created_order.user_id)).toEqual(1);

        // order = {
        //     current_status: "active",
        //     user_id: 1,
           
        // }
        // created_order = await o_store.create(1);
        // expect(created_order.user_id).toEqual(1);

    
    });

    it('show method should return the correct model', async () => {
        // Show order#1
        const result = await o_store.show('1');
        // console.log("SHOW RESULT", result)
        expect(result.id).toEqual(1);
    });

    
    it('ordersByUser', async () => {
        // Show All orders of user#1
        const result = await o_store.ordersByUser(1);
        expect(result).toContain({ id: 1 }, { id: 2 });
    });
});

describe('Product Model', () => {
    
    it('create a product', async () => {

        const product1 = {
            name: 'p1',
            price: 5
        }
        const created_prod1 = await p_store.create(product1);
        expect(created_prod1.price).toEqual(5);

        const product2 = {
            name: 'p2',
            price:10

        }
        const created_prod2 = await p_store.create(product2);
        expect(created_prod2.name).toEqual("p2");

    
    });

    it('show method should return the correct model', async () => {
        // Show order#1
        const result = await p_store.show('1');
        // console.log("SHOW RESULT", result)
        expect(result.id).toEqual(1);
    });

    
    it('index method should return a list', async () => {
      
        const result = await p_store.index();
        // one from endpoint test
        expect(result.length).toBeGreaterThan(1);
    });
});