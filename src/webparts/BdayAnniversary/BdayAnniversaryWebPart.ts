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
   numberCount = [];

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

  private _firstGetList() {
    this._getListData().then((response) => {
      console.log('check check check', response);
      this._renderList(response.value)
    })
  }

  private _getListData() {  
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/Lists/GetByTitle('Staff Events')/Items?select=ID,Title,Body&$top%205`, SPHttpClient.configurations.v1)  
      .then((response) => {
        return response.json();
      });  
  }

  private _renderList(items: PeopleList[]): void {
    console.log('renderList'); 
    let html: string = ``;   
    items.forEach((item: PeopleList) => {
      console.log('item', item);
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
