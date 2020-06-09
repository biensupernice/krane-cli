import {
  createContainer,
  asClass,
  asFunction,
  Lifetime,
  asValue,
} from "awilix";
import * as path from "path";
import * as fs from "fs";
import { promisify } from "util";
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const open = promisify(fs.open);
import { AppConfig, createAppConfig, KraneState } from "./context";

export const container = createContainer({
  injectionMode: "CLASSIC",
});

export class AuthState {
  constructor(private kraneStore: KraneStore) {}

  async ensureLoggedIn() {
    const { token, tokenExpiry } = await this.kraneStore.get();
    if (!token || !tokenExpiry) {
      return false;
    }

    if (tokenExpiry < new Date()) {
      return false;
    }
    return true;
  }

  async getTokenInfo() {
    const { token, tokenExpiry } = await this.kraneStore.get();

    return {
      token,
      tokenExpiry,
    };
  }

  async setTokenInfo(token: string, tokenExpiry: Date) {
    this.kraneStore.update({
      token,
      tokenExpiry,
    });
  }
}

abstract class FileStore<T> {
  constructor(private appConfig: AppConfig) {}

  get filePath() {
    return path.resolve(this.appConfig.dotConfigDir, this.appConfig.storeName);
  }

  async save(data: T) {
    const serialized = await this.serialize(data);
    await writeFile(this.filePath, serialized, "utf8");
  }

  async ensureStoreExist() {
    await open(this.filePath, fs.constants.O_CREAT);
  }

  async get() {
    await this.ensureStoreExist();
    const fCont = await readFile(this.filePath, "utf8");
    return this.parse(fCont);
  }

  abstract async parse(data: string): Promise<T>;
  abstract async serialize(data: T): Promise<string>;
}

class KraneStore extends FileStore<KraneState> {
  async parse(data: string): Promise<KraneState> {
    if (!data) {
      return {
        endpoint: undefined,
        token: undefined,
        tokenExpiry: undefined,
      };
    }

    const p = JSON.parse(data) as KraneState;

    return {
      endpoint: p.endpoint,
      token: p.token,
      tokenExpiry: p.tokenExpiry,
    };
  }

  async update(data: Partial<KraneState>) {
    const current = await this.get();
    const updated = {
      current,
      ...data,
    };
    await await this.save(updated);
  }

  async serialize(data: KraneState): Promise<string> {
    return JSON.stringify(data, null, 2);
  }
}

export class AppContext {
  constructor(
    private appConfig: AppConfig,
    private kraneStore: KraneStore,
    public authState: AuthState
  ) {}

  get sshDir() {
    return this.appConfig.sshDir;
  }

  async serverEndpoint() {
    const { endpoint } = await this.kraneStore.get();
    return endpoint;
  }
}

container.register({
  appContext: asClass(AppContext, { lifetime: Lifetime.SINGLETON }),
  authState: asClass(AuthState),
  appConfig: asFunction(createAppConfig, { lifetime: Lifetime.SINGLETON }),
  kraneStore: asClass(KraneStore, { lifetime: Lifetime.SINGLETON }),
  userConfig: asValue({}),
});
