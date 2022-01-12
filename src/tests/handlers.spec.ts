import supertest from 'supertest';
import app from '../server';
const request = supertest(app);





describe('Users Handler', () => {
    let token: string;
    
    it('POST users will return a token', async () => {
        const user = {
            first_name: 'first4',
            last_name: 'last4',
            password: 'randompassword4'
        }
        const response = await request.post('/users').send(user);
        token = response.body;
        console.log("received token = ", token)
        expect(token.split('.').length).toBeGreaterThan(1);
        
    });

    it('index users with token 200', async () => {
        const response = await request.get('/users').set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200);
        
    });

    it('show users with token 200', async () => {
        const response = await request.get('/users/1').set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200);
        
    });
});

describe('Orders handlers', () => {
    let token: string;
    // create order
    it('Creates order', async () => {

        const user = {
            first_name: 'first4',
            last_name: 'last4',
            password: 'randompassword4'
        }
        let response = await request.post('/users').send(user);
        token = response.body;
        // console.log("token = ", token)
        // let order = {
        //     current_status: "active",
        //     user_id: 1,
        // }
        response = await request.post("/orders/1").send({user_id:1});
        console.log(response.body)
        expect(response.body.user_id).toEqual("1");

        
    });

    // index orders
    it('index orders with token 200', async () => {
        const response = await request.get('/orders')
        // console.log("responce = ", response)
        expect(response.status).toEqual(200);
        
    });
    // Fetch all user Orders
    it('orders by user with token 200', async () => {
        const response = await request.get('/orders/1').set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200);
        
    });
});

describe('Products handlers', () => {

    let token: string;
    // create order (requires token)
    it('Creates product', async () => {
        const user = {
            first_name: 'first5',
            last_name: 'last5',
            password: 'randompassword5'
        }
        const resp = await request.post('/users').send(user);
        token = resp.body;

        const product = {
            name: 'p5',
            price: 20,
        }
        let response = await request.post('/products').send(product).set('Authorization', `Bearer ${token}`)
        console.log("************", response.body)
        // expect(response.body.name).toEqual("p5");

        
    });

    // index products
    it('index products with token 200', async () => {
        const response = await request.get('/products')
        // console.log("responce = ", response)
        expect(response.status).toEqual(200);
        
    });

    // Show products
    it('show products with token 200', async () => {
        const response = await request.get('/products/1')
        expect(response.status).toEqual(200);
        
    });
});