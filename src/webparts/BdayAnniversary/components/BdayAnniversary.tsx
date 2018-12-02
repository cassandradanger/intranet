import * as React from 'react';
import styles from './BdayAnniversary.module.scss';
import { IBdayAnniversaryProps } from './IBdayAnniversaryProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IList } from './../common/IObjects';
import IManageListsState from './IManageListsState';


export default class BdayAnniversary extends React.Component<IBdayAnniversaryProps, IManageListsState> {

  constructor(props: IBdayAnniversaryProps) {
    super(props);
    this.state = {
      lists: []
    };
  }

  public componentDidMount() {
    this.props.provider.getAllLists().then((_lists: IList[]) => {
      this.setState({
        lists: _lists
      });
    });
  }


  public render(): React.ReactElement<IBdayAnniversaryProps> {
    return (
      <div className={ styles.main }>
        <p className={ styles.title }>* Birthdays & Anniversaries</p>

        <div>
          <span className={styles.title}>Total Lists: {escape(this.state.lists.length.toString())}</span>
          { this.state.lists.map(function(item,key){  
          return(<p key={key}>{item.Title} ({item.Id})</p>);
          })}              
        </div>

        <ul className={ styles.content }>
          <li>
            <div className={ styles.image }> </div>
            <div className={ styles.personWrapper }>
              <span className={ styles.name }>Steven Williams</span>
              <p className={ styles.position }>Senior Network Administrator</p>
              <p className={ styles.reason }>Anniversary: 5 years</p>
              {/* <p>{escape(this.props.description)}</p>
              <p>{escape(this.props.name)}</p> */}
            </div>
          </li>
          <li>
            <div className={ styles.image }> </div>
            <div className={ styles.personWrapper }>
              <span className={ styles.name }>Steven Williams</span>
              <p className={ styles.position }>Senior Network Administrator</p>
              <p className={ styles.reason }>Anniversary: 5 years</p>
              {/* <p>{escape(this.props.description)}</p> */}
            </div>
          </li>
          <li>
            <div className={ styles.image }> </div>
            <div className={ styles.personWrapper }>
              <span className={ styles.name }>Steven Williams</span>
              <p className={ styles.position }>Senior Network Administrator</p>
              <p className={ styles.reason }>Anniversary: 5 years</p>
              {/* <p>{escape(this.props.description)}</p> */}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}