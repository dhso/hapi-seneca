# hapi-seneca
a hapi plugin for seneca with sync(await)

# options: set path to scan seneca files

```
path: 'senecas/**/*.js'
```

# path: senecas/matchs.js
```
module.exports = function math(options) {

  this.add({ role: 'math', cmd: 'sum' }, function sum(msg, respond) {
    respond(null, { answer: msg.left + msg.right })
  })

  this.add({ role: 'math', cmd: 'product' }, function product(msg, respond) {
    respond(null, { answer: msg.left * msg.right })
  })

  this.wrap({ role: 'math' }, function (msg, respond) {
    msg.left = Number(msg.left).valueOf()
    msg.right = Number(msg.right).valueOf()
    this.prior(msg, respond)
  })
}
```

# in router
```
let seneca_router = {
    method: ['GET'],
    path: '/seneca/router',
    handler: async (req, h) => {
        try {
            let res = await h.seneca.act_sync({ role: 'math', cmd: 'sum', left: 1, right: 2 });
            return {
                code: 200,
                data: res
            }
        } catch (err) {
            return h.response(Object.assign({ name: err.name, message: err.message }, err)).code(500);
        }
    }
};
```
