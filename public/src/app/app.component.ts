import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Http, Response } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  url;
  constructor(private http: Http){
    this.source = new LocalDataSource(this.data);
  }

  // settings of ng2 smart table defining table colums
  public settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      filter: false,
    },
    delete: {
      confirmDelete: true,
    },
    columns: {
      url: {
        title: 'URL',
        type: 'html'
      },
      htmlVersion: {
        title: 'Html Version'
      },
      title: {
        title: 'Title'
      },
      headings: {
        title: 'Headings',
        type: 'html'
      },
      internallinks: {
        title: 'Internal Links',
      },
      externallinks: {
        title: 'External Links',
      },
      unaccessablelinks: {
        title: 'Un AccessibleLinks'
      },
      errorstatuscode: {
        title: 'Error status Code'
      },
      errormessage: {
        title: 'Error Message'
      },
      loginformexists: {
        title: 'Login Form Exists'
      }
    },
  };
  source: LocalDataSource;  
  data = [];  


  // This function returns all analysed url data from database
  getallurls() {
    this.http.get('http://54.194.186.32:8000/v1/getallUrlsData')
      .map(res => res.json())
      .subscribe(res => {
        this.data = [];
        res.forEach(element => {
          const headingsString = `<ul><li>H1 -${element.headings.h1}</li>` + `<li>H2 -${element.headings.h2}</li>` + `<li>H3 -${element.headings.h3}</li>` + `<li>H4 -${element.headings.h4}</li>` + `<li>H5 -${element.headings.h5}</li>` + `<li>H6 -${element.headings.h6}</li></ul>`;
          const url = `<a href=${element.url}>${element.url}</a>`;
          let obj = {
            url: url, htmlVersion: element.htmlVersion, title: element.title, internallinks: element.links.internal, externallinks: element.links.external, unaccessablelinks: element.links.unaccessable,
            errorstatuscode: element.errorStatus, errormessage: element.errorMessage, loginformexists:element.loginFormExists, headings: headingsString
          };
          this.data.push(obj);
        });
        this.source.load(this.data);
        err => {
          alert('Something went wrong!');
        }
      });
  }

  ngOnInit() {
    this.getallurls();    
  }


  // This function inputs a url and saves its analysis in database
  getReport(){
    const url = 'http://54.194.186.32:8000/v1/getUrlData';
    const body = {url: this.url}
    this.http.post(url, body)
    .map(res => res.json())
    .subscribe(res => {
      if(res){
        alert('Report Generated');
        this.getallurls();            
      }
      err => {
        alert('Something went wrong!');
      }
    });
    this.url = '';
  }
}