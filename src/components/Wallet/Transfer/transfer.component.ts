import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {RestClient} from "../../rest-client";
import {environment} from "../../../environments/environment";
import {DataService} from "../../data.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

const client = new RestClient({
    apiKey: environment.apiKey,
    apiSecret: environment.apiSecret,
    apiPass: environment.apiPass,
});

@Component({
    selector: 'app-transfer',
    templateUrl: './transfer.component.html',
    styleUrls: ['./transfer.component.scss']
})

export class TransferComponent implements OnInit {
    @ViewChild('transferDone' , {static: false}) transferDone: ElementRef | undefined;
    @Input('balances') balances;
    @Input('tradings') tradings;
    selectedCoin;
    amount: string;
    fromMain: boolean = false;
    errorMessage = '';
    LogginIn

    constructor(
        private modalService: NgbModal,
        private route: Router,
        private api: DataService,) {
        this.api.Loggedin.subscribe((res: any) => {
            if (!res[0]) {
                this.route.navigate(['/login']);
            } else {
                this.LogginIn = res;
            }
        })
    }

    ngOnInit(): void {
    }

    selectCoin(coin) {
        this.selectedCoin = coin
    }

    transfer() {
        const params = {
            ccy: this.selectedCoin.ccy,
            amt: this.amount,
            from: this.fromMain ? '18' : '6',
            to: this.fromMain ? '6' : '18',
            type: '0',
            clientId: 'ftftex20230223testtransfer',
            subAcct: this.LogginIn[5]
        }
        this.api.fundsTransfer(params).subscribe((res) => {
            const result = JSON.parse(res['KYC Api resuult']);
            console.log(result, 'result');
            if (!result.data.length && result.msg) {
                this.errorMessage = result.msg;
            } else if (!res.msg) {
                this.modalService.open(this.transferDone, {ariaLabelledBy: 'modal-basic-title' , centered: true}).result.then((result) => {
                }, (reason) => {});
            }
            console.log(result)
        })
    }

    continue() {
        this.modalService.dismissAll();
    }

}
