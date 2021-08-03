import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { forkJoin, Observable, of } from 'rxjs';
import { map, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { InvoiceService, UserService, CustomerService, BusinessService, BenefitService } from 'src/app/api/_services';

import { Customer, User, Business, Invoice } from 'src/app/api/_models';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Resume, Benefit, CustomerResume, BusinessResume } from '../../../api/pdf/resume';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent {

  currentUser: any; 
  user: User[]; 
  currentCustomer: any; 
  selectedCustomer: number
  customers: Customer[]; 
  currentBusiness: Business;

  addDate: any;
  count: any;
  currentInvoice: any;

  documentDefinition: any;
  pdfFileBase64: string;

  userId: number;
  customerId: number;
  addForm: FormGroup;
  addBenefitForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  public resume = new Resume();
  public customer = new CustomerResume();
  public business = new BusinessResume();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private userService: UserService,
    private businessService: BusinessService,
    private benefitService: BenefitService,
    private toastr : ToastrService,
  ) {
    this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();
    if (!this.resume.benefits || this.resume.benefits.length === 0) {
      this.resume.benefits = [];
      this.resume.benefits.push(new Benefit());
    }
  }

  ngOnInit(): void {

    // Get CurrentUser
    let token = window.localStorage.getItem('UserToken').replace(/['"]+/g, '');
    if(!token) {
      this.router.navigate(['login']);
      return;
    }
    else {
      this.userService.getUserByToken(token).subscribe(user => {
        this.currentUser = user;
  
        this.resume.profilePic = this.currentUser.photo;
        this.resume.name = this.currentUser.lastName + ' ' + this.currentUser.firstName ;
        this.resume.job = this.currentUser.job;
        this.resume.address = this.currentUser.address + ', ' + this.currentUser.zip + ', ' + this.currentUser.city ;
        this.resume.contactNo = this.currentUser.phoneNumber;
        this.resume.email = this.currentUser.email;
      })    
    }
    
    // Get All Customers
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userId = this.currentUser.infos.id;

    this.customerService.getCustomerByUserFk(+this.userId)
    .subscribe(res => {
      this.customers = res;
    });

    // Get Business
    this.businessService.getBusinessByUserFk(+this.userId)
    .subscribe(data => {
      this.currentBusiness = data;

      if(!this.currentBusiness) {
        alert('Veuillez dans un premier temps compléter les informations nécessaires concernant votre entreprise');
      } else {
        this.business.tva = this.currentBusiness.tva;
        this.business.siret = this.currentBusiness.siret;
        this.business.ape = this.currentBusiness.ape;
      }      
    });


    // Get All Incoices

    let actualDate = new Date();

    let monthDate = actualDate.getMonth()+1;
    let yearDate = actualDate.getFullYear();

    if (monthDate < 10) { 
      this.addDate = yearDate.toString() + '0' + monthDate.toString();
    } else {
      this.addDate = yearDate.toString() + monthDate.toString();
    }

    this.invoiceService.getInvoiceByUserFkDate(+this.userId, this.addDate)
      .subscribe(invoice => {
        this.currentInvoice = invoice;
        this.count = (Object.keys(this.currentInvoice).length)+1; 
        if(this.count < 10) {
          this.count = "0" + this.count;
        }
        if (this.count == null || undefined || 0 ) {
          this.count = 1;
        } 
      })  
  }

  addBenefit() {
    this.resume.benefits.push(new Benefit());
  }
  
  generatePdf(action = 'open') {
    this.documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(this.documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(this.documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(this.documentDefinition).download(); break;
      default: pdfMake.createPdf(this.documentDefinition).open(); break;
    }
  }

  resetForm() {
    this.resume = new Resume();
    this.resume.profilePic = this.currentUser.photo;
    this.resume.name = this.currentUser.lastName + ' ' + this.currentUser.firstName ;
    this.resume.job = this.currentUser.job;
    this.resume.address = this.currentUser.address + ', ' + this.currentUser.zip + ', ' + this.currentUser.city ;
    this.resume.contactNo = this.currentUser.phoneNumber;
    this.resume.email = this.currentUser.email;
  }

  getDocumentDefinition() {
    let d = new Date();
    let year = d.getFullYear();
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    this.resume.number = year+month+this.count;
    sessionStorage.setItem('resume', JSON.stringify(this.resume));
    return {
      content: [
        { 
          columns: [
            [
              {
                text: 'FACTURE',
                bold: true,
                fontSize: 18,
                alignment: 'left',
                margin: [0, 0, 0, 0]
              },
              {
                text: 'N° de facture: ' +  this.resume.number,
                alignment: 'left',
                margin: [0, 5, 0, 0]
              },
            ],
            [
              [
                this.getProfileUserObject(),
              ],
            ]
          ]
        },
        {
          columns: [
            [
              {
                text: 'DE',
                style: 'header'
              },
              {
                text: this.resume.name,
                style: 'name'
              },
              {
                text: this.resume.job,
                style: 'jobTitle'
              },
              {
                text: this.resume.address
              },
              {
                text: 'Email : ' + this.resume.email,
              },
              {
                text: 'Numéro : ' + this.resume.contactNo,
              },
            ],
            [
              {
                text: 'FACTURÉ À',
                style: 'header',
                alignment: 'right',
              },
              {
                text:  this.customer.name,
                alignment: 'right',
              },
              {
                text: this.customer.businessSector,
                style: 'name',
                alignment: 'right',
              },
              {
                text:   this.customer.address,
                alignment: 'right',
              },
              {
                text: this.customer.contactNo,
                alignment: 'right',
              },
              {
                text: this.customer.email,
                alignment: 'right',
              },  
            ],
          ],
        },
        {
          text: 'Produit(s)',
          style: 'header',
        },
        this.getBenefitObject(this.resume.benefits),
        {
          text: 'Informations supplémentaires',
          style: 'header',
        },
        {
          text: this.resume.otherDetails,
          style: 'text'
        },
        {
          columns: [
            [
              {
                text: 'Méthode de paiement : ' + this.resume.paymentMethod,
                border: [true,true,true,true]
              },
            ],
            [
              {
                text: 'Prix total HT : ' +  this.resume.amountHt + '€',  
                alignment: 'right',
                margin: [0,0,0,5],
              },
              { 
                text: 'TVA : ' + this.business.tva + '%',
                alignment: 'right',
                margin: [0,0,0,5],
              },
              {
                text: 'Prix total TTC : ' + this.resume.amountTtc + '€',  
                alignment: 'right',
                margin: [0,0,0,5],
              },
              {
                text: 'Remise : ' +  '0' + '€', 
                alignment: 'right',
              },

            ]       
          ],
          margin: [50, 25],
        }, 
        {
          text: 'Signature',
          style: 'sign'
        },
        {
          columns : [
              {
              text: `(${this.resume.name})`,
              alignment: 'right',
              }
          ]
        },
        { 
          columns: [ 
            [
              
              {
                style: 'info',
                text: [
                  "Tout retard de paiment pourra donner lieu à des pénalités de retard exigibles sans rappel, au taux de 10% de la facture totale par mois de retard (article 53 de la Loi NRE), ainsi qu'à une indemnité forfaitaire de 40€ (C; Com. art. D441-5). Aucun escompte consenti pour règlement anticipé.",
                  { text: "(Cette mention est obligatoire uniquement pour les ventes à d'autres professionnelles)", style: 'bold'  },

                ]
              },

              { 
                style: 'info',
                text: [
                  this.resume.name + ' - ' + this.resume.address + ' - Siret : ' + this.business.siret + ' - APE : ' + this.business.ape + ' ', 
                  { text: "(Mentions obligatoires pour tous les auto-entrepreneurs)", style: 'bold' },
                ]
              }
            ]
          ] 
        },  
      ],
      pageMargins: [25, 25, 25, 50],
      pageSize: 'A4', pageOrientation: 'portrait',
      footer: function(currentPage, pageCount) {
        return {
          columns: [ 
              {
                  fontSize: 8,
                  text: [
                    {
                      text: '\n',
                      margin: [0, 0]
                    },

                    {
                    text: '©' + currentPage.toString() + ' sur ' + pageCount,
                    }
                  ],
                  alignment: 'center'
              }
          ]
        };
      },
     
      info: {
        title: this.resume.name + '_RESUME',
        author: this.resume.name,
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
        styles: {
          header: {
            fontSize: 12,
            bold: true,
            margin: [0, 25, 0, 10],
          },
          name: {
            fontSize: 10,
            bold: true
          },
          jobTitle: {
            fontSize: 10,
            bold: true,
            italics: true
          },
          sign: {
            fontSize: 10,
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          text: {
            fontSize: 10,
          },
          bold: {
            bold: true,
            fontSize: 8,
          },
          info: {
            fontSize: 8,
            margin: [0, 30, 0, 0],
            alignment: 'center'
          },
          tableHeader: {
            bold: true,
          }
        }
    };
  }

  //Get Benefit
  getBenefitObject(benefits: Benefit[]) {
    const row = [];
    this.resume.amountHt = 0
    benefits.forEach(benefit => {
      benefit.totalPriceHt = benefit.price * benefit.quantity
      row.push(

        [{ text: benefit.product },{ text: benefit.price },{ text: benefit.quantity },{ text: benefit.totalPriceHt }],
      );
      let totalPriceHt = benefit.totalPriceHt
      this.resume.amountHt += totalPriceHt


      this.resume.amountTtc =  this.resume.amountHt + (this.resume.amountHt*this.business.tva)/100;
    });

    return {
      table: {  
        headerRows: 1,  
        widths: [ '*','*','*','*'],  
        body: [  
          [ { text: 'Produit', alignment: 'center' },{ text: 'Prix HT', alignment: 'center' },{ text: 'Quantité', alignment: 'center' },{ text: 'Prix Total HT', alignment: 'center' } ],  
          ...row
        ],
      }  
    };
  }

  //Get Image
  getProfileUserObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic ,
        width: 55,
        height: 55,
        margin: [0, 0, 0, 10],
        alignment: 'right',
      };
    }
    return null;
  }

  getProfileCustomerObject() {
    if (this.customer.logoPic) {
      return {
        image: this.customer.logoPic ,
        width: 55,
        height: 55,
        margin: [0, 0, 0, 10],
        alignment: 'right',
      };
    }
    return null;
  }

  //Get Customer
  onSelectIdCustomer({customerId}): void {
    this.customerService.getCustomerById(+customerId)
    .subscribe(res => {
      this.currentCustomer = res;

      this.customerId = this.currentCustomer.id;
      this.customer.logoPic = this.currentCustomer.logo;
      this.customer.name =  this.currentCustomer.lastName + ' ' + this.currentCustomer.firstName;
      this.customer.businessSector = this.currentCustomer.businessSector;
      this.customer.address = this.currentCustomer.address + ', ' + this.currentCustomer.zip + ', ' + this.currentCustomer.city ;
      this.customer.contactNo = this.currentCustomer.phoneNumber;
      this.customer.email = this.currentCustomer.email;
    });
  }


  // Submit form
  onSubmit(){

    if(this.resume.benefits.length[1] > 0) {
      alert("Veuillez dans un premier temps visualiser la facture afin de générer les valeurs.")
    }
    if(this.resume.amountHt == null || undefined || 0) {
      alert("Veuillez dans un premier temps visualiser la facture afin de générer les valeurs.")
    }

    this.submitted = true;

    this.loading = true;
  
    // Generate Pdf to Base64
    pdfMake.createPdf(this.documentDefinition).getBase64(function(encodedString) {
      this.pdfFileBase64 = encodedString;
    }.bind(this) 
    );

    // Save Invoice
    this.addForm = this.formBuilder.group({
      number: [this.resume.number, Validators.required],
      paymentMethod: [this.resume.paymentMethod, Validators.required],
      text: [this.resume.otherDetails],
      amountHt: [this.resume.amountHt.toString(), Validators.required],
      amountTtc: [this.resume.amountTtc.toString(), Validators.required],
      benefit: [JSON.stringify(this.resume.benefits), Validators.required],
      pdfFile: [this.pdfFileBase64, Validators.required],
      user: User,
      userFk: [this.userId, Validators.required],
      customer: Customer,
      customerFk: [this.customerId, Validators.required],
    });
    
    this.invoiceService.AddInvoice(this.addForm.value)
    .pipe()
    .subscribe( 
      data => {        
        this.toastr.success('Sauvegarde Réussi');
        this.router.navigate(['invoices']);
      },
      error => {
        this.toastr.error("Erreur d'ajout");
        this.error = error;
        this.loading = false;
      }
    );
  }

}