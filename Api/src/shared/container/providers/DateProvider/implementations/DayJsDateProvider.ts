import { IDateProvider } from "../IDateProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

class DayJsDateProvider implements IDateProvider {
 
  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.covertToUTC(end_date)
    const start_date_utc = this.covertToUTC(start_date)
    
    const diffHours = dayjs(end_date_utc).diff(start_date_utc, "hours");

    return diffHours;
  }

  covertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate()
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.covertToUTC(end_date)
    const start_date_utc = this.covertToUTC(start_date)
    
    const diffDays = dayjs(end_date_utc).diff(start_date_utc, "days");

    return diffDays;

  }
}

export { DayJsDateProvider };
