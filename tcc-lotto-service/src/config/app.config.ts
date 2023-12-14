import * as process from 'process';

export class AppConfig {
  static getStage(): string {
    return process.env.STAGE;
  }

  static getPort(): string {
    return process.env.PORT;
  }

  static getBaseUrl(): string {
    return String(process.env.BASE_URL);
  }
}
