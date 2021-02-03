import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {FreelancerInterface, Multy} from './freelancer.interface';

const now = new Date();
// Range datepicker Start
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;
// Range datepicker Ends

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrls: ['./freelancer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FreelancerComponent implements OnInit {

  cities2 = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys', disabled: true },
    { id: 4, name: 'Pabradė' },
    { id: 5, name: 'Klaipėda' }
  ];
  selectedCityIds: string[];


  // Variable declaration
  d: any;
  d2: any;
  d3: any;
  model: NgbDateStruct;
  popupModel;
  date: {year: number, month: number};
  displayMonths = 2;
  navigation = 'select';
  disabled = true;
  customModel: NgbDateStruct;

  configModal;    // Global configuration of datepickers


  // Range datepicker start
  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  // Range datepicker starts

  order: FreelancerInterface = {
    date: '',
    select: 0,
    name: '',
    email: '',
    website: '',
    phone: '',
    orderType: '',
    duration: 200,
    period: '',
    web3x: true,
    radio: true,
    adv: true,
    checkbox4: true,
    checkbox5: true,
    checkbox6: true,
    details: '',
    radio_text: '',
    adv_site: '',
    comment: '',
  }

  duration = 100

  newOrderForm: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // this.selectToday();
    this.buildItemForm(this.order);
  }
  private buildItemForm(item) {
    this.newOrderForm = this.formBuilder.group({
      date: [item.date || '', Validators.required],
      select: [item.select || '', Validators.required],
      name: [item.name || '', Validators.required],
      email: [item.email || '', Validators.required],
      website: [item.website || '', Validators.required],
      phone: [item.phone || '', Validators.required],
      premium: [item.premium || '', Validators.required],
      top: [item.top || '', Validators.required],
      light: [item.light || '', Validators.required],
      period: [item.period || '', Validators.required],
      web3x: [item.web3x || '', Validators.required],
      radio: [item.radio || '', Validators.required],
      adv: [item.adv || '', Validators.required],
      checkbox4: [item.checkbox4 || '', Validators.required],
      checkbox5: [item.checkbox5 || '', Validators.required],
      checkbox6: [item.checkbox6 || '', Validators.required],
      selectedCityIds: [item.selectedCityIds || '', Validators.required],
      radio_text: [item.radio || '', Validators.required],
      adv_site: [item.adv_site || '', Validators.required],
      comment: [item.comment || '', Validators.required],
    });
  }
  submitForm() {
    const newForm: FreelancerInterface = {
      email: this.newOrderForm.value.email,
      website: this.newOrderForm.value.website,
      phone: this.newOrderForm.value.phone,
      orderType: this.newOrderForm.value.orderType,
      top: this.newOrderForm.value.top,
      light: this.newOrderForm.value.light,
      period: this.newOrderForm.value.period,
      web3x: this.newOrderForm.value.web3x,
      radio: this.newOrderForm.value.radio,
      adv: this.newOrderForm.value.adv,
      checkbox4: this.newOrderForm.value.checkbox4,
      checkbox5: this.newOrderForm.value.checkbox5,
      checkbox6: this.newOrderForm.value.checkbox6,
      selectedCityIds: this.newOrderForm.value.selectedCityIds,
      radio_text: this.newOrderForm.value.radio,
      adv_site: this.newOrderForm.value.adv_site,
      comment: this.newOrderForm.value.comment,
    }
    this.order = newForm;
  }
  clickEventRadio1(){
    this.order.select = 'E-50051'
  }
  clickEventDisabled(){
    this.order.select = 0
  }
  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);
  // Range datepicker ends
  //
  //
  // // Selects today's date
  // selectToday() {
  //   this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  // }

  // Custom Day View Starts

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: {month: number}) {
    return date.month !== current.month;
  }
  // Custom Day View Ends

  orderType(value: string){
    this.newOrderForm.value.orderType = value
  }

  multyDuration(value: number){
    this.newOrderForm.value.duration = this.duration * value
  }
}
