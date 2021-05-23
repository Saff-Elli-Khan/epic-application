import { Schema } from "epic-sql";
import { CoreHelpers } from "../../helpers/core";

export class BaseController<T extends Schema<any> = any> {
  constructor(public Schema: T) {}

  public search = () =>
    CoreHelpers.controller("search.*", async (req) => [
      `Record(s) fetched successfully!`,
      await this.Schema.new()
        .withRelation(req.query.relation as any)
        .search(req.query.search as any)
        .filter(req.query.filter as any)
        .offset(req.query.offset as any)
        .limit(req.query.limit as any)
        .sort((req.query.sort as any) || "ASC")
        .select(),
    ]);

  public count = () =>
    CoreHelpers.controller("count.*", async () => [
      `Record(s) count has been fetched!`,
      await this.Schema.new().count(),
    ]);
}
