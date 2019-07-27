var router = require("express").Router();
const { OnePayDomestic } = require('vn-payments');
const { OnePayInternational } = require('vn-payments');
const { VNPay } = require('vn-payments');
const { SohaPay } = require('vn-payments');
const { NganLuong } = require('vn-payments');
var crypto = require('crypto');

module.exports = function () {
  const onepayDom = new NganLuong({
    paymentGateway: 'https://sandbox.nganluong.vn:8088/nl35/checkout.api.nganluong.post.php',
    merchant: '45571',
    receiverEmail: 'tung.tran@naustud.io',
    secureSecret: 'c57700e78cb0df1766279d91e3233c79',
  });
  var now = new Date();
  router.post('/checkout', (req, res) => {
    const params = Object.assign({}, req.body);

    // construct checkout payload from form data and app's defaults
    const checkoutData = {
      amount: 100000,
      customerId: '1234567891022',
      currency: 'VND',
      clientIp: req.connection.remoteAddress,
      locale: 'en' ? 'en' : 'vi',
      billingCity: params.billingCity || '',
      billingPostCode: params.billingPostCode || '',
      billingStateProvince: params.billingStateProvince || '',
      billingStreet: params.billingStreet || '',
      billingCountry: params.billingCountry || '',
      deliveryAddress: params.billingStreet || '',
      deliveryCity: params.billingCity || '',
      deliveryCountry: params.billingCountry || '',
      deliveryProvince: params.billingStateProvince || '',
      customerEmail: 't.c.manh1997@gmail.com',
      customerPhone: '0123456789',
      orderId: 'JSECURETEST01',
      // againLink: `http://${req.headers.host}/`,
      returnUrl: `http://${req.headers.host}/payment/callback`,
      transactionId: `node-${now.toISOString()}`,
      customerName: 'truongcongmanh',
      paymentMethod: 'ATM_ONLINE',
      bankCode: 'EXB',
      cancelUrl: `http://${req.headers.host}/`,
      orderInfo: 'Thanh toan giay adidas',
      paymentType: '1',
      totalItem: '1'
    };

     console.log(checkoutData)

    process.stdout.write(getHash(data).toUpperCase());
    // buildCheckoutUrl is async operation and will return a Promise
    onepayDom.buildCheckoutUrl(checkoutData)
      .then(checkoutUrl => {
        res.writeHead(301, { Location: checkoutUrl.href });
        console.log(checkoutUrl)
        res.end();

      })
      .catch(err => {

        res.send(err);
        console.log(err)
      });
  });

  router.get('/callback', (req, res) => {
    const query = req.query;
    console.log(query);
    onepayDom.verifyReturnUrl(query).then(results => {
      if (results.isSucceed) {
        res.render('success', {
          title: 'Nau Store - Thank You',
          orderId: results.orderId,
          price: results.price,
          message: results.message,
        });
      } else {
        res.render('errors', {
          title: 'Nau Store - Payment Errors',
          message: results.message,
        });
      }
    });
  });
  return router;
}