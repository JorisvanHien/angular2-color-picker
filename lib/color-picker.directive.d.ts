import { OnChanges, ViewContainerRef, ElementRef, EventEmitter, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ColorPickerService } from './color-picker.service';
import { ComponentFactoryResolver } from '@angular/core';
export declare class ColorPickerDirective implements OnInit, OnChanges {
    private vcRef;
    private el;
    private service;
    private cfr;
    colorPicker: string;
    colorPickerChange: EventEmitter<string>;
    cpToggle: boolean;
    cpToggleChange: EventEmitter<boolean>;
    cpPosition: string;
    cpPositionOffset: string;
    cpPositionRelativeToArrow: boolean;
    cpOutputFormat: string;
    cpPresetLabel: string;
    cpPresetColors: Array<string>;
    cpCancelButton: boolean;
    cpCancelButtonClass: string;
    cpCancelButtonText: string;
    cpOKButton: boolean;
    cpOKButtonClass: string;
    cpOKButtonText: string;
    cpFallbackColor: string;
    cpHeight: string;
    cpWidth: string;
    cpIgnoredElements: any;
    cpDialogDisplay: string;
    cpSaveClickOutside: boolean;
    cpAlphaChannel: string;
    private dialog;
    private created;
    private ignoreChanges;
    constructor(vcRef: ViewContainerRef, el: ElementRef, service: ColorPickerService, cfr: ComponentFactoryResolver);
    ngOnChanges(changes: any): void;
    ngOnInit(): void;
    onClick(): void;
    openDialog(): void;
    colorChanged(value: string, ignore?: boolean): void;
    changeInput(value: string): void;
    toggle(value: boolean): void;
}
export declare class TextDirective {
    newValue: EventEmitter<any>;
    text: any;
    rg: number;
    changeInput(value: string): void;
}
export declare class SliderDirective {
    private el;
    newValue: EventEmitter<any>;
    slider: string;
    rgX: number;
    rgY: number;
    private listenerMove;
    private listenerStop;
    constructor(el: ElementRef);
    setCursor(event: any): void;
    move(event: any): void;
    start(event: any): void;
    stop(): void;
    getX(event: any): number;
    getY(event: any): number;
}
export declare class DialogComponent implements OnInit, AfterViewInit {
    public el : any;
    public cdr: any;
    public service: any;
    public hsva: any;
    public rgbaText: any;
    public hslaText: any;
    public hexText: any;
    public outputColor: any;
    public selectedColor: any;
    public alphaSliderColor: any;
    public hueSliderColor: any;
    public slider: any;
    public sliderDimMax: any;
    public format: any;
    public show: any;
    public top: any;
    public left: any;
    public position: any;
    public directiveInstance: any;
    public initialColor: any;
    public directiveElementRef: any;
    public listenerMouseDown: any;
    public listenerResize: any;
    public cpPosition: any;
    public cpPositionOffset: any;
    public cpOutputFormat: any;
    public cpPresetLabel: any;
    public cpPresetColors: any;
    public cpCancelButton: any;
    public cpCancelButtonClass: any;
    public cpCancelButtonText: any;
    public cpOKButton: any;
    public cpOKButtonClass: any;
    public cpOKButtonText: any;
    public cpHeight: any;
    public cpWidth: any;
    public cpIgnoredElements: any;
    public cpDialogDisplay: any;
    public cpSaveClickOutside: any;
    public cpAlphaChannel: any;
    public dialogArrowSize: any;
    public dialogArrowOffset: any;
    public arrowTop: any;
    hueSlider: any;
    alphaSlider: any;
    dialogElement: any;
    constructor(el: ElementRef, cdr: ChangeDetectorRef, service: ColorPickerService);
    setDialog(instance: any, elementRef: ElementRef, color: any, cpPosition: string, cpPositionOffset: string, cpPositionRelativeToArrow: boolean, cpOutputFormat: string, cpPresetLabel: string, cpPresetColors: Array<string>, cpCancelButton: boolean, cpCancelButtonClass: string, cpCancelButtonText: string, cpOKButton: boolean, cpOKButtonClass: string, cpOKButtonText: string, cpHeight: string, cpWidth: string, cpIgnoredElements: any, cpDialogDisplay: string, cpSaveClickOutside: boolean, cpAlphaChannel: string): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    setInitialColor(color: any): void;
    setPresetConfig(cpPresetLabel: string, cpPresetColors: Array<string>): void;
    openDialog(color: any, emit?: boolean): void;
    cancelColor(): void;
    oKColor(): void;
    setColorFromString(value: string, emit?: boolean): void;
    onMouseDown(event: any): void;
    openColorPicker(): void;
    closeColorPicker(): void;
    onResize(): void;
    setDialogPosition(): void;
    setSaturation(val: {
        v: number;
        rg: number;
    }): void;
    setLightness(val: {
        v: number;
        rg: number;
    }): void;
    setHue(val: {
        v: number;
        rg: number;
    }): void;
    setAlpha(val: {
        v: number;
        rg: number;
    }): void;
    setR(val: {
        v: number;
        rg: number;
    }): void;
    setG(val: {
        v: number;
        rg: number;
    }): void;
    setB(val: {
        v: number;
        rg: number;
    }): void;
    setSaturationAndBrightness(val: {
        s: number;
        v: number;
        rgX: number;
        rgY: number;
    }): void;
    formatPolicy(): number;
    update(emit?: boolean): void;
    isDescendant(parent: any, child: any): boolean;
    createBox(element: any, offset: boolean): any;
}
