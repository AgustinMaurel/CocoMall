const {Router} = require("express");
const router = Router();
const {stripe} = require("../models/index");
const mercadopago = require("mercadopago");
const nodemailer = require("nodemailer");
require("dotenv").config();
const {
    templateSuccess,
    templateFailure,
} = require("../utils/Templates/emailTemplates");

//all this routes strart with checkout
router.post("/stripe", async (req, res) => {
    try {
        const {amount, id, currency, description} = req.body;
        const payment = await stripe.paymentIntents.create({
            amount,
            currency,
            description,
            payment_method: id,
            confirm: true,
        });
        console.log(payment);
        res.send("pagado papu");
    } catch (error) {
        res.send(error.raw.message);
    }
});

router.post("/mercadopago", async (req, res) => {
    const {title, total} = req.body;
    mercadopago.configure({
        access_token:
            "TEST-4584026682195569-100518-6865fd891a74a50438b28e4a07dae8f4-835549336",
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
            success: "http://localhost:3001/checkout/feedback",
            failure: "http://localhost:3001/checkout/feedback",
            pending: "http://localhost:3001/checkout/feedback",
        },
        auto_return: "approved",
    };
    let answer = await mercadopago.preferences.create(preference);
    const response = answer.body.id;
    const init_points = answer.body.init_point;
    console.log("RESPONSE: ", response, "INIT POINT: ", init_points);
    res.json({response: response, init_points: init_points});
});

router.get("/feedback", async function (req, res) {
    // correo para enviar el comprobante
    //Se necesita recibir para enviar el correo orderId, productos, precio, total, direccion de envio

    const {payment_id, status, merchant_order_id} = req.query;

    if (status === "success") {
        let email = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "coco.mallsb@gmail.com",
                pass: "cvgabzzweorejiny",
            },
        });

        let mailOption = await email.sendMail({
            from: '"Coco Mall 🥥🥥" <coco.mallsb@gmail.com>', // sender address
            to: "daniel.zapata.grajales@gmail.com", // list of receivers
            subject: "Thanks for your order ✅✅", // Subject line
            text: "Hello world?", // plain text body
            html: templateSuccess(
                0001,
                "Remera, condones, tennis",
                1000,
                1000,
                "Avenida Siempre Viva 123"
            ), // html body
        });
    }

    if (status === "failure") {
        let email = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "coco.mallsb@gmail.com",
                pass: "cvgabzzweorejiny",
            },
        });

        let mailOption = await email.sendMail({
            from: '"Coco Mall 🥥🥥" <coco.mallsb@gmail.com>', // sender address
            to: "daniel.zapata.grajales@gmail.com", // list of receivers
            subject: "We have a issue with your payment ⚠️⚠️", // Subject line
            text: "Hello world?", // plain text body
            html: templateFailure(), // html body
        });
    }

    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id,
    });
});

module.exports = router;