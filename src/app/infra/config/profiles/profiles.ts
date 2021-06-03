
import configurations from "../configurations";
import { ProfilesValues } from "./profiles-values";

export default class Profiles {

  public static isProfileDevelopment(): boolean {
    return configurations.profile == ProfilesValues.DEVELOPMENT;
  }

  public static isProfileProduction(): boolean {
    return configurations.profile == ProfilesValues.PRODUCTION;
  }

  public static isProfileTest(): boolean {
    return configurations.profile == ProfilesValues.TEST;
  }
}
