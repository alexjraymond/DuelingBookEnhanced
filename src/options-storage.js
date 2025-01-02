import OptionsSync from "webext-options-sync";
import { actionDisplayNames } from "./utils";

const optionsStorage = new OptionsSync({
  defaults: {
    disableExtension: false,
    disableHotkeys: false,
    skipIntro: false,
    autoConnect: false,
    darkMode: false,
  },
  migrations: [OptionsSync.migrations.removeUnused],
  logging: true,
});

export default optionsStorage;

export const hotkeyStorage = new OptionsSync({
  defaults: Object.assign(
    {},
    ...Array.from(actionDisplayNames.keys()).map((item) => ({
      [item]: "Not Set",
    })),
  ),
  //migrations: [OptionsSync.migrations.removeUnused],
  logging: true,
});
