import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import {  
  SPHttpClient  
} from '@microsoft/sp-http';  
import * as strings from 'BdayAnniversaryWebPartStrings';
import BdayAnniversary from './components/BdayAnniversary';
import { IBdayAnniversaryProps } from './components/IBdayAnniversaryProps';

export interface IBdayAnniversaryWebPartProps {
  description: string;
  SPListName: string;
}

export interface PeopleLists {
  value: PeopleList[];  
}

export interface PeopleList{
  Title: string;
  Body: string;
}

const variableName = 'hihihihihihih';

export default class BdayAnniversaryWebPart extends BaseClientSideWebPart<IBdayAnniversaryWebPartProps> {
  //  numberCount = [];

  //  public render(): void {
  //   this.domElement.innerHTML = `
  //           <div id="spListContainer" /></div>
  //           `
  //     this._firstGetList();
  //   // ReactDom.render(element, this.domElement);
  // }

  public render(): void {
    const element: React.ReactElement<IBdayAnniversaryProps > = React.createElement(
      BdayAnniversary,
      {
        description: variableName,
      }
    );
      this._firstGetList();
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private _firstGetList() {var today = new Date();
    var startDay = today.getDate();
    var startMonth = today.getMonth()+1;

    var date = new Date(); date.setDate(date.getDate() + 7); 
    var endDay = date.getDate();
    var endMonth = date.getMonth()+1;
    if(startMonth !== endMonth){
      // fire off fucked up call
      this.get2months(startDay, startMonth, endDay, endMonth).then((response) => {
        console.log('check check check', response);
        this._renderList(response.value)
      })
    } else {
      this.get1month(startDay, startMonth, endDay)
      .then((response) => {
        console.log(response);
        this._renderList(response.value)
      });
    }
  }

  private get2months(startDay, startMonth, endDay, endMonth) {
    var bdayfirstMonth = this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + 
    `/_api/web/Lists/GetByTitle('Staff Events')/Items?$filter=Birth_x0020_Day gt `+ startDay + 
    ` and Birth_x0020_Month eq ` + startMonth + `'`, SPHttpClient.configurations.v1)
    .then((response) => {
      return response.json();
    });  
    var bdaySecondMonth = this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + 
    `/_api/web/Lists/GetByTitle('Staff Events')/Items?$filter=Birth_x0020_Day lt `+ endDay + 
    ` and Birth_x0020_Month eq ` + endMonth + `'`, SPHttpClient.configurations.v1)
    .then((response) => {
      return response.json();
    });
    var annifirstMonth = this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + 
      `/_api/web/Lists/GetByTitle('Staff Events')/Items?$filter=AnniversaryDay gt `+ startDay + 
      ` and AnniversaryMonth eq ` + startMonth + `'`, SPHttpClient.configurations.v1)
      .then((response) => {
        return response.json();
      });  
      var anniSecondMonth = this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + 
      `/_api/web/Lists/GetByTitle('Staff Events')/Items?$filter=AnniversaryDay lt `+ endDay + 
      ` and AnniversaryMonth eq ` + endMonth + `'`, SPHttpClient.configurations.v1)
      .then((response) => {
        return response.json();
      });
      return bdayfirstMonth && bdaySecondMonth && annifirstMonth && anniSecondMonth;
  }

  private get1month(startDay, startMonth, endDay){
    var bdayList = this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + 
      `/_api/web/Lists/GetByTitle('Staff Events')/Items?$filter=Birth_x0020_Day gt `+ startDay + `and Birth_x0020_Day lt` + endDay +
      ` and Birth_x0020_Month eq ` + startMonth + `'`, SPHttpClient.configurations.v1)
        .then((response) => {
        return response.json();
      });
    var anniversaryList = this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + 
      `/_api/web/Lists/GetByTitle('Staff Events')/Items?$filter=AnniversaryDay gt `+ startDay + `and AnniversaryDay lt` + endDay +
      ` and AnniversaryMonth eq ` + startMonth + `'`, SPHttpClient.configurations.v1)
        .then((response) => {
        return response.json();
      });  
      return bdayList && anniversaryList;
  }

  private _renderList(items){
    console.log('renderList', items); 
    let html: string = ``;   
    items.forEach((item: PeopleList) => {
      // console.log('item', item);
      html += `  
           <h3>${item.Title}</h3>
            <p>${item.Body}</p>
          `;  
    });  
    const listContainer: Element = this.domElement.querySelector('#spListContainer');  
    listContainer.innerHTML = html;  
  } 

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('SPListName', {
                  label: 'SharePoint List Name'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
