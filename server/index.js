const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {resolve} = require('path');
const env = require('dotenv').config({path: resolve('.env')});
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(bodyParser.json())

app.post('/create-account-hosted', async (req, res) => {
    const externalAccount = req.body;
    try {
        const account = await stripe.accounts.create({
            type: 'custom',
            business_type: 'individual',
            requested_capabilities: ['card_payments', 'transfers'],
            external_account: externalAccount
        })

        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            type: 'account_onboarding',
            refresh_url: 'https://example.com?success',
            return_url: 'https://example.com?failure',
            collect: 'eventually_due'
            // type: 'custom_account_verification',
        })

        res.send(accountLink);
        return;
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send({error});
        return;
    }
})

// app.post('/create-account', async (req, res) => {
//     const data = req.body;
//     try {
//         const account = await stripe.accounts.create({
//             type: 'custom',
//             country: 'US',
//             capabilities: {
//                 card_payments: {
//                     requested: true
//                 },
//                 transfers: {
//                     requested: true
//                 },
//             },
//             tos_acceptance: {
//                 ip: '8.8.8.8',
//                 date: Math.floor((new Date()).getTime() / 1000),
//             },
//             business_profile: {
//                 mcc: '5734',
//                 url: 'https://bestcookieco.com'
//             },
//             external_account: {
//                 object: "bank_account",
//                 country: "US",
//                 currency: "usd",
//                 account_holder_name: 'Jane Austen',
//                 account_holder_type: 'individual',
//                 routing_number: "110000000",
//                 account_number: "000123456789"
//             },
//             business_type: 'individual',
//             individual: {
//                 id_number: 222222222,
//                 first_name: 'Alice28',
//                 last_name: 'Smith11',
//                 dob: {
//                     day: 01,
//                     month: 01,
//                     year: 1901
//                 },
//                 address: {
//                     line1: '123 State St',
//                     postal_code: 12345,
//                     city: 'Schenectady',
//                     state: 'NY'
//                 },
//                 email: 'eugene@theneurite.com',
//                 phone: 8888675309,
//                 ssn_last_4: 2222
//             }
//         })
//         res.send(account);
//         return;
//     } catch (error) {
//         console.log(error);
//         res.status(400);
//         res.send({error});
//         return;
//     }
// })

app.listen(4242, () => console.log('connected'));