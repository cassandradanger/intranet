import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <div className={ styles.main }>
        <p className={ styles.title }>* Birthdays & Anniversaries</p>
        <ul className={ styles.content }>
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
            <div className={ styles.image }>.</div>
            <div className={ styles.personWrapper }>
              <span className={ styles.name }>Steven Williams</span>
              <p className={ styles.position }>Senior Network Administrator</p>
              <p className={ styles.reason }>Anniversary: 5 years</p>
              {/* <p>{escape(this.props.description)}</p> */}
            </div>
          </li>
          <li>
            <div className={ styles.image }>.</div>
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
