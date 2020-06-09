import { Command } from "@oclif/command";

import { container } from "../context2";
import { IConfig } from "@oclif/config";
import { AppContext } from "../context2";
import { createClient } from "../apiClient";

export default class ListDeployments extends Command {
  static description = "List all your deployments";

  constructor(
    argv: string[],
    config: IConfig,
    private ctx: AppContext = container.resolve("appContext")
  ) {
    super(argv, config);
  }

  async run() {
    const endpoint = await this.ctx.serverEndpoint();
    if (!endpoint) {
      this.log("You gotta log in Buddy");
      return;
    }

    const loggedIn = await this.ctx.authState.ensureLoggedIn();
    if (!loggedIn) {
      this.log("You gotta log in Buddy");
      return;
    }

    const { token } = await this.ctx.authState.getTokenInfo();

    const kraneClient = createClient(endpoint, token);
    const deployments = await kraneClient.getDeployments();

    deployments.forEach((dep) => this.log(dep.name, dep.config));
  }
}
