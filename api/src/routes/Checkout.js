const { Router } = require('express');
const router = Router();
const { stripe } = require("../models/index")

//all this rputes strart with checkout
router.post("/stripe", (req, res) => {
    try {
        const { amount, id, currency, description } = req.body
        const payment = await stripe.paymentIntents.create({
            amount,
            currency,
            description,
            payment_method: id,
            confirm: true
        })
        console.log(payment)
        res.send("pagado papu")
    } catch (error) {
        res.send(error.raw.message)
    }
})

module.exports = router