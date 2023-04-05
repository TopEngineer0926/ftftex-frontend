import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SelectExchangePopComponent } from "./SelectExchangePop/select-exchange-pop.component";
import { TradingDataServiceService } from "../trading-data-service.service";

@Component({
  selector: "app-coin",
  templateUrl: "./coin.component.html",
  styleUrls: ["./coin.component.scss"],
})
export class CoinComponent implements OnInit {
  CoinData: any;
  page = 1;
  limit = 8;
  tag = "all";
  loader = false;
  sort = "market_cap";
  sort_dir = "desc";
  order = {
    field: "cmc_rank",
    reversed: false,
  };
  isMobile = false;
  AlowedPairs: any = [];
  constructor(
    private api: DataService,
    public route: Router,
    private modalService: NgbModal,
    private apiT: TradingDataServiceService
  ) {
    if (window.innerWidth < 990) {
      this.isMobile = true;
    }
    this.AlowedPairs = this.apiT.Pairs;
  }

  ngOnInit(): void {
    this.syncData();
  }

  syncData() {
    this.loader = true;
    this.api
      .getCoinData(this.page, this.limit, this.tag, this.sort, this.sort_dir)
      .subscribe(
        (res: any) => {
          this.CoinData = JSON.parse(res.response["Result: "])?.data;
        },
        () => {},
        () => {
          this.loader = false;
        }
      );
  }

  changeTag(value) {
    this.tag = value;
    this.CoinData = [];
    this.syncData();
  }

  doSort(value) {
    if (this.order.field == value) {
      if (this.order.reversed) {
        this.order.reversed = false;
      } else {
        this.order.reversed = true;
      }
    } else {
      this.order.reversed = false;
      this.order.field = value;
    }
  }

  navigationCheck(url, coin) {
    if (this.AlowedPairs.includes(coin + "USDT")) {
      const modalRef = this.modalService.open(SelectExchangePopComponent, {
        centered: true,
      });
      modalRef.componentInstance.data = { url, coin };
    } else {
      this.route.navigate(["/coin/" + url]);
    }
  }
}
