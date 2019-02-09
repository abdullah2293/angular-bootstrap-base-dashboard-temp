import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpservice.service';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router } from '@angular/router';
import { LocalstorageService } from '../services/storage/localstorage.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {

  bookingform: FormGroup;
  service_types: any;
  payment_types: any;
  data_loaded: any = false;
  user_id: any;
  cod: any = false;
  origin: any;
  to_cities: any = false;
  cities: any;
  destination: any;
  service_type_rates:any;
  is_topay:any =false;

  constructor(public http: HttpService, public router: Router,private storage:LocalstorageService) {

    this.getServiceTypes()
    this.getPaymentTypes()
    this.getHomeStation()

    let user_data = this.storage.getUser();
    this.user_id = user_data.id;

    this.service_type_rates = []

    this.bookingform = new FormGroup({
      weight: new FormControl(1, [Validators.required, Validators.min(1)]),
      piece_count: new FormControl(1),
      additional_amount: new FormControl(0),
      discount: new FormControl(0),
      desc: new FormControl(),
      remarks: new FormControl(),
      gst_amount: new FormControl(0),
      total_charges: new FormControl(0),
      cod_amount: new FormControl(0),
      topay_amount: new FormControl(0),
      return_charges: new FormControl(0),
      payment_type_id: new FormControl(),
      service_type_id: new FormControl(),
      shipment_arrived: new FormControl(0),
      service_charges: new FormControl(0),
      consignee_reference: new FormControl(),

      shipper_name: new FormControl("Abdullah", Validators.required),
      shipper_city: new FormControl(this.origin.city_name, Validators.required),
      shipper_address: new FormControl("DHA phase 5", Validators.required),
      shipper_phone_number: new FormControl("12039898", Validators.required),
      consignee_name: new FormControl("Waleed", Validators.required),
      consignee_city: new FormControl('',Validators.required),
      consignee_address: new FormControl("Dha phase 6", Validators.required),
      consignee_phone_number: new FormControl("23847283", Validators.required),

      volumetric_weight: new FormControl(0),
      actual_weight: new FormControl(0),
      length: new FormControl(0),
      width: new FormControl(0),
      height: new FormControl(0),

    })

  }

  ngOnInit() {
  }


  getServiceTypes(city_id='') {

    var post = 'city_id='+city_id;

    this.http.post_method('/service-types', post, true)
      .subscribe((data) => {
        this.data_loaded = true;
        this.service_types = data.data;
      });

  }


  getPaymentTypes() {

    var post = '';

    this.http.post_method('/payment-types', post, true)
      .subscribe((data) => {
        this.data_loaded = true;
        this.payment_types = data.data;
      });

  }

  getHomeStation() {
    return this.origin = {
      'id': 1,
      'city_name': 'Karachi',
      'city_code': 'KHI'
    }
  }

  calc_weight(){
    let length = this.bookingform.value.length
    let width = this.bookingform.value.width
    let height = this.bookingform.value.height

    let volumetric_weight = (length * width * height) / 5000

    this.bookingform.patchValue({volumetric_weight:volumetric_weight})

    let chargeable_weight = volumetric_weight > this.bookingform.value.actual_weight ? volumetric_weight : this.bookingform.value.actual_weight
    this.bookingform.patchValue({weight:chargeable_weight})
  }

  onSubmit() {
    if (this.bookingform.valid) {
      this.add(this.bookingform.value);
      this.bookingform.reset();
    } else {
      console.log(this.bookingform);
    }
  }

  add(booking) {
    var post =
      'weight=' + booking.weight +
      '&piece_count=' + booking.piece_count +
      '&additional_amount=' + booking.additional_amount +
      '&discount=' + booking.discount +
      '&desc=' + booking.desc +
      '&gst_amount=' + booking.gst_amount +
      '&total_charges=' + booking.total_charges +
      '&cod_amount=' + booking.cod_amount +
      '&topay_amount=' + booking.topay_amount +
      '&return_charges=' + booking.return_charges +
      '&service_charges=' + booking.service_charges +
      '&payment_type_id=' + booking.payment_type_id +
      '&service_type_id=' + booking.service_type_id +
      '&shipper_name=' + booking.shipper_name +
      '&shipper_city=' + booking.shipper_city +
      '&shipper_address=' + booking.shipper_address +
      '&shipper_phone_number=' + booking.shipper_phone_number +
      '&consignee_name=' + booking.consignee_name +
      '&consignee_city=' + booking.consignee_city +
      '&consignee_address=' + booking.consignee_address +
      '&consignee_phone_number=' + booking.consignee_phone_number +
      '&shipment_arrived=' + booking.shipment_arrived +
      '&consignee_reference=' + booking.consignee_reference +
      '&remarks=' + booking.remarks +
      '&origin=' + JSON.stringify(this.origin) +
      '&destination=' + JSON.stringify(this.destination) +
      '&user_id=' + this.user_id;

    this.http.post_method('/create/booking', post, true)
      .subscribe(
        success => {
          console.log(success)
          this.router.navigate(['/bookings']);
        },
        err => {
          console.log(err)
          alert(err)
        }
      )

  }

  getServiceCharges(data){
    
    let charges = 0
    let total = 0

    var post='weight='+data.weight+
             '&origin_city_id='+this.origin.id+
             '&destination_city_id='+this.destination.id+
             '&service_type_id='+data.service_type_id+
             '&destination='+ JSON.stringify(this.destination)

    this.http.post_method('/calc/service/rates',post,true)
             .subscribe(
               (success) => {

                charges = success.data
                let gst_amount = +charges * +(data.gst_amount/100)
                total = (
                  +data.additional_amount + 
                  +gst_amount + +charges ) - +data.discount
                  
                this.bookingform
                    .patchValue({total_charges:total, service_charges:charges })

               },
               (err) => {

               }
             )

  }
  calc() {

    let data = this.bookingform.value
    if (data.weight == 0 || data.weight == '') {

      this.bookingform
        .controls['service_charges']
        .markAsTouched({ onlySelf: true })

      this.bookingform
        .controls['weight']
        .setErrors({ 'required': true })

    }

    this.getServiceCharges(data)
    

  }

  getFormControl(field) {
    return this.bookingform.get(field);
  }


  isCod() {
    let data = this.bookingform.value;

    this.cod = false;
    if (data.service_type_id == 2 || data.service_type_id == 4) {
      this.cod = true;
    }

    this.getServiceRates(data.service_type_id)

  }
  
  isTopay() {
    let data = this.bookingform.value;

    this.is_topay = false;
    if (data.payment_type_id == 4) {
      this.is_topay = true
    }
   
  }

  getServiceRates(service_id){
    
    let post = 'service_id='+service_id
    this.http.post_method('/get/service/rates',post,true)
             .subscribe(
               (success) => {
                 this.service_type_rates = success.data
                 console.log(this.service_type_rates)
               },
               (err) => {
                 console.log(err)
               }
             )
  }

  fetchCityByName() {

    let consignee_city = this.bookingform.value.consignee_city
    if (consignee_city == '') {

      if (this.to_cities)
        this.to_cities = false

      return;
    }

   
    var post = 'name=' + consignee_city;
    this.http.post_method('/get/city/name', post, true)
      .subscribe(
        (success) => {
          this.cities = success.data
          this.to_cities = true
          
        },
        (err) => {

        }
      )
  }

  select(city) {
    
    this.destination = city
    this.bookingform.patchValue(
        { 
          'consignee_city': city.city_name ,
          'gst_amount':+city.province.gst.gst_amount_percentage,
          'service_charges':0,
          'addional_amount':0,
          'discount':0,
          'total_charges':0
        }
      )
    this.getServiceTypes(this.destination.id)
    this.to_cities = false
    
  }
}
