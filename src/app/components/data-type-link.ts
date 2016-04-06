import {Component,Input,Output,EventEmitter} from 'angular2/core';
import {ApiDefinition,ResponseObject,ParameterObject} from '../model/apidoc';
import {ApiDocService} from '../apidoc/apidoc.service';

@Component({
    selector:'data-type-link',
    template:require('./data-type-link.html')
})
export class DataTypeLink {
    @Input() data:ResponseObject|ParameterObject;
    @Output('select-type') selectType:EventEmitter<string> = new EventEmitter();
    private apiDoc:ApiDefinition;
    constructor(apiDocService:ApiDocService) {
        this.apiDoc = new ApiDefinition();
        apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => this.apiDoc = apiDoc);
    }
    isDtoType():boolean {
        return this.apiDoc.isDtoType(this.data);
    }
    getDtoType():string {
        return this.apiDoc.getDtoType(this.data);
    }
    isTypeArray():boolean {
        return this.apiDoc.isTypeArray(this.data);
    }
    onSelectType(event:Event):void {
        event.preventDefault();
        this.selectType.emit(this.getDtoType());
    }
}