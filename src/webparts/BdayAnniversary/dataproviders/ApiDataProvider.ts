import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IList } from '../common/IObjects';
import { IDataProvider } from './IDataProvider';
import {  
    SPHttpClient  
  } from '@microsoft/sp-http';  
  import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneTextField
  } from '@microsoft/sp-webpart-base';

export default class MockupDataProvider implements IDataProvider {
    client;
    pageContext;
    configurations;
    constructor(client, pageContext, configurations) {
        console.log('checking2');
        this.client = client;
        this.pageContext = pageContext;
        this.configurations = configurations
    }

    public getAllLists(): Promise<IList[]> {
        console.log('checking3');
        let _items: IList[];
        var today = new Date();
        var startDay = today.getDate();
        var startMonth = today.getMonth()+1;

        var date = new Date(); date.setDate(date.getDate() + 7); 
        var endDay = date.getDate();
        var endMonth = date.getMonth()+1;
        if(startMonth !== endMonth){
        this.get2months(startDay, startMonth, endDay, endMonth).then((response) => {
            console.log('check check check', response);
            return _items = response;
            // this._renderList(response.value)
        })
        } else {
        this.get1month(startDay, startMonth, endDay)
        .then((response) => {
            console.log(response);
            return _items = response;
            // this._renderList(response.value)
        });
        }
        return new Promise<IList[]>((resolve) => {
            setTimeout(() => {
                resolve(_items);
            }, 2000);
        });
    }

    private get2months(startDay, startMonth, endDay, endMonth) {
        console.log('checking4');
        var bdayfirstMonth = this.client(this.pageContext + 
        `/_api/web/Lists/GetByTitle('Staff Events')/Items?$filter=Birth_x0020_Day gt `+ startDay + 
        ` and Birth_x0020_Month eq ` + startMonth + `'`, SPHttpClient.configurations.v1)
        .then((response) => {
        return response.json();
        });  
        var bdaySecondMonth = this.client(this.pageContext + 
        `/_api/web/Lists/GetByTitle('Staff Events')/Items?$filter=Birth_x0020_Day lt `+ endDay + 
        ` and Birth_x0020_Month eq ` + endMonth + `'`, SPHttpClient.configurations.v1)
        .then((response) => {
        return response.json();
        });
        var annifirstMonth = this.client(this.pageContext + 
        `/_api/web/Lists/GetByTitle('Staff Events')/Items?$filter=AnniversaryDay gt `+ startDay + 
        ` and AnniversaryMonth eq ` + startMonth + `'`, SPHttpClient.configurations.v1)
        .then((response) => {
            return response.json();
        });  
        var anniSecondMonth = this.client(this.pageContext + 
        `/_api/web/Lists/GetByTitle('Staff Events')/Items?$filter=AnniversaryDay lt `+ endDay + 
        ` and AnniversaryMonth eq ` + endMonth + `'`, SPHttpClient.configurations.v1)
        .then((response) => {
            return response.json();
        });
        return bdayfirstMonth && bdaySecondMonth && annifirstMonth && anniSecondMonth;
    }

    private get1month(startDay, startMonth, endDay){
        console.log('checking5', this.pageContext, "dsjhfsjkfhskjdfj", this.client);
        var bdayList = this.client(this.pageContext + 
        `/_api/web/Lists/GetByTitle('Staff Events')/Items?$filter=Birth_x0020_Day gt `+ startDay + ` and Birth_x0020_Day lt` + endDay +
        ` and Birth_x0020_Month eq ` + startMonth + `'`, SPHttpClient.configurations.v1)
            .then((response) => {
            return response.json();
        });
        var anniversaryList = this.client(this.pageContext + 
        `/_api/web/Lists/GetByTitle('Staff Events')/Items?$filter=AnniversaryDay gt `+ startDay + ` and AnniversaryDay lt ` + endDay +
        ` and AnniversaryMonth eq ` + startMonth + `'`, SPHttpClient.configurations.v1)
            .then((response) => {
            return response.json();
        });  
        return bdayList && anniversaryList;
    }
}