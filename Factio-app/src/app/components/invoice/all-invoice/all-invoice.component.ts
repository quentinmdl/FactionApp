import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of } from 'rxjs';
import { map, startWith, tap, withLatestFrom } from 'rxjs/operators';

import { Customer, Invoice } from 'src/app/api/_models';
import { InvoiceService, CustomerService, LoadingService } from 'src/app/api/_services';

import { AddInvoiceComponent } from '../add-invoice/add-invoice.component';
import { EditInvoiceComponent } from '../edit-invoice/edit-invoice.component';

import { ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../modals/confirm-dialog/confirm-dialog.component';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-all-invoice',
  templateUrl: './all-invoice.component.html',
  styleUrls: ['./all-invoice.component.css']
})
export class AllInvoiceComponent implements OnInit {

  currentUser: any;
  invoices: Invoice[];
  invoices$: Observable<Invoice[]>;
  filteredInvoices$: Observable<Invoice[]>;
  formGroup: FormGroup;

  actualPage: any;
  
  constructor(
    private router: Router, 
    private invoiceService: InvoiceService, 
    private dialog: MatDialog,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public loader: LoadingService,
  ) { this.formGroup = this.formBuilder.group({ filter: [''] }); }

  private getInvoices() {
    return of(this.invoices).pipe(tap());
  }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let userId = this.currentUser.infos.id;

    this.invoiceService.getInvoiceByUserFk(+userId)
    .subscribe( data => {
      this.invoices = data;
      this.formGroup = this.formBuilder.group({ filter: [''] });

      this.invoices$ = this.getInvoices();

      this.filteredInvoices$ = this.formGroup.get('filter').valueChanges.pipe(
        startWith(''),
        withLatestFrom(this.invoices$),
        map(([val, invoices]) =>
          !val ? invoices : invoices.filter((x) => x.number.toLowerCase().includes(val.toLowerCase()))
        )
      );
      
    });

  }

  deleteInvoice(invoice: Invoice): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Etes vous sur de vouloir supprimer la facture : ' + invoice.number
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.invoiceService.delete(invoice.id)
        .subscribe( data => {
          this.invoices = this.invoices.filter(u => u !== invoice);
          this.ngOnInit();
          this.toastr.success("Suppression réussie");
        });
      }});
  };

  editInvoice(invoice: Invoice): void {
    window.localStorage.removeItem("editInvoiceId");
    window.localStorage.setItem("editInvoiceId", invoice.id.toString());
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(EditInvoiceComponent,{
      width: '640px',disableClose: true 
    });
  };

  AddInvoice(): void {
   this.router.navigate(['invoices/generate']);
  };

  showInvoice(invoice: Invoice) {
    window.localStorage.removeItem("showInvoiceId");
    window.localStorage.setItem("showInvoiceId", invoice.id.toString());

    const dataURI = invoice.pdfFile;

    const blob = this.dataURItoBlob(dataURI);
    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'application/pdf'});
    return blob;

  }


  downloadInvoice(invoice: Invoice) {
    window.localStorage.removeItem("downloadInvoiceId");
    window.localStorage.setItem("downloadInvoiceId", invoice.id.toString());

    const dataURI = `data:application/pdf;base64,${invoice.pdfFile}`;
    const downloadLink = document.createElement("a");
    const fileName = invoice.number;
    downloadLink.href = dataURI;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}

