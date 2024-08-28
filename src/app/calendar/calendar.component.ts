import {
  Component,
  InputSignal,
  Signal,
  WritableSignal,
  computed,
  input,
  signal,
} from '@angular/core';
import { Meetings } from './meetings.interface';
import { DateTime, Info, Interval } from 'luxon';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { ReminderformComponent } from '../reminderform/reminderform.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  imports: [CommonModule, HomeComponent,ReminderformComponent],
  standalone: true,
})
export class CalendarComponent {

  constructor(private dialog: MatDialog) { }

  meetings: InputSignal<Meetings> = input.required();
  today: Signal<DateTime> = signal(DateTime.local());
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month'),
  );
  activeDay: WritableSignal<DateTime | null> = signal(null);
  weekDays: Signal<string[]> = signal(Info.weekdays('short'));
  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week'),
    )
      .splitBy({ day: 1 })
      .map((d) => {
        if (d.start === null) {
          throw new Error('Wrong dates');
        }
        return d.start;
      });
  });
  DATE_MED = DateTime.DATE_MED;
  activeDayMeetings: Signal<string[]> = computed(() => {
    const activeDay = this.activeDay();
    if (activeDay === null) {
      return [];
    }
    const activeDayISO = activeDay.toISODate();

    if (!activeDayISO) {
      return [];
    }

    return this.meetings()[activeDayISO] ?? [];
  });
 

  goToPreviousMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({ month: 1 }),
    );
  }

  goToNextMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({ month: 1 }),
    );
  }

  goToToday(): void {
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
  }

  isToday(date: DateTime): boolean {
    const today = this.today();
    return date.hasSame(today, 'day');
  }

  trackByIndex(index: number): number {
    return index;
  }

  onDateClick(date: DateTime): void {
    this.selectedDate = date;
    const today = this.today();
    //if (date < today.startOf('day')) {
      // Do nothing if the date is in the past
      //return;
    //}
    console.log('Date clicked:', date);
    const dialogRef = this.dialog.open(ReminderformComponent, {
      width: '500px',
      height: '450px',


      
      data: { date: date.toISODate() }

      
    
    });
    console.log('Dialog opened with data:', { date: date.toISODate() });
   
  }
  selectedDate: DateTime | null = null; // Property to store the clicked date
  openReminderForm(date: string): void {
    this.dialog.open(ReminderformComponent, {
      data: { date: date }
    });
  }


  
}