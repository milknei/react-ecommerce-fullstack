// module.exports = {
//   async create(ctx) {
//     const { email } = ctx.request.body;

//     const existingUser = await strapi
//       .query("user", "users-permissions")
//       .findOne({ email });

//     if (existingUser) {
//       return ctx.throw(400, "Email is already taken");
//     }

//     const user = await strapi.plugins[
//       "users-permissions"
//     ].controllers.auth.register(ctx);

//     return user;
//   },
// };
