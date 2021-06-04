import { BaseController } from "../base";
import { CoreHelpers } from "../../../helpers/core";
import { Users } from "../../../database/core/users";
import { Configuration, TokensManager } from "../../../App.globals";
import { Validator } from "../../../App.validator";

export class UsersController extends BaseController<typeof Users> {
  constructor() {
    super(Users);
  }

  // Register a new User
  public create = () =>
    CoreHelpers.controller("create.user", async (req) => {
      await Validator.validate(req.body)
        .schema({
          fname: (_) => _.use("isFirstName"),
          lname: (_) => _.optional({ checkFalsy: true }).use("isLastName"),
          username: (_) => _.use("isUserName").use("notUser"),
          // Validate Email Or Contact
          [Configuration().USERS.subscription.type.toLowerCase()]: (_) =>
            _.use(
              `is${Configuration().USERS.subscription.type}` as
                | "isEmail"
                | "isContact"
            ).use("notSubscribed"),
          password: (_) => _.use("isPassword"),
          confirmPassword: (_) =>
            _.use("isPassword").matches(
              req.body.password,
              "Password does not matches with Confirmation password!"
            ),
          agreement: (_) => _.use("isAgreement"),
          subscribe: (_) => _.likeBoolean({ sanitize: true }),
        })
        .exec();

      // Create New User
      return [
        `User has been registered!`,
        await this.Schema.new().insert({
          userId: req.body.username,
          fname: req.body.fname,
          lname: req.body.lname,
          passwords: [
            {
              password: TokensManager.encrypt(req.body.password),
            },
          ],
          subscriptions: [
            {
              userId: req.body.username,
              type: Configuration().USERS.subscription.type,
              value: req.body.email,
              isReceiving: req.body.subscribe,
            },
          ],
          profile: {},
          permissions: {},
        }),
      ];
    });

  public get = () =>
    CoreHelpers.controller("get.user", async (req) => {
      await Validator.validate(req.params)
        .schema({
          userId: (_) => _.use("isUserName"),
        })
        .exec();

      return [
        `User has been fetched!`,
        await this.Schema.new()
          .withRelation(req.query.relation as any)
          .where({ userId: req.params.userId })
          .selectOneOrFail(),
      ];
    });

  public update = () =>
    CoreHelpers.controller("update.user", async (req) => {
      await Validator.validate(req.params)
        .schema({
          userId: (_) => _.use("isUser"),
        })
        .exec();

      await Validator.validate(req.body)
        .schema({
          fname: (_) => _.optional({ checkFalsy: true }).use("isFirstName"),
          lname: (_) => _.optional({ checkFalsy: true }).use("isLastName"),
        })
        .exec();

      // Update User
      await this.Schema.new().where({ userId: req.params.userId }).update({
        fname: req.body.fname,
        lname: req.body.lname,
      });

      return `User has been updated successfully!`;
    });
}
