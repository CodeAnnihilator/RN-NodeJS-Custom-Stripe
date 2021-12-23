const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {resolve} = require('path');
const env = require('dotenv').config({path: resolve('.env')});
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(bodyParser.json())

const testAccount = 'acct_1K9qRb2EJLvc6AI2';
const connectedTestAccount = 'acct_1K9qYC2Ep5PgP752';

const errorHandler = (res, error, code) => {
    console.log(error);
    res.status(code);
    res.send({error});
}

app.post('/create-payment-intent', async (req, res) => {
    try {
        const intent = await stripe.paymentIntents.create({
            amount: 2000,
            currency: 'usd',
            payment_method_types: ['card'],
            application_fee_amount: 123,
            transfer_data: {
                destination: connectedTestAccount,
            },
        });
        res.send(intent);
        return;
    } catch (error) {
        return errorHandler(res, error, 400)
    }
})

app.get('/retrieve-account', async (_, res) => {
    try {
        const account = await stripe.accounts.retrieve(testAccount);
        res.send(account);
        return;
    } catch (error) {
        return errorHandler(res, error, 400)
    }
})

app.post('/delete-account', async (_, res) => {
    try {
        const account = await stripe.accounts.del(testAccount);
        res.send(account);
        return;
    } catch (error) {
        return errorHandler(res, error, 400)
    }
})

app.post('/connect-account', async (_, res) => {
    try {
        const account = await stripe.accounts.create({
            type: 'express',
            business_type: 'individual',
            capabilities: {
                card_payments: {requested: true},
                transfers: {requested: true},
            },
        })
        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            type: 'account_onboarding',
            refresh_url: 'https://example.com/reauth',
            return_url: 'https://example.com/return',
            collect: 'eventually_due'
        })
        return res.send(accountLink);
    } catch (error) {
        return errorHandler(res, error, 400)
    }
})

app.listen(4242, () => console.log('connected'));