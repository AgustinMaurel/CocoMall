const { Router } = require('express');
const router = Router();
const { stripe } = require('../models/index');
const mercadopago = require('mercadopago');

//all this routes strart with checkout
router.post("/stripe", async (req, res) => {
    try {
        const { amount, id, currency, description } = req.body;
        const payment = await stripe.paymentIntents.create({
            amount,
            currency,
            description,
            payment_method: id,
            confirm: true,
        });
        console.log(payment);
        res.send('pagado papu');
    } catch (error) {
        res.send(error.raw.message);
    }
});

router.post('/mercadopago', async (req, res) => {
    const { title, total } = req.body;
    mercadopago.configure({
        access_token:
            'TEST-4584026682195569-100518-6865fd891a74a50438b28e4a07dae8f4-835549336',
    });

    let preference = {
        items: [
            {
                title: title,
                unit_price: total,
                quantity: 1,
            },
        ],
        back_urls: {
            success: 'http://localhost:3001/feedback',
            failure: 'http://localhost:3001/feedback',
            pending: 'http://localhost:3001/feedback',
        },
        auto_return: 'approved',
    };
    let answer = await mercadopago.preferences.create(preference);
    const response = answer.body.id;
    const init_points = answer.body.init_point;
    console.log('RESPONSE: ', response, 'INIT POINT: ', init_points);
    res.json({response: response, init_points: init_points});
});

module.exports = router;
