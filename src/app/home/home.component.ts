import { Component, OnInit } from "@angular/core";
import { ARKitTest } from "./ar/view.ios";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    private view: ARKitTest;
    constructor() {}

    ngOnInit(): void {
        // Init your component properties here.
        this.view = ARKitTest.alloc();
    }
}
