import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken<string>("app.config");

export interface IAppConfig {
  apiEndpoint: string;
  apiSettingsPath: string;
}

export const AppConfig: IAppConfig = {
  apiEndpoint: "http://192.168.1.31:8585/",
  apiSettingsPath: "ApiSettings"
};
