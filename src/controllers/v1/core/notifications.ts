import { BaseController } from "../base";
import { Notifications } from "../../../database/core/notifications";
import { CoreHelpers } from "../../../helpers/core";
import { Validator } from "../../../App.globals";

export class NotificationsController extends BaseController<
  typeof Notifications
> {
  constructor() {
    super(Notifications);
  }

  public search = () =>
    CoreHelpers.controller(async (req) => {
      await Validator.validate(req.params)
        .schema({
          userId: (_) => _.use("isUser"),
        })
        .exec();

      return [
        `Notification(s) fetched successfully!`,
        await this.Schema.new()
          .withRelation(req.query.relation as any)
          .search(req.query.search as any)
          .filter(req.query.filter as any)
          .offset(req.query.offset as any)
          .limit(req.query.limit as any)
          .sort((req.query.sort as any) || "ASC")
          .having({
            userId: req.params.userId,
          })
          .select(),
      ];
    });
}
