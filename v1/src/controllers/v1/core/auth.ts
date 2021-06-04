import { BaseController } from "../base";
import { CoreHelpers } from "../../../helpers/core";
import { Users } from "../../../database/core/users";
import { Passwords } from "../../../database/core/passwords";
import { Permissions } from "../../../database/core/permissions";
import { AuthorizationPayload } from "../../../typings";
import { Configuration, TokensManager } from "../../../App.globals";
import { Profiles } from "../../../database/core/profiles";
import { Validator } from "../../../App.validator";

export class AuthController extends BaseController<typeof Users> {
  constructor() {
    super(Users);
  }

  public create = () =>
    CoreHelpers.controller("create.access", async (req) => {
      await Validator.validate(req.body)
        .schema({
          username: (_) => _.use("isUserName"),
          password: (_) =>
            _.use("isPassword").matches(
              async () =>
                TokensManager.decrypt(
                  (
                    await Passwords.new()
                      .where({
                        userId: req.body.username,
                        status: "Valid",
                      })
                      .selectOneOrFail(["password"])
                  ).password
                ),
              "Incorrect Username or Password!"
            ),
          ip_whitelist: (_) =>
            _.optional()
              .likeArray(
                { sanitize: true },
                "Please provide a valid IP Address List as Array!"
              )
              .each((ip) => ip.isIpv4("Please provide a valid IP Address!")),
          remember_me: (_) =>
            _.optional().likeBoolean(
              { sanitize: true },
              "Please provide a valid Boolean value!"
            ),
        })
        .exec();

      // Create Permissions If Not Exists
      await Permissions.new().insertIfAble({ userId: req.body.username });

      // Create Profile If Not Exists
      await Profiles.new().insertIfAble({ userId: req.body.username });

      // Authentication Successful, Fetch User
      const User = (await this.Schema.new()
        .where({
          userId: req.body.username,
        })
        .columns(["userId", "fname", "lname", "status"])
        .withRelation({
          permissions: Permissions.new().columns(["userId", "overrides"]),
        })
        .updateAndSelectOne(
          {
            activity: "Online",
            lastAccess: Date.now(),
          },
          true
        )) as AuthorizationPayload;

      // Prepare Expiry Time
      const ExpiresIn = req.body.remember_me
        ? Configuration().USERS.tokens.authorization.expiry * 7
        : Configuration().USERS.tokens.authorization.expiry;

      return [
        `Access has been created successfully!`,
        {
          type: "Bearer",
          expiresOn: Date.now() + ExpiresIn * 1000,
          tokens: (["Live", "Test"] as const).reduce(
            (p, mode) => ({
              ...p,
              [mode]: TokensManager.create({
                expiresIn: ExpiresIn,
                type: "Authorization",
                mode,
                allowedIps: [req.clientIp, ...(req.body.ip_whitelist || [])],
                payload: User,
              }),
            }),
            {}
          ),
        },
      ];
    });

  public update = () =>
    CoreHelpers.controller("update.access", async (req) => {
      await Validator.validate(req.authorization)
        .isObject("Authorization not found on the request!")
        .exec();

      await Validator.validate(req.body)
        .schema({
          ip_whitelist: (_) =>
            _.optional()
              .likeArray(
                { sanitize: true },
                "Please provide a valid IP Address List as Array!"
              )
              .each((ip) => ip.isIpv4("Please provide a valid IP Address!")),
          remember_me: (_) =>
            _.optional().likeBoolean(
              { sanitize: true },
              "Please provide a valid Boolean value!"
            ),
        })
        .exec();

      // Authentication Successful, Fetch User
      const User = (await this.Schema.new()
        .where({
          userId: req.authorization?.payload.userId || "",
        })
        .columns(["userId", "fname", "lname", "status"])
        .withRelation({
          permissions: Permissions.new().columns(["overrides", "userId"]),
        })
        .updateAndSelectOne(
          {
            activity: "Online",
            lastAccess: Date.now(),
          },
          true
        )) as AuthorizationPayload;

      // Prepare Expiry Time
      const ExpiresIn = req.body.remember_me
        ? Configuration().USERS.tokens.authorization.expiry * 7
        : Configuration().USERS.tokens.authorization.expiry;

      // Blacklist Current Authorization Token
      if (typeof req.authorization?.token === "string")
        TokensManager.blacklist(req.authorization.token);

      return [
        `Access has been updated successfully!`,
        {
          type: "Bearer",
          expiresOn: Date.now() + ExpiresIn * 1000,
          tokens: (["Live", "Test"] as const).reduce(
            (p, mode) => ({
              ...p,
              [mode]: TokensManager.create({
                expiresIn: ExpiresIn,
                type: "Authorization",
                mode,
                allowedIps: [req.clientIp, ...(req.body.ip_whitelist || [])],
                payload: User,
              }),
            }),
            {}
          ),
        },
      ];
    });

  public delete = () =>
    CoreHelpers.controller("delete.access", async (req) => {
      await Validator.validate(req.authorization)
        .isObject("Authorization not found on the request!")
        .exec();

      // Blacklist Current Authorization Token
      if (typeof req.authorization?.token === "string")
        TokensManager.blacklist(req.authorization.token);

      return `Access has been deleted!`;
    });
}
