export default class DateUtils {

  public static formatDayMonthYear(data: Date): string {
    const month = (data.getMonth() <= 10) ? `0${data.getMonth() + 1}` : data.getMonth() + 1;
    return `${data.getDate()}/${month}/${data.getFullYear()}`
  }

}
