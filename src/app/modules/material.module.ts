import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	MdButtonModule, MdCheckboxModule,
	MdProgressBarModule, MdInputModule,
	MdAutocompleteModule, MdToolbarModule,
	MdListModule, MdTabsModule,
	MdSidenavModule, MdPaginatorModule,
	MdSortModule, MdTableModule,
	MdCardModule
} from '@angular/material';

@NgModule({
	exports: [
		CommonModule,
		BrowserAnimationsModule,
		MdButtonModule,
		MdCheckboxModule,
		MdProgressBarModule,
		MdInputModule,
		MdAutocompleteModule,
		MdToolbarModule,
		MdListModule,
		MdTabsModule,
		MdSidenavModule,
		MdPaginatorModule,
		MdSortModule,
		MdTableModule,
		MdCardModule
	],
	imports: [
	],
	declarations: []
})
export class MaterialModule { }
