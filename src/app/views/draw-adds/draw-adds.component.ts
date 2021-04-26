import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Lottery } from 'src/app/models/lottery.model';
import { LotteriesService } from 'src/app/shared-services/lotteries.service';
import { DrawsService } from '../draws/draws.service';

@Component({
  selector: 'app-draw-adds',
  templateUrl: './draw-adds.component.html',
  styleUrls: ['./draw-adds.component.scss']
})
export class DrawAddsComponent implements OnInit {
  addDrawForm: FormGroup;
  lotteries;
  lotterySelected: Lottery;
  normalNumber: Array<number>;
  bonusNumber: Array<number>;

  constructor(
    private formBuilder: FormBuilder,
    private drawService: DrawsService,
    private lotteriesService: LotteriesService
  ) {

    lotteriesService.getLotteries().subscribe((data) => {
      this.lotteries = data;
    });

  }

  get numbers() {
    return this.addDrawForm.get('numbers') as FormArray;
  }

  get bonus() {
    return this.addDrawForm.get('bonus') as FormArray;
  }


  get others() {
    return this.addDrawForm.get('others') as FormArray;
  }


  ngOnInit() {

  }

  onSubmit(drawData) {
    drawData.numbers = drawData.numbers.concat(drawData.bonus);
    if(drawData.others!==null){
      drawData.numbers = drawData.numbers.concat(drawData.others);
    }
    this.drawService.storeDraw(drawData).subscribe((data) => {
      console.log(data);
    });
  }

  selectLottery(e) {
    const idLottery: number = +e.target.value;
    this.lotterySelected = this.lotteries.find(l => l.id === idLottery);
    this.renderForm();
  }

  renderForm() {
    // let group = {
    //   idLottery: [''],
    //   date: [''],
    //   numberDraw: [''],
    //   jackpotAmount: [''],
    //   numbers: null,
    //   bonus: null,
    //   others: null
    // };
    let group = {
      idLottery: new FormControl(),
      date: new FormControl(),
      numberDraw: new FormControl(),
      jackpotAmount: new FormControl(),
      numbers: null,
      bonus: null,
      others: null
    };
    if (this.lotterySelected !== undefined){
      group.numbers = new FormArray([]);
      group.bonus = new FormArray([]);
      if (this.lotterySelected.other_qty !== null) {
        group.others = new FormArray([]);
      }
    }



    //this.addDrawForm = this.formBuilder.group(group);
    this.addDrawForm = new FormGroup(group);

    if (this.lotterySelected !== undefined) {
      this.renderNumbers();
      this.renderBonus();
      this.renderOthers();
    }

    if (this.lotterySelected !== undefined){
      let controlLotteryId = this.addDrawForm.get('idLottery') as FormControl;
      controlLotteryId.setValue(this.lotterySelected.id);
    }

  }

  renderNumbers() {
    // let controls: Array<FormControl> = new Array<FormControl>();
    let controls = this.addDrawForm.get('numbers') as FormArray;
    for (let i = 0; i < this.lotterySelected.number_draw; i++) {
      controls.push(
        this.formBuilder.group({
          idType: 1,
          number: ['']
        })
      );
    }

    //return controls;
  }

  renderBonus() {
    let controls = this.addDrawForm.get('bonus') as FormArray;
    for (let i = 0; i < this.lotterySelected.bonus_draw; i++) {
      controls.push(
        this.formBuilder.group(
          {
            idType: 2,
            number: ['']
          }
        )
        );
    }

    //return controls;
  }

  renderOthers() {
    let controls = this.addDrawForm.get('others') as FormArray;
    for (let i = 0; i < this.lotterySelected.other_draw; i++) {
      controls.push(
        this.formBuilder.group(
          {
            idType: 3,
            number: ['']
          }
        )
      );
    }

    //return controls;
  }
}
