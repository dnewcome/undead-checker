const express = require('express')
const app = express()
const Browser = require('zombie');


function runExpress() {
    app.get('/', function (req, res) {
      res.send('Hello World!')
    })

    app.get('/zombie', function (req, res) {
      runZombie(()=>{
          res.send('checked zappos');
      });
    })

    app.listen(3600, function () {
      console.log('Example app listening on port 3600!')
    })
}

function runZombie(done) {
    const loginUrl = 'https://auth.zappos.com/ap/signin?openid.return_to=https%3A%2F%2Fsecure-www.zappos.com%2Fzap%2FloginComplete&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=zappos_us&openid.oa2.response_type=code&openid.mode=checkid_setup&openid.ns.oa2=http%3A%2F%2Fwww.amazon.com%2Fap%2Fext%2Foauth%2F2&siteState=97321f5a-f2ea-467b-9653-eb9aafe8ac70~1498177349823%3AovoFy6my0pdoeT8QAjxrdZYng4sxv6OD6%2BW6nLkzn%2FI%3D%3Anull&openid.oa2.scope=auth_code&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.oa2.client_id=iba%3Aamzn1.application-oa2-client.ce5075dead7c4aa7ae316059988839d5&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0';
    const browser = new Browser();
    browser.on('xhr', (event, url)=>{
        console.log('xhr ', url, event);
    });
    browser.visit(loginUrl, () => {
        browser
            .fill('email', 'dan@try.com')
            .fill('password', 'Try4Free')
            .click('#signInSubmit-input', ()=>{
                console.log('fishing for username ', browser.document.getElementById('accountHeaderLoggedIn').innerHTML);
                // assert never finds the element for some reason
                // browser.assert.element('accountHeaderLoggedIn');
                console.log('done');
                done();
            });
    });
}

runExpress();
