// Inject Environment Variables into objects
export const InjectEnv = <T extends Record<string, any>>(object: T): T => {
  for (const Key in object) {
    // Get Value
    const Value = object[Key];
    if (typeof Value === "string") {
      // Resolve if value is an Object
      const MatchObject =
        /(object|boolean|number|string|list)\(\s*\{\s*\{\s*(\w+)\s*\}\s*\}\s*\)/.exec(
          Value
        );

      if (MatchObject) {
        if (MatchObject[1] === "object")
          object[Key] = JSON.parse(process.env[MatchObject[2]] || "{}");
        else if (MatchObject[1] === "boolean")
          object[Key] = ["1", "true"].includes(
            (process.env[MatchObject[2]] || "").toString().toLowerCase()
          ) as any;
        else if (MatchObject[1] === "number")
          object[Key] = parseFloat(process.env[MatchObject[2]] || "") as any;
        else if (MatchObject[1] === "string")
          object[Key] = process.env[MatchObject[2]] as any;
        else if (MatchObject[1] === "list")
          object[Key] = (process.env[MatchObject[2]] || "")
            .split(",")
            .map((_) => _.trim()) as any;
        else
          object[Key] = Value.replace(
            /\{\s*\{\s*(\w+)\s*\}\s*\}/g,
            (_: string, key: string) => process.env[key]
          ) as any;
      } else
        object[Key] = Value.replace(
          /\{\s*\{\s*(\w+)\s*\}\s*\}/g,
          (_: string, key: string) => process.env[key]
        );
    } else if (typeof Value === "object" && Value !== null)
      object[Key] = InjectEnv(Value);
  }

  return object;
};
